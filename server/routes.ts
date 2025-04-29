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
import { randomUUID } from 'crypto';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Missing required Stripe secret: STRIPE_SECRET_KEY. Payment functionality will not work correctly.');
}

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-03-31.basil" as any,
}) : undefined;

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/contact", handleContactSubmission);

  // Payment routes
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, serviceType } = req.body;
      
      if (stripe) {
        // Use real Stripe if configured
        await createPaymentIntent(req, res, stripe);
      } else {
        // Mock payment intent for demo purposes
        console.log(`Creating mock payment intent for ${serviceType} with amount ${amount}`);
        
        // Create a payment record
        const payment = await storage.createPayment({
          amount,
          currency: "inr",
          serviceType,
          status: "pending",
          paymentIntentId: `mock_pi_${randomUUID().replace(/-/g, '')}`
        });
        
        // Return a mock client secret
        // In a real Stripe implementation, this would be a secure token
        // For demo purposes, we're just generating a random ID
        res.json({ 
          clientSecret: `mock_seti_${randomUUID().replace(/-/g, '')}_secret_${randomUUID().replace(/-/g, '')}`
        });
      }
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
