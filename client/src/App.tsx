import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import SelfEvaluation from "@/pages/SelfEvaluation";
import Consultancy from "@/pages/Consultancy";
import Mentorship from "@/pages/Mentorship";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/not-found";
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AppProvider } from "./context/AppContext";
import { ToastContainer} from 'react-toastify';
import Chatbot from "./pages/Chatbot";
import {Dashboard} from "./pages/Dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/self-evaluation" component={SelfEvaluation} />
      <Route path="/consultancy" component={Consultancy} />
      <Route path="/mentorship" component={Mentorship} />
      <Route path="/checkout/:serviceType/:amount" component={Checkout} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/chatbot" component={Chatbot} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-16">
              <Router />
            </main>
          </div>
          <ToastContainer/>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
