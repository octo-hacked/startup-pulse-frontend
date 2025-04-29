import { Request, Response } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import { storage } from "../storage";
import {
  insertSelfEvaluationSchema,
  insertConsultationSchema,
  insertMentorshipSchema,
} from "@shared/schema";

export async function createRazorpayOrder(req: Request, res: Response, razorpay: Razorpay) {
  const { amount, serviceType } = req.body;

  try {
    // Create a new Razorpay order
    // Amount should be in the smallest currency unit (paise for INR)
    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        serviceType,
      }
    };

    const order = await razorpay.orders.create(options);

    // Store payment information
    await storage.createPayment({
      amount,
      currency: "INR",
      serviceType,
      status: "pending",
      paymentIntentId: order.id,
    });

    // Send the order details to the client
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating Razorpay order: " + error.message });
  }
}

export async function verifyRazorpayPayment(req: Request, res: Response, razorpay: Razorpay) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update payment status in database
      // Find payment by order ID
      // TODO: Add method to update payment status

      res.json({
        success: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error verifying payment: " + error.message
    });
  }
}

export async function handleSelfEvaluationPayment(req: Request, res: Response) {
  try {
    const validatedData = insertSelfEvaluationSchema.parse(req.body);
    const evaluation = await storage.createSelfEvaluation(validatedData);
    res.status(201).json({ success: true, evaluationId: evaluation.id });
  } catch (error: any) {
    res.status(400).json({ message: "Invalid data: " + error.message });
  }
}

export async function handleConsultationPayment(req: Request, res: Response) {
  try {
    const validatedData = insertConsultationSchema.parse(req.body);
    const consultation = await storage.createConsultation(validatedData);
    res.status(201).json({ success: true, consultationId: consultation.id });
  } catch (error: any) {
    res.status(400).json({ message: "Invalid data: " + error.message });
  }
}

export async function handleMentorshipPayment(req: Request, res: Response) {
  try {
    const validatedData = insertMentorshipSchema.parse(req.body);
    const mentorship = await storage.createMentorship(validatedData);
    res.status(201).json({ success: true, mentorshipId: mentorship.id });
  } catch (error: any) {
    res.status(400).json({ message: "Invalid data: " + error.message });
  }
}
