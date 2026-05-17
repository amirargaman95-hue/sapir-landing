import AnnouncementBar from "@/components/landing/AnnouncementBar";
import TopHeader from "@/components/landing/TopHeader";
import Hero from "@/components/landing/Hero";
import ActiveJobs from "@/components/landing/ActiveJobs";
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
import MobileDock from "@/components/landing/MobileDock";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <TopHeader />
      <main id="main" className="pt-[96px] lg:pt-[112px]">
        {/* Hero — dark */}
        <Hero />

        {/* Active Jobs — dark */}
        <div className="alt-dark">
          <ActiveJobs />
        </div>

        {/* Stats — cream */}
        <div className="alt-cream">
          <StatsBanner />
        </div>

        {/* Three reasons — dark */}
        <div className="alt-dark">
          <ThreeReasons />
        </div>

        <div className="alt-cream">
          <MidPageCTA text="מתאים לך? בוא נדבר 5 דקות." buttonText="WhatsApp" />
        </div>

        {/* Full service — dark */}
        <div className="alt-dark">
          <FullService />
        </div>

        {/* Social proof — cream (bento) */}
        <SocialProof />

        <div className="alt-dark">
          <MidPageCTA text="רוצה לראות את התוצאות אצלך? בוא נדבר." buttonText="WhatsApp" />
        </div>

        {/* About manifesto — split dark/cream */}
        <AboutManifesto />

        {/* Business model — dark */}
        <div className="alt-dark">
          <BusinessModel />
        </div>

        {/* FAQ — cream */}
        <div className="alt-cream">
          <FAQ />
        </div>

        {/* Final CTA — dark */}
        <div className="alt-dark">
          <FinalCTA />
        </div>
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
