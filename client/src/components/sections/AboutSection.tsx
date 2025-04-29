import { Button } from '@/components/ui/button';
import { 
  Users,
  TrendingUp,
  Handshake,
  Bolt
} from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="heading text-3xl md:text-4xl font-bold text-dark mb-6">Why Choose StartupPulse?</h2>
            <p className="text-gray-600 mb-6">
              StartupPulse is more than just an accelerator. We're a community of entrepreneurs, investors, and industry experts committed to helping startups thrive.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-primary">
                    <Users size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-dark">Expert Mentors</h3>
                  <p className="mt-2 text-gray-600">Access to industry leaders who have been where you are</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-primary">
                    <TrendingUp size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-dark">Proven Results</h3>
                  <p className="mt-2 text-gray-600">90% of our startups secure funding within a year</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-primary">
                    <Handshake size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-dark">Investor Network</h3>
                  <p className="mt-2 text-gray-600">Direct connections to VCs and angel investors</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-primary">
                    <Bolt size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-dark">Practical Resources</h3>
                  <p className="mt-2 text-gray-600">Bolt and strategies you can implement immediately</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#contact">
                <Button className="bg-primary hover:bg-primary-dark">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Business mentorship session" 
              className="rounded-lg shadow-lg object-cover h-64"
            />
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Startup team collaborating" 
              className="rounded-lg shadow-lg object-cover h-64 mt-8"
            />
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Entrepreneur working" 
              className="rounded-lg shadow-lg object-cover h-64 -mt-8"
            />
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Business consultation" 
              className="rounded-lg shadow-lg object-cover h-64"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
