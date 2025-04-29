import { useState } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Consultant } from '@/lib/types';

const consultants: Consultant[] = [
  {
    id: 1,
    name: "Priya Patel",
    specialty: "Marketing",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Amit Singh",
    specialty: "Finance",
    image: "https://randomuser.me/api/portraits/men/86.jpg"
  },
  {
    id: 3,
    name: "Divya Sharma",
    specialty: "Technology",
    image: "https://randomuser.me/api/portraits/women/22.jpg"
  }
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  consultant: z.string().min(1, {
    message: "Please select a consultant.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string().min(1, {
    message: "Please select a time slot.",
  }),
  topics: z.string().min(10, {
    message: "Please describe what you would like to discuss in at least 10 characters.",
  }).max(500, {
    message: "Description must not exceed 500 characters.",
  }),
});

const Consultancy = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [_, navigate] = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      consultant: "",
      topics: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Format date to string for API
    const formattedValues = {
      ...values,
      date: format(values.date, "yyyy-MM-dd"),
    };
    
    try {
      // First store the consultation data
      await apiRequest('POST', '/api/book-consultation', formattedValues);
      
      // Then redirect to payment page
      navigate('/checkout/consultancy/1000');
    } catch (error) {
      console.error('Error booking consultation:', error);
      toast({
        title: "Error",
        description: "There was a problem booking your consultation. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Expert Consultancy - Startup Pulse</title>
        <meta name="description" content="Book personalized advice sessions with industry experts to overcome your specific business challenges." />
      </Helmet>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading text-3xl md:text-4xl font-bold text-dark mb-4">Book a Consultation</h2>
            <p className="max-w-3xl mx-auto text-gray-600">Get personalized advice from our expert consultants</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Business consultation session" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              
              <div className="mt-8">
                <h3 className="heading text-2xl font-semibold text-dark mb-4">Our Consultants</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {consultants.map((consultant) => (
                    <div key={consultant.id} className="text-center">
                      <img 
                        src={consultant.image} 
                        alt={consultant.name} 
                        className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
                      />
                      <p className="font-medium text-dark">{consultant.name}</p>
                      <p className="text-sm text-gray-500">{consultant.specialty}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="consultant"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Consultant</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose a consultant" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="marketing">Marketing Expert</SelectItem>
                                <SelectItem value="finance">Finance Expert</SelectItem>
                                <SelectItem value="technology">Technology Expert</SelectItem>
                                <SelectItem value="business">Business Strategy Expert</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Preferred Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => {
                                    // Disable dates in the past and weekends
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    const day = date.getDay();
                                    return date < today || day === 0 || day === 6;
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Time</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a time slot" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                <SelectItem value="12:00">12:00 PM</SelectItem>
                                <SelectItem value="14:00">2:00 PM</SelectItem>
                                <SelectItem value="15:00">3:00 PM</SelectItem>
                                <SelectItem value="16:00">4:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="topics"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Topics to Discuss</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="What would you like to discuss during your consultation?" 
                                className="min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="p-4 bg-gray-50 rounded-md mb-4">
                        <p className="font-medium text-dark mb-1">Consultation Fee</p>
                        <p className="text-gray-600">₹1,000 per hour</p>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary-dark"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Proceed to Payment"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Consultancy;
