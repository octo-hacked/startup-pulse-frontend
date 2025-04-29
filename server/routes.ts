import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { handleContactSubmission } from "./controllers/contactController";
import { 
  createPaymentIntent, 
  handleConsultationPayment, 
  handleSelfEvaluationPayment, 
  handleMentorshipPayment 
} from "./controllers/paymentController";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Missing required Stripe secret: STRIPE_SECRET_KEY. Payment functionality will not work correctly.');
}

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
}) : undefined;

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/contact", handleContactSubmission);

  // Payment routes
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(500).json({ 
          message: "Stripe is not configured. Please set the STRIPE_SECRET_KEY environment variable." 
        });
      }
      
      const { amount, serviceType } = req.body;
      await createPaymentIntent(req, res, stripe);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Service-specific payment handlers
  app.post("/api/self-evaluation", async (req, res) => {
    try {
      await handleSelfEvaluationPayment(req, res);
    } catch (error: any) {
      res.status(500).json({ message: "Error processing self-evaluation: " + error.message });
    }
  });

  app.post("/api/book-consultation", async (req, res) => {
    try {
      await handleConsultationPayment(req, res);
    } catch (error: any) {
      res.status(500).json({ message: "Error booking consultation: " + error.message });
    }
  });

  app.post("/api/mentorship-enrollment", async (req, res) => {
    try {
      await handleMentorshipPayment(req, res);
    } catch (error: any) {
      res.status(500).json({ message: "Error processing mentorship enrollment: " + error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
