"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  WhatsappLogo,
  Wrench,
  Hammer,
  Factory,
  Cube,
  Truck,
  ForkKnife,
  Package,
  Buildings,
  HardHat,
  Lightning,
  Gear,
  GearSix,
  Shield,
} from "@phosphor-icons/react";
import StatCounter from "@/components/ui/StatCounter";
import { hero, WHATSAPP_URL, PHONE } from "@/data/content";
import { track } from "@/lib/track";

const ROTATING_ROLES = [
  "מנהל אחזקה",
  "מנהל ייצור",
  "טכנאי CNC",
  "ראש צוות ייצור",
  "מנהל איכות",
  "מנהל מפעל",
  "חשמלאי תעשייתי",
  "מנהל לוגיסטיקה",
];

const sectors = [
  { name: "מתכת ומסגרות", Icon: Wrench },
  { name: "נגרות", Icon: Hammer },
  { name: "ייצור והרכבה", Icon: Factory },
  { name: "פלסטיק", Icon: Cube },
  { name: "אלומיניום", Icon: Shield },
  { name: "אריזה ומיתוג", Icon: Package },
  { name: "לוגיסטיקה ומחסן", Icon: Truck },
  { name: "מזון ומאפיות", Icon: ForkKnife },
  { name: "חשמל ובקרה", Icon: Lightning },
  { name: "CNC ומכונות", Icon: Gear },
  { name: "בנייה ויזמות", Icon: Buildings },
  { name: "טכנאי שטח", Icon: HardHat },
  { name: "תפעול ומפעלים", Icon: GearSix },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState(hero.imageSrc);
  const [roleIdx, setRoleIdx] = useState(0);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.04]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setRoleIdx((i) => (i + 1) % ROTATING_ROLES.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduce]);

  // mouse-tracking gradient blob — slower lerp, larger radius
  useEffect(() => {
    const blob = blobRef.current;
    const root = heroRef.current;
    if (!blob || !root || reduce) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
    };
    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      blob.style.transform = `translate3d(${cx - 380}px, ${cy - 380}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    root.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("mousemove", onMove);
    };
  }, [reduce]);

  // subtle 3D tilt on portrait
  useEffect(() => {
    const stage = stageRef.current;
    const img = stage?.querySelector(".portrait-img") as HTMLDivElement | null;
    if (!stage || !img || reduce) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      img.style.transform = `perspective(1200px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg)`;
    };
    const onLeave = () => {
      img.style.transform = "perspective(1200px) rotateY(0) rotateX(0)";
    };
    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", onLeave);
    return () => {
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce]);

  const stripDot = (s: string) => s.replace(/\.$/, "").trim();
  const parts = hero.headline.split(".");
  const lineOne = stripDot(parts[0] ?? hero.headline);
  const lineTwo = parts.length > 1 ? stripDot(parts.slice(1).join(".")) : "";

  const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];
  const fadeUpAt = (delay: number) =>
    reduce
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay },
        };
  const portraitIntro = reduce
    ? { initial: false as const, animate: { opacity: 1, scale: 1 } }
    : {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.85, ease: EASE, delay: 0.2 },
      };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-v3 section-dark"
      aria-labelledby="hero-heading"
    >
      <div ref={blobRef} className="hero-v3-blob" aria-hidden />
      <div className="hero-v3-grain" aria-hidden />

      <div className="container-prose">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            className="lg:col-span-5 order-1 lg:order-1"
            {...portraitIntro}
            style={{ y: portraitY, scale: portraitScale }}
          >
            <div ref={stageRef} className="portrait-stage-v3">
              <div className="portrait-img">
                <Image
                  src={imgSrc}
                  alt={hero.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="object-cover"
                  onError={() => {
                    if (imgSrc !== hero.imageFallback) setImgSrc(hero.imageFallback);
                  }}
                />
                <div className="portrait-mask-v3" aria-hidden />
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 order-2 lg:order-2">
            <motion.span {...fadeUpAt(0)} className="hero-v3-eyebrow">
              <span className="dot" aria-hidden />
              {hero.eyebrow}
            </motion.span>

            <motion.h1
              {...fadeUpAt(0.15)}
              id="hero-heading"
              className="hero-v3-headline"
            >
              <span className="block">{lineOne}.</span>
              {lineTwo && <span className="block accent-line">{lineTwo}.</span>}
            </motion.h1>

            <motion.p {...fadeUpAt(0.3)} className="hero-v3-sub">
              {hero.subheadline}
            </motion.p>

            <motion.p {...fadeUpAt(0.38)} className="hero-rotating-line">
              <span className="hero-rotating-label">כרגע מגייסת:</span>
              <span className="hero-rotating-word-wrap" aria-hidden="true">
                <span key={roleIdx} className="hero-rotating-word">
                  {ROTATING_ROLES[roleIdx]}
                </span>
              </span>
              <span className="sr-only">משרות פתוחות בענפי תעשייה</span>
            </motion.p>

            <motion.div {...fadeUpAt(0.45)} className="hero-v3-cta-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime"
                aria-label={hero.ctaPrimary}
                onClick={() => track("cta_whatsapp_click", { location: "hero" })}
              >
                <WhatsappLogo size={20} weight="fill" />
                <span>{hero.ctaPrimary}</span>
              </a>
              <a
                href={`tel:${PHONE}`}
                className="btn-ghost-dark"
                aria-label={`חיוג: ${PHONE}`}
                onClick={() => track("cta_phone_click", { location: "hero" })}
              >
                <span dir="ltr">{PHONE.replace("+972", "0")}</span>
              </a>
            </motion.div>

            <motion.p {...fadeUpAt(0.52)} className="hero-v3-microcopy">
              {hero.ctaMicrocopy}
            </motion.p>
            <motion.p {...fadeUpAt(0.56)} className="hero-v3-microcopy hero-v3-microcopy-sub">
              א׳–ה׳ 08:00–18:00 · מענה אישי בשעות פעילות
            </motion.p>

            <motion.div {...fadeUpAt(0.6)} className="hero-v3-stats">
              <StatCounter value={10} suffixWord="שנים" label="ניסיון בגיוס" />
              <span className="divider" aria-hidden />
              <StatCounter value={9} suffixWord="שלבים" label="תהליך מקצה לקצה" />
              <span className="divider" aria-hidden />
              <StatCounter value={100} suffix="%" label="אחריות בכתב" />
            </motion.div>
          </div>
        </div>

        <div className="sector-strip-marquee-v3" aria-label="מגייסת לעסקים בתחומים">
          <span className="label">מגייסת לעסקים בתחומים</span>
          <ul className="sector-strip-track" aria-hidden>
            {[...sectors, ...sectors].map(({ name, Icon }, i) => (
              <li key={`${name}-${i}`}>
                <Icon size={20} weight="duotone" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
