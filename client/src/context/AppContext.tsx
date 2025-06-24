import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useLocation } from 'wouter';
import axios from 'axios';
import { toast } from 'react-toastify';
import { stat } from 'fs';

// Define types
type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt?: string;
};

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type SubscriptionStatus = {
  chatbot: boolean;
  mentor: boolean;
  guidance: boolean;
};

interface AppContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  navigate: (path: string) => void;
  backendUrl: string;
  initPay: (order: RazorpayOrder, formType: string) => void;
  subscriptionStatus: SubscriptionStatus | null;
  fetchSubscriptionStatus: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
  const [, setLocation] = useLocation();
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);

  useEffect(() => {
    localStorage.setItem('token', token);
    if (token) {
      fetchSubscriptionStatus();
    }
  }, [token]);

  const navigate = (path: string) => setLocation(path);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/subscription/check`, {}, { headers: { token } });
      if (response.data.status) {
        setSubscriptionStatus(response.data.status);
      } else {
        console.warn("Status not found in response!");
      }

    } catch (err) {
      console.error('Error fetching subscription status:', err);
      setSubscriptionStatus(null);
    }
  };

  const initPay = (order: RazorpayOrder, formType: string): void => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID as string,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Payment for self-evaluation",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response: RazorpayResponse) => {
        try {
          const verification = await axios.post(
            `${backendUrl}/api/form/verifyPayment`,
            { razorpay_order_id: response.razorpay_order_id, formType },
            { headers: { token } }
          );

          if (verification.data.success) {
            await fetchSubscriptionStatus();
            navigate('/chatbot');
          } else {
            toast.error(verification.data.message || "Payment verification failed. Please try again.");
          }
        } catch (error) {
          toast.error("Payment verification failed. Please try again.");
          navigate('/');
        }
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const value: AppContextType = {
    token,
    setToken,
    navigate,
    backendUrl,
    initPay,
    subscriptionStatus,
    fetchSubscriptionStatus
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppContext };