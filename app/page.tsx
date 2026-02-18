import Header from "@/components/Header";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import HeroSection from "@/components/HeroSection";
import HeroVisual from "@/components/HeroVisual";
import StatsSection from "@/components/StatsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import ProductSection from "@/components/ProductSection";
import UseCasesSection from "@/components/UseCasesSection";
import CalculatorShowcase from "@/components/CalculatorShowcase";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import EnterpriseSection from "@/components/EnterpriseSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <AnnouncementBanner />
      <Header />
      <HeroSection />
      <HeroVisual />
      <StatsSection />
      <BeforeAfterSection />
      <ProductSection />
      <UseCasesSection />
      <CalculatorShowcase />
      <HowItWorksSection />
      <PricingSection />
      <EnterpriseSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
