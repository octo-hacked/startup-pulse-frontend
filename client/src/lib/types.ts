export type ServiceType = 'self-evaluation' | 'consultancy' | 'mentorship';

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  position: string;
  company: string;
  image: string;
  rating: number;
}

export interface Consultant {
  id: number;
  name: string;
  specialty: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Mentor {
  id: number;
  name: string;
  specialty: string;
  image: string;
}

export interface ProgramFeature {
  icon: string;
  title: string;
  description: string;
}

export interface StatsItem {
  value: string;
  label: string;
}

export interface SelfEvaluationFormData {
  founderName: string;
  founderEmail: string;
  startupName: string;
  industry: string;
  businessDescription: string;
  stage: string;
  funding: string;
  teamSize: string;
  challenges: string[];
}

export interface ConsultancyFormData {
  name: string;
  email: string;
  consultant: string;
  date: string;
  time: string;
  topics: string;
}

export interface MentorshipFormData {
  name: string;
  email: string;
  startupName: string;
  industry: string;
  stage: string;
  team: string;
  goals: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
