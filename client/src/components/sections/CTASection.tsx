import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="heading text-3xl md:text-4xl font-bold text-white mb-6">Ready to Accelerate Your Startup?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">Join hundreds of successful entrepreneurs who have transformed their startups with StartupPulse</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#services">
            <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100 px-8 py-6 h-auto">
              Get Started
            </Button>
          </a>
          <a href="#contact">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary px-8 py-6 h-auto">
              Contact Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
