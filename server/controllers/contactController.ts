import { Request, Response } from "express";
import { storage } from "../storage";
import { insertContactSchema } from "@shared/schema";

export async function handleContactSubmission(req: Request, res: Response) {
  try {
    // Validate the contact form data against the schema
    const validatedData = insertContactSchema.parse(req.body);
    
    // Store the contact message in the database
    const contact = await storage.createContact(validatedData);
    
    // Send a success response
    res.status(201).json({ 
      success: true, 
      message: "Contact message received successfully",
      contactId: contact.id
    });
  } catch (error: any) {
    // Handle validation errors or database errors
    res.status(400).json({ 
      success: false, 
      message: "Failed to process contact submission", 
      error: error.message 
    });
  }
}
