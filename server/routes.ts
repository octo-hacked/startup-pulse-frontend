import type { Express } from "express";
import { createServer, type Server } from "http";
import Razorpay from "razorpay";
import { storage } from "./storage";
import { handleContactSubmission } from "./controllers/contactController";
import { 
  createRazorpayOrder, 
  handleConsultationPayment, 
  handleSelfEvaluationPayment, 
  handleMentorshipPayment, 
  verifyRazorpayPayment 
} from "./controllers/paymentController";
import { randomUUID } from 'crypto';

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn('Missing required Razorpay secrets: RAZORPAY_KEY_ID and/or RAZORPAY_KEY_SECRET. Payment functionality will not work correctly.');
}

const razorpay = (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) ? 
  new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  }) : undefined;

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/contact", handleContactSubmission);

  // Payment routes - Create Razorpay Order
  app.post("/api/create-payment-order", async (req, res) => {
    try {
      const { amount, serviceType } = req.body;
      
      if (razorpay) {
        // Use real Razorpay if configured
        await createRazorpayOrder(req, res, razorpay);
      } else {
        // Mock payment order for demo purposes
        console.log(`Creating mock payment order for ${serviceType} with amount ${amount}`);
        
        // Create a payment record
        const payment = await storage.createPayment({
          amount,
          currency: "INR",
          serviceType,
          status: "pending",
          paymentIntentId: `mock_order_${randomUUID().replace(/-/g, '')}`
        });
        
        // Return a mock order
        // For demo purposes, we're just generating a random ID
        res.json({ 
          id: `mock_order_${randomUUID().replace(/-/g, '')}`,
          amount: amount * 100, // In paise
          currency: "INR",
          key: "rzp_test_mock_key",
          mock: true
        });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating payment order: " + error.message });
    }
  });

  // Verify payment after successful checkout
  app.post("/api/verify-payment", async (req, res) => {
    try {
      if (razorpay) {
        // Verify real payment
        await verifyRazorpayPayment(req, res, razorpay);
      } else {
        // For mock payments, we'll just return success
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        
        // In demo mode, all payments are considered successful
        res.json({
          success: true,
          paymentId: razorpay_payment_id || `mock_payment_${randomUUID().replace(/-/g, '')}`,
          orderId: razorpay_order_id,
          signature: razorpay_signature || 'mock_signature'
        });
      }
    } catch (error: any) {
      res.status(500).json({ 
        success: false,
        message: "Error verifying payment: " + error.message 
      });
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
