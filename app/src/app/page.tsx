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
import LeadForm from "@/components/landing/LeadForm";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import MobileDock from "@/components/landing/MobileDock";
import FadeUp from "@/components/ui/FadeUp";

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
          <FadeUp variant="reveal">
            <ActiveJobs />
          </FadeUp>
        </div>

        {/* Stats — cream */}
        <div className="alt-cream">
          <FadeUp variant="reveal">
            <StatsBanner />
          </FadeUp>
        </div>

        {/* Three reasons — dark */}
        <div className="alt-dark">
          <FadeUp variant="reveal">
            <ThreeReasons />
          </FadeUp>
        </div>

        <div className="alt-cream">
          <FadeUp variant="reveal">
            <MidPageCTA text="צריך לאייש משרה במפעל? בוא נדבר 5 דקות." buttonText="WhatsApp" />
          </FadeUp>
        </div>

        {/* Full service — dark */}
        <div className="alt-dark">
          <FadeUp variant="reveal">
            <FullService />
          </FadeUp>
        </div>

        {/* Social proof — cream (bento) */}
        <SocialProof />

        <div className="alt-dark">
          <FadeUp variant="reveal">
            <MidPageCTA text="רוצה לראות את התוצאות אצלך? בוא נדבר." buttonText="WhatsApp" />
          </FadeUp>
        </div>

        {/* About manifesto — split dark/cream */}
        <AboutManifesto />

        {/* Business model — dark */}
        <div className="alt-dark">
          <FadeUp variant="reveal">
            <BusinessModel />
          </FadeUp>
        </div>

        {/* FAQ — cream */}
        <div className="alt-cream">
          <FadeUp variant="reveal">
            <FAQ />
          </FadeUp>
        </div>

        {/* Lead form — dark */}
        <div className="alt-dark">
          <FadeUp variant="reveal">
            <LeadForm />
          </FadeUp>
        </div>

        {/* Final CTA — dark */}
        <div className="alt-dark">
          <FadeUp variant="reveal">
            <FinalCTA />
          </FadeUp>
        </div>
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
