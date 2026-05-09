"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
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
  const photoRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState(hero.imageSrc);
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIdx((i) => (i + 1) % ROTATING_ROLES.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!photoRef.current || !textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, x: -30, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "power2.out" }
      );
      gsap.fromTo(
        textRef.current!.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          stagger: 0.09,
          delay: 0.2,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Mouse-driven tilt on portrait
  useEffect(() => {
    const stage = stageRef.current;
    const img = stage?.querySelector(".portrait-img") as HTMLDivElement | null;
    if (!stage || !img) return;
    const onMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const rotY = dx * 5;
      const rotX = -dy * 5;
      img.style.transform = `perspective(1100px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    };
    const onLeave = () => {
      img.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)";
    };
    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", onLeave);
    return () => {
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Headline split
  const stripDot = (s: string) => s.replace(/\.$/, "").trim();
  const parts = hero.headline.split(".");
  const lineOne = stripDot(parts[0] ?? hero.headline);
  const lineTwo = parts.length > 1 ? stripDot(parts.slice(1).join(".")) : "";

  return (
    <section
      id="hero"
      className="hero-v2"
      aria-labelledby="hero-heading"
    >
      <div className="container-prose">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Photo — cinema scale on left (order:1 lg) */}
          <div ref={photoRef} className="lg:col-span-5 order-1 lg:order-1">
            <div ref={stageRef} className="portrait-stage">
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
              </div>

            </div>
          </div>

          {/* Text side — cleaner, more breathing */}
          <div ref={textRef} className="lg:col-span-7 order-2 lg:order-2">
            <span className="hero-v2-eyebrow-pill">
              <span className="dot" aria-hidden />
              {hero.eyebrow}
            </span>

            <h1 id="hero-heading" className="hero-v2-headline mt-7">
              <span className="block">{lineOne}.</span>
              {lineTwo && (
                <span className="block shimmer-text">{lineTwo}.</span>
              )}
            </h1>

            <p className="hero-v2-sub">{hero.subheadline}</p>

            {/* Rotating role line */}
            <p className="hero-rotating-line" aria-live="polite">
              <span className="hero-rotating-label">כרגע מגייסת:</span>
              <span className="hero-rotating-word-wrap">
                <span key={roleIdx} className="hero-rotating-word">
                  {ROTATING_ROLES[roleIdx]}
                </span>
              </span>
            </p>

            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime"
                aria-label={hero.ctaPrimary}
              >
                <WhatsappLogo size={20} weight="fill" />
                <span>{hero.ctaPrimary}</span>
              </a>
              <a
                href={`tel:${PHONE}`}
                className="btn-ghost-light"
                aria-label={`חיוג: ${PHONE}`}
              >
                <span dir="ltr">{PHONE.replace("+972", "0")}</span>
              </a>
            </div>

            <p className="hero-v2-microcopy">{hero.ctaMicrocopy}</p>

            {/* Animated stats row */}
            <div className="hero-stats">
              <StatCounter value={10} suffixWord="שנים" label="ניסיון בגיוס" />
              <span className="divider" aria-hidden />
              <StatCounter value={9} suffixWord="שלבים" label="תהליך מקצה לקצה" />
              <span className="divider" aria-hidden />
              <StatCounter value={100} suffix="%" label="אחריות בכתב" />
            </div>
          </div>
        </div>

        {/* Sectors strip — animated marquee */}
        <div className="sector-strip-marquee" aria-label="מגייסת לעסקים בתחומים">
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
