import { useEffect, useState } from 'react';

import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Chatbot = () => {
 
  const { subscriptionStatus,navigate,fetchSubscriptionStatus,token } = useAppContext();

  useEffect(() => {
    fetchSubscriptionStatus();
    if (subscriptionStatus && !subscriptionStatus.chatbot) {
        toast.error('You need to subscribe to the chatbot service to access this feature.');
        navigate('/self-evaluation'); // Redirect to checkout page for chatbot subscription
    }
  }, [subscriptionStatus,token])
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
     
    </div>
  );
};

export default Chatbot;
