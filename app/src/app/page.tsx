import AnnouncementBar from "@/components/landing/AnnouncementBar";
import TopHeader from "@/components/landing/TopHeader";
import Hero from "@/components/landing/Hero";
import RiskReversalBanner from "@/components/landing/RiskReversalBanner";
import StatsBanner from "@/components/landing/StatsBanner";
import ThreeReasons from "@/components/landing/ThreeReasons";
import FullService from "@/components/landing/FullService";
import AboutManifesto from "@/components/landing/AboutManifesto";
import BusinessModel from "@/components/landing/BusinessModel";
import MidPageCTA from "@/components/landing/MidPageCTA";
import SocialProof from "@/components/landing/SocialProof";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import StickyWhatsApp from "@/components/landing/StickyWhatsApp";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <TopHeader />
      <main id="main" className="pt-[88px] lg:pt-[104px]">
        <Hero />
        <RiskReversalBanner />
        <StatsBanner />
        <ThreeReasons />
        <MidPageCTA
          text="מתאים לך? בוא נדבר 5 דקות."
          buttonText="WhatsApp"
        />
        <FullService />
        <SocialProof />
        <MidPageCTA
          text="רוצה לראות את התוצאות אצלך? בוא נדבר."
          buttonText="WhatsApp"
        />
        <AboutManifesto />
        <BusinessModel />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  );
}
