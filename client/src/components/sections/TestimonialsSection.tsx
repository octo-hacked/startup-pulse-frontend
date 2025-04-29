import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';
import { Testimonial } from '@/lib/types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "StartupPulse was instrumental in helping us refine our business model and secure our first round of funding. The mentorship and connections we gained were invaluable.",
    name: "Rajesh Sharma",
    position: "CEO",
    company: "TechSolutions",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    id: 2,
    quote: "The self-evaluation service provided us with deep insights that helped us pivot our strategy. Within 3 months, we were able to double our user base.",
    name: "Priya Patel",
    position: "Founder",
    company: "EduTech India",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    id: 3,
    quote: "The expert consultancy solved critical problems in our supply chain. The personalized attention and tailored solutions made all the difference for our growing startup.",
    name: "Amit Singh",
    position: "COO",
    company: "LogiDelivery",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 5
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className="bg-white shadow-lg mx-2">
      <CardContent className="p-8">
        <div className="flex items-center mb-4">
          <div className="text-yellow-400 flex">
            {[...Array(testimonial.rating)].map((_, i) => (
              <StarIcon key={i} className="fill-current" size={16} />
            ))}
          </div>
        </div>
        <blockquote className="text-gray-600 mb-6">
          "{testimonial.quote}"
        </blockquote>
        <div className="flex items-center">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="h-12 w-12 rounded-full mr-4 object-cover"
          />
          <div>
            <p className="font-medium text-dark">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.position}, {testimonial.company}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heading text-3xl md:text-4xl font-bold text-dark mb-4">Success Stories</h2>
          <p className="max-w-3xl mx-auto text-gray-600">Hear from entrepreneurs who transformed their startups with StartupPulse</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
