import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const selfEvaluations = pgTable("self_evaluations", {
  id: serial("id").primaryKey(),
  founderName: text("founder_name").notNull(),
  founderEmail: text("founder_email").notNull(),
  startupName: text("startup_name").notNull(),
  industry: text("industry").notNull(),
  businessDescription: text("business_description").notNull(),
  stage: text("stage").notNull(),
  funding: text("funding").notNull(),
  teamSize: text("team_size").notNull(),
  challenges: text("challenges").notNull(),
  paymentId: text("payment_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  consultant: text("consultant").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  topics: text("topics").notNull(),
  paymentId: text("payment_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const mentorships = pgTable("mentorships", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  startupName: text("startup_name").notNull(),
  industry: text("industry").notNull(),
  stage: text("stage").notNull(),
  team: text("team").notNull(),
  goals: text("goals").notNull(),
  paymentId: text("payment_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  amount: doublePrecision("amount").notNull(),
  currency: text("currency").notNull(),
  serviceType: text("service_type").notNull(),
  status: text("status").notNull(),
  paymentIntentId: text("payment_intent_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSelfEvaluationSchema = createInsertSchema(selfEvaluations).omit({
  id: true,
  createdAt: true,
  paymentId: true,
});

export const insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
  createdAt: true,
  paymentId: true,
});

export const insertMentorshipSchema = createInsertSchema(mentorships).omit({
  id: true,
  createdAt: true,
  paymentId: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSelfEvaluation = z.infer<typeof insertSelfEvaluationSchema>;
export type SelfEvaluation = typeof selfEvaluations.$inferSelect;

export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultations.$inferSelect;

export type InsertMentorship = z.infer<typeof insertMentorshipSchema>;
export type Mentorship = typeof mentorships.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;
