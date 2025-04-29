import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { 
  serviceTypeNames, 
  serviceTypeAmounts, 
  serviceTypeDescriptions, 
  formatCurrency 
} from '@/lib/utils';
import { Helmet } from 'react-helmet';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  console.warn('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY. Payment functionality will not work correctly.');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

type ServiceType = 'self-evaluation' | 'consultancy' | 'mentorship';

const CheckoutForm = ({ 
  serviceType, 
  amount,
  clientSecret 
}: { 
  serviceType: ServiceType, 
  amount: number,
  clientSecret: string
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsProcessing(true);

    // Check if we're using a mock client secret (for demo without Stripe)
    if (clientSecret.startsWith('mock_')) {
      // For demo purposes, we'll simulate a successful payment
      setPaymentStatus('success');
      toast({
        title: "Payment Successful (Demo Mode)",
        description: "This is a simulated payment since Stripe is not configured.",
      });
      // Redirect after 3 seconds on success
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } else {
      // Real Stripe payment processing
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: 'if_required',
      });

      if (error) {
        setPaymentStatus('error');
        setErrorMessage(error.message || "An unexpected error occurred.");
        toast({
          title: "Payment Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setPaymentStatus('success');
        toast({
          title: "Payment Successful",
          description: "Thank you for your purchase!",
        });
        // Redirect after 3 seconds on success
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    }

    setIsProcessing(false);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-green-900 mb-2">Payment Successful</h3>
        <p className="text-green-700 mb-4">
          Thank you for your payment. Your {serviceTypeNames[serviceType]} has been processed successfully.
        </p>
        <p className="text-sm text-green-600">
          You'll be redirected to the homepage in a few seconds...
        </p>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-red-900 mb-2">Payment Failed</h3>
        <p className="text-red-700 mb-4">{errorMessage}</p>
        <Button
          variant="outline"
          onClick={() => setPaymentStatus('idle')}
        >
          Try again
        </Button>
      </div>
    );
  }

  // For demo mode (when using mock client secret)
  if (clientSecret.startsWith('mock_')) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <p className="text-blue-800 font-medium">Demo Mode</p>
          <p className="text-blue-700 text-sm mb-2">Stripe API keys are not configured. This is a simulated checkout experience.</p>
          <p className="text-sm text-blue-600">In a real environment, you would see the Stripe payment form here.</p>
        </div>
        
        <div className="border rounded-md p-4 mb-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Card Information</label>
              <div className="h-10 bg-gray-100 rounded flex items-center px-3 text-gray-400">
                Demo card field (no actual payment will be processed)
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Expiration</label>
                <div className="h-10 bg-gray-100 rounded flex items-center px-3 text-gray-400">MM/YY</div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CVC</label>
                <div className="h-10 bg-gray-100 rounded flex items-center px-3 text-gray-400">123</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => window.history.back()}
            disabled={isProcessing}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary-dark"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Complete Payment (Demo)"}
          </Button>
        </div>
      </form>
    );
  }
  
  // For real Stripe implementation
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <div className="flex justify-between mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => window.history.back()}
          disabled={isProcessing}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          type="submit" 
          className="bg-primary hover:bg-primary-dark"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? "Processing..." : "Complete Payment"}
        </Button>
      </div>
    </form>
  );
};

const Checkout = () => {
  const params = useParams<{ serviceType: ServiceType, amount: string }>();
  const { toast } = useToast();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const serviceType = params.serviceType as ServiceType;
  const amount = parseInt(params.amount || '0');

  // Validate service type and amount
  useEffect(() => {
    if (!serviceType || !Object.keys(serviceTypeNames).includes(serviceType)) {
      setError("Invalid service type");
      setLoading(false);
      return;
    }

    if (!amount || amount !== serviceTypeAmounts[serviceType]) {
      setError("Invalid amount for the selected service");
      setLoading(false);
      return;
    }

    // Create PaymentIntent as soon as the page loads
    const fetchPaymentIntent = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", { 
          amount, 
          serviceType 
        });
        
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError("Failed to initialize payment. Please try again later.");
        toast({
          title: "Payment Error",
          description: "There was a problem setting up the payment. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [serviceType, amount, toast]);

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <p>{error}</p>
            <Button 
              className="mt-4" 
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading || !clientSecret) {
    return (
      <div className="container mx-auto py-12 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  // Define options for Stripe Elements
  const appearance = {
    theme: 'stripe' as const, // Type-safe theme value
    variables: {
      colorPrimary: '#1a56db',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <Helmet>
        <title>Checkout - {serviceTypeNames[serviceType]} | Startup Pulse</title>
      </Helmet>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">{serviceTypeNames[serviceType]}</CardTitle>
              <CardDescription>{serviceTypeDescriptions[serviceType]}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-700">Total Amount</p>
                  </div>
                  <p className="text-xl font-bold">{formatCurrency(amount)}</p>
                </div>
              </div>
              
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm 
                  serviceType={serviceType} 
                  amount={amount} 
                  clientSecret={clientSecret}
                />
              </Elements>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Checkout;
