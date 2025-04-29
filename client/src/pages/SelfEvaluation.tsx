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
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { SelfEvaluationFormData } from '@/lib/types';

const formSchema = z.object({
  founderName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  founderEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  startupName: z.string().min(2, {
    message: "Startup name must be at least 2 characters.",
  }),
  industry: z.string().min(1, {
    message: "Please select an industry.",
  }),
  businessDescription: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).max(500, {
    message: "Description must not exceed 500 characters.",
  }),
  stage: z.string().min(1, {
    message: "Please select your startup stage.",
  }),
  funding: z.string().min(1, {
    message: "Please indicate if you've received funding.",
  }),
  teamSize: z.string().min(1, {
    message: "Please select your team size.",
  }),
  challenges: z.array(z.string()).min(1, {
    message: "Please select at least one challenge.",
  }).max(3, {
    message: "Please select up to 3 challenges."
  }),
});

const SelfEvaluation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [_, navigate] = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      founderName: "",
      founderEmail: "",
      startupName: "",
      industry: "",
      businessDescription: "",
      stage: "",
      funding: "",
      teamSize: "",
      challenges: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // First store the self-evaluation data
      await apiRequest('POST', '/api/self-evaluation', values);
      
      // Then redirect to payment page
      navigate('/checkout/self-evaluation/250');
    } catch (error) {
      console.error('Error submitting self-evaluation form:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const challengesOptions = [
    { id: "funding", label: "Raising Funding" },
    { id: "product", label: "Product Development" },
    { id: "marketing", label: "Marketing/Customer Acquisition" },
    { id: "team", label: "Team Building" },
    { id: "scaling", label: "Scaling Operations" },
    { id: "other", label: "Other" },
  ];

  return (
    <>
      <Helmet>
        <title>Self Evaluation - Startup Pulse</title>
        <meta name="description" content="Gain valuable insights about your startup's potential with our comprehensive self-assessment tool." />
      </Helmet>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading text-3xl md:text-4xl font-bold text-dark mb-4">Self Evaluation</h2>
            <p className="max-w-3xl mx-auto text-gray-600">Gain valuable insights about your startup's potential</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-gray-50 mb-8">
              <CardContent className="p-6">
                <h3 className="heading text-xl font-semibold text-dark mb-4">How It Works</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">1</div>
                    </div>
                    <div className="ml-4">
                      <p className="text-dark">Complete the evaluation form with details about your startup</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">2</div>
                    </div>
                    <div className="ml-4">
                      <p className="text-dark">Make a payment of ₹250</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">3</div>
                    </div>
                    <div className="ml-4">
                      <p className="text-dark">Receive a comprehensive report within 3 business days</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">4</div>
                    </div>
                    <div className="ml-4">
                      <p className="text-dark">Review personalized recommendations for your business</p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
    
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <h3 className="heading text-xl font-semibold text-dark mb-4">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="founderName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Founder Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="founderEmail"
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
                          name="startupName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Startup Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your startup name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Industry</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select industry" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="technology">Technology</SelectItem>
                                  <SelectItem value="healthcare">Healthcare</SelectItem>
                                  <SelectItem value="education">Education</SelectItem>
                                  <SelectItem value="finance">Finance</SelectItem>
                                  <SelectItem value="ecommerce">E-Commerce</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="heading text-xl font-semibold text-dark mb-4">Business Details</h3>
                      
                      <FormField
                        control={form.control}
                        name="businessDescription"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel>Describe your business (limit 500 characters)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="What does your business do? What problem does it solve?" 
                                className="min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="stage"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel>Current stage of your startup</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="idea" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Idea Stage</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="prototype" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Prototype/MVP</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="revenue" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Revenue Generating</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="scaling" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Scaling</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="funding"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel>Have you received any funding to date?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex items-center space-x-4"
                              >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="yes" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Yes</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="no" />
                                  </FormControl>
                                  <FormLabel className="font-normal">No</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="teamSize"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel>Current team size</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select team size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="solo">Solo Founder</SelectItem>
                                <SelectItem value="2-5">2-5 Team Members</SelectItem>
                                <SelectItem value="6-10">6-10 Team Members</SelectItem>
                                <SelectItem value="11+">11+ Team Members</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="challenges"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>What are your biggest challenges right now? (Select up to 3)</FormLabel>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                {challengesOptions.map((option) => (
                                  <FormField
                                    key={option.id}
                                    control={form.control}
                                    name="challenges"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={option.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(option.id)}
                                              onCheckedChange={(checked) => {
                                                const current = field.value || [];
                                                
                                                // Don't allow more than 3 selections
                                                if (checked && current.length >= 3 && !current.includes(option.id)) {
                                                  toast({
                                                    title: "Maximum Selections Reached",
                                                    description: "Please select up to 3 challenges.",
                                                    variant: "destructive",
                                                  });
                                                  return;
                                                }
                                                
                                                return checked
                                                  ? field.onChange([...current, option.id])
                                                  : field.onChange(
                                                      current.filter((value) => value !== option.id)
                                                    );
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {option.label}
                                          </FormLabel>
                                        </FormItem>
                                      );
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-dark">Evaluation Fee</p>
                          <p className="text-gray-600">One-time payment</p>
                        </div>
                        <p className="text-xl font-bold text-dark">₹250</p>
                      </div>
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
      </section>
    </>
  );
};

export default SelfEvaluation;
