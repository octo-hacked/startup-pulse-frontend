import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  PresentationIcon,
  UsersIcon,
  CodeIcon,
  PieChartIcon,
  MegaphoneIcon,
  HandshakeIcon
} from 'lucide-react';
import { ProgramFeature } from '@/lib/types';

const features: ProgramFeature[] = [
  {
    icon: "PresentationIcon",
    title: "Expert Mentorship",
    description: "Weekly one-on-one sessions with experienced entrepreneurs and industry experts who will guide your business growth."
  },
  {
    icon: "UsersIcon",
    title: "VC Network Access",
    description: "Direct introductions to our network of venture capitalists and angel investors looking for promising startups."
  },
  {
    icon: "CodeIcon",
    title: "Business Development",
    description: "Workshops on product development, market strategy, customer acquisition, and operational excellence."
  },
  {
    icon: "PieChartIcon",
    title: "Financial Planning",
    description: "Learn how to manage cash flow, create financial projections, and prepare for funding rounds."
  },
  {
    icon: "MegaphoneIcon",
    title: "Marketing Strategy",
    description: "Develop effective marketing campaigns and build a strong brand presence in your industry."
  },
  {
    icon: "HandshakeIcon",
    title: "Pitch Development",
    description: "Craft a compelling pitch deck and improve your presentation skills for investor meetings."
  }
];

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case "PresentationIcon":
      return <PresentationIcon className="text-primary text-xl" />;
    case "UsersIcon":
      return <UsersIcon className="text-primary text-xl" />;
    case "CodeIcon":
      return <CodeIcon className="text-primary text-xl" />;
    case "PieChartIcon":
      return <PieChartIcon className="text-primary text-xl" />;
    case "MegaphoneIcon":
      return <MegaphoneIcon className="text-primary text-xl" />;
    case "HandshakeIcon":
      return <HandshakeIcon className="text-primary text-xl" />;
    default:
      return <PresentationIcon className="text-primary text-xl" />;
  }
};

const ProgramDetailsSection = () => {
  return (
    <section id="mentorship-program" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heading text-3xl md:text-4xl font-bold text-dark mb-4">Mentorship Program Details</h2>
          <p className="max-w-3xl mx-auto text-gray-600">Our 6-month comprehensive program to accelerate your startup</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                {renderIcon(feature.icon)}
              </div>
              <h3 className="heading text-xl font-semibold text-dark mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 shadow-lg">
          <h3 className="heading text-2xl font-semibold text-dark mb-4">Enrollment Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold text-dark mb-2">Apply</h4>
              <p className="text-gray-600">Fill out our application form with your startup details</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold text-dark mb-2">Interview</h4>
              <p className="text-gray-600">Schedule a call with our team to discuss your goals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold text-dark mb-2">Enroll</h4>
              <p className="text-gray-600">Complete payment and begin your 6-month journey</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/mentorship">
              <Button className="bg-primary hover:bg-primary-dark">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramDetailsSection;
