import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency, serviceTypeDescriptions, serviceTypeNames } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

type ServiceType = 'self-evaluation' | 'consultancy' | 'mentorship';

// Declare Razorpay as a global variable
declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const params = useParams<{ serviceType: ServiceType, amount: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [key, setKey] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [_, navigate] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMockPayment, setIsMockPayment] = useState(false);

  const serviceType = params.serviceType as ServiceType;
  const amount = parseInt(params.amount || '0');

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    const initializeRazorpay = async () => {
      const res = await loadRazorpayScript();
      if (!res) {
        console.error('Razorpay SDK failed to load');
        toast({
          title: "Razorpay Error",
          description: "Could not load the Razorpay SDK. Please try again later.",
          variant: "destructive",
        });
      }
    };

    initializeRazorpay();
  }, [toast]);

  // Validate service type and amount
  useEffect(() => {
    if (!serviceType || !Object.keys(serviceTypeNames).includes(serviceType)) {
      setError("Invalid service type");
      setLoading(false);
      return;
    }

    if (!amount || amount !== parseInt(params.amount)) {
      setError("Invalid amount for the selected service");
      setLoading(false);
      return;
    }

    // Create Razorpay order
    const createOrder = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-payment-order", { 
          amount, 
          serviceType 
        });
        
        const data = await response.json();
        
        if (data.mock) {
          setIsMockPayment(true);
        }
        
        setOrderId(data.id);
        setKey(data.key);
        setLoading(false);
      } catch (err) {
        console.error("Error creating payment order:", err);
        setError("Failed to initialize payment. Please try again later.");
        toast({
          title: "Payment Error",
          description: "There was a problem setting up the payment. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    createOrder();
  }, [serviceType, amount, toast, params.amount]);

  const handlePayment = async () => {
    if (!orderId || !key) {
      toast({
        title: "Payment Error",
        description: "Could not initialize payment. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // For mock payments (when Razorpay keys are not available)
    if (isMockPayment) {
      try {
        // Simulate a successful payment verification
        const verifyResponse = await apiRequest("POST", "/api/verify-payment", {
          razorpay_payment_id: `mock_pay_${Date.now()}`,
          razorpay_order_id: orderId,
          razorpay_signature: "mock_signature"
        });
        
        const verifyData = await verifyResponse.json();
        
        if (verifyData.success) {
          setPaymentStatus('success');
          toast({
            title: "Payment Successful (Demo Mode)",
            description: "This is a simulated payment since Razorpay is not configured.",
          });
          // Redirect after 3 seconds on success
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          setPaymentStatus('error');
          toast({
            title: "Payment Failed",
            description: verifyData.message || "An unexpected error occurred",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error verifying mock payment:", error);
        setPaymentStatus('error');
        toast({
          title: "Payment Failed",
          description: "There was a problem processing your payment. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    // Real Razorpay integration
    if (typeof window.Razorpay === 'undefined') {
      toast({
        title: "Payment Error",
        description: "Razorpay is not available. Please try again later.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    const options = {
      key: key,
      amount: amount * 100, // in paise
      currency: "INR",
      name: "Startup Pulse",
      description: `Payment for ${serviceTypeNames[serviceType]}`,
      order_id: orderId,
      handler: async function (response: any) {
        try {
          // Verify payment signature on the server
          const verifyResponse = await apiRequest("POST", "/api/verify-payment", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          });
          
          const verifyData = await verifyResponse.json();
          
          if (verifyData.success) {
            setPaymentStatus('success');
            toast({
              title: "Payment Successful",
              description: "Thank you for your purchase!",
            });
            // Redirect after 3 seconds on success
            setTimeout(() => {
              navigate('/');
            }, 3000);
          } else {
            setPaymentStatus('error');
            toast({
              title: "Payment Failed",
              description: verifyData.message || "An unexpected error occurred",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          setPaymentStatus('error');
          toast({
            title: "Payment Failed",
            description: "There was a problem verifying your payment. Please contact support.",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
      },
      prefill: {
        name: "",
        email: "",
        contact: ""
      },
      theme: {
        color: "#1a56db",
      }
    };

    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Error initializing Razorpay:", err);
      toast({
        title: "Payment Error",
        description: "Could not initialize payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

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

  if (loading) {
    return (
      <div className="container mx-auto py-12 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center p-6">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-green-900 mb-2">Payment Successful</h3>
            <p className="text-green-700 mb-4">
              Thank you for your payment. Your {serviceTypeNames[serviceType]} has been processed successfully.
            </p>
            <p className="text-sm text-green-600">
              You'll be redirected to the homepage in a few seconds...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center p-6">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-red-900 mb-2">Payment Failed</h3>
            <p className="text-red-700 mb-4">There was an issue processing your payment. Please try again.</p>
            <Button
              variant="outline"
              onClick={() => setPaymentStatus('idle')}
            >
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              
              {isMockPayment && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <p className="text-blue-800 font-medium">Demo Mode</p>
                  <p className="text-blue-700 text-sm mb-2">Razorpay API keys are not configured. This is a simulated checkout experience.</p>
                  <p className="text-sm text-blue-600">In a real environment, you would see the Razorpay payment form.</p>
                </div>
              )}
              
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
                  type="button" 
                  className="bg-primary hover:bg-primary-dark"
                  disabled={isProcessing}
                  onClick={handlePayment}
                >
                  {isProcessing ? "Processing..." : isMockPayment ? "Complete Payment (Demo)" : "Pay Now"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Checkout;