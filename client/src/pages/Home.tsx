import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import StatsSection from '@/components/sections/StatsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ProgramDetailsSection from '@/components/sections/ProgramDetailsSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import ContactSection from '@/components/sections/ContactSection';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Startup Pulse - Accelerate Your Business Growth</title>
        <meta name="description" content="StartupPulse provides guidance, resources, and network to transform your vision into a thriving business." />
      </Helmet>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <StatsSection />
      <TestimonialsSection />
      <ProgramDetailsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </>
  );
};

export default Home;
