import { Request, Response } from "express";
import Stripe from "stripe";
import { storage } from "../storage";
import {
  insertSelfEvaluationSchema,
  insertConsultationSchema,
  insertMentorshipSchema,
} from "@shared/schema";

export async function createPaymentIntent(req: Request, res: Response, stripe: Stripe) {
  const { amount, serviceType } = req.body;

  try {
    // Amount should be in the smallest currency unit (paise for INR)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: "inr",
      metadata: {
        serviceType,
      },
    });

    // Store payment information
    await storage.createPayment({
      amount,
      currency: "inr",
      serviceType,
      status: "pending",
      paymentIntentId: paymentIntent.id,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating payment intent: " + error.message });
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
