import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import TrustSignalsSection from "@/components/home/TrustSignalsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import BookingFormSection from "@/components/home/BookingFormSection";
import ContactAvailabilitySection from "@/components/home/ContactAvailabilitySection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrustSignalsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <BookingFormSection />
      <ContactAvailabilitySection />
    </Layout>
  );
};

export default Index;
