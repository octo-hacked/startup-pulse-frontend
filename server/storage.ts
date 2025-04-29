import { 
  users, type User, type InsertUser,
  type SelfEvaluation, type InsertSelfEvaluation,
  type Consultation, type InsertConsultation,
  type Mentorship, type InsertMentorship,
  type Contact, type InsertContact,
  type Payment, type InsertPayment
} from "@shared/schema";

// Interface with CRUD methods
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Self Evaluations
  createSelfEvaluation(data: InsertSelfEvaluation): Promise<SelfEvaluation>;
  getSelfEvaluation(id: number): Promise<SelfEvaluation | undefined>;
  
  // Consultations
  createConsultation(data: InsertConsultation): Promise<Consultation>;
  getConsultation(id: number): Promise<Consultation | undefined>;
  
  // Mentorships
  createMentorship(data: InsertMentorship): Promise<Mentorship>;
  getMentorship(id: number): Promise<Mentorship | undefined>;
  
  // Contacts
  createContact(data: InsertContact): Promise<Contact>;
  
  // Payments
  createPayment(data: InsertPayment): Promise<Payment>;
  getPayment(id: number): Promise<Payment | undefined>;
  updatePaymentStatus(id: number, status: string): Promise<Payment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private selfEvaluations: Map<number, SelfEvaluation>;
  private consultations: Map<number, Consultation>;
  private mentorships: Map<number, Mentorship>;
  private contacts: Map<number, Contact>;
  private payments: Map<number, Payment>;
  
  private userCurrentId: number;
  private selfEvalCurrentId: number;
  private consultationCurrentId: number;
  private mentorshipCurrentId: number;
  private contactCurrentId: number;
  private paymentCurrentId: number;

  constructor() {
    this.users = new Map();
    this.selfEvaluations = new Map();
    this.consultations = new Map();
    this.mentorships = new Map();
    this.contacts = new Map();
    this.payments = new Map();
    
    this.userCurrentId = 1;
    this.selfEvalCurrentId = 1;
    this.consultationCurrentId = 1;
    this.mentorshipCurrentId = 1;
    this.contactCurrentId = 1;
    this.paymentCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Self Evaluation methods
  async createSelfEvaluation(data: InsertSelfEvaluation): Promise<SelfEvaluation> {
    const id = this.selfEvalCurrentId++;
    const createdAt = new Date();
    const selfEvaluation: SelfEvaluation = { 
      ...data, 
      id, 
      createdAt,
      paymentId: null
    };
    this.selfEvaluations.set(id, selfEvaluation);
    return selfEvaluation;
  }
  
  async getSelfEvaluation(id: number): Promise<SelfEvaluation | undefined> {
    return this.selfEvaluations.get(id);
  }
  
  // Consultation methods
  async createConsultation(data: InsertConsultation): Promise<Consultation> {
    const id = this.consultationCurrentId++;
    const createdAt = new Date();
    const consultation: Consultation = { 
      ...data, 
      id, 
      createdAt,
      paymentId: null
    };
    this.consultations.set(id, consultation);
    return consultation;
  }
  
  async getConsultation(id: number): Promise<Consultation | undefined> {
    return this.consultations.get(id);
  }
  
  // Mentorship methods
  async createMentorship(data: InsertMentorship): Promise<Mentorship> {
    const id = this.mentorshipCurrentId++;
    const createdAt = new Date();
    const mentorship: Mentorship = { 
      ...data, 
      id, 
      createdAt,
      paymentId: null
    };
    this.mentorships.set(id, mentorship);
    return mentorship;
  }
  
  async getMentorship(id: number): Promise<Mentorship | undefined> {
    return this.mentorships.get(id);
  }
  
  // Contact methods
  async createContact(data: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const createdAt = new Date();
    const contact: Contact = { ...data, id, createdAt };
    this.contacts.set(id, contact);
    return contact;
  }
  
  // Payment methods
  async createPayment(data: InsertPayment): Promise<Payment> {
    const id = this.paymentCurrentId++;
    const createdAt = new Date();
    const payment: Payment = { ...data, id, createdAt };
    this.payments.set(id, payment);
    return payment;
  }
  
  async getPayment(id: number): Promise<Payment | undefined> {
    return this.payments.get(id);
  }
  
  async updatePaymentStatus(id: number, status: string): Promise<Payment | undefined> {
    const payment = this.payments.get(id);
    if (payment) {
      const updatedPayment = { ...payment, status };
      this.payments.set(id, updatedPayment);
      return updatedPayment;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
