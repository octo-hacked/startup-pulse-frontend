import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckIcon,
  ClipboardListIcon,
  MessageSquareIcon,
  GraduationCapIcon
} from 'lucide-react';

const ServiceCard = ({ 
  title, 
  description, 
  price, 
  period, 
  features, 
  icon, 
  linkTo, 
  buttonText,
  isPopular = false
}: { 
  title: string; 
  description: string; 
  price: string; 
  period: string; 
  features: string[]; 
  icon: React.ReactNode; 
  linkTo: string; 
  buttonText: string;
  isPopular?: boolean;
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 ${isPopular ? 'border-2 border-primary' : ''}`}>
      {isPopular && (
        <div className="bg-primary py-2">
          <p className="text-center text-white font-semibold">MOST POPULAR</p>
        </div>
      )}
      <div className="p-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="heading text-xl font-semibold text-dark mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="mb-6">
          <span className="text-3xl font-bold text-dark">₹{price}</span>
          <span className="text-gray-500">{period}</span>
        </div>
        <ul className="mb-8 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link href={linkTo}>
          <Button className="w-full bg-primary hover:bg-primary-dark">
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading text-3xl md:text-4xl font-bold text-dark mb-4">Our Services</h2>
          <p className="max-w-3xl mx-auto text-gray-600">Choose the right level of support for your entrepreneurial journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            title="Self Evaluation"
            description="Gain valuable insights about your startup's potential with our comprehensive self-assessment tool."
            price="250"
            period="one-time"
            features={[
              "Detailed startup readiness assessment",
              "Market fit analysis",
              "Personalized report with recommendations",
              "Strengths and weaknesses identification"
            ]}
            icon={<ClipboardListIcon className="text-primary h-6 w-6" />}
            linkTo="/self-evaluation"
            buttonText="Get Started"
          />

          <ServiceCard
            title="Expert Consultancy"
            description="Get personalized advice from industry experts to overcome your specific business challenges."
            price="1,000"
            period="/hour"
            features={[
              "1-on-1 sessions with industry experts",
              "Tailored business advice",
              "Problem-solving strategies",
              "Follow-up action plan"
            ]}
            icon={<MessageSquareIcon className="text-secondary h-6 w-6" />}
            linkTo="/consultancy"
            buttonText="Book a Session"
          />

          <ServiceCard
            title="Complete Mentorship Program"
            description="Our comprehensive program provides everything you need to transform your startup idea into a successful business."
            price="10,000"
            period="/6 months"
            features={[
              "Complete business grooming",
              "Access to Cogniphy's VC network",
              "Weekly mentorship sessions",
              "Pitch deck development",
              "Investor introduction opportunities"
            ]}
            icon={<GraduationCapIcon className="text-primary h-6 w-6" />}
            linkTo="/mentorship"
            buttonText="Enroll Now"
            isPopular={true}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
