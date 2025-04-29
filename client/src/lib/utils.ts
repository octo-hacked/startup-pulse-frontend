import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number, currency = "INR"): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(amount);
};

export const serviceTypeNames = {
  'self-evaluation': 'Self Evaluation',
  'consultancy': 'Expert Consultancy',
  'mentorship': 'Mentorship Program'
};

export const serviceTypeAmounts = {
  'self-evaluation': 250,
  'consultancy': 1000,
  'mentorship': 10000
};

export const serviceTypeDescriptions = {
  'self-evaluation': 'Comprehensive startup readiness assessment',
  'consultancy': 'One hour consultation with an industry expert',
  'mentorship': '6-month comprehensive mentorship program'
};

export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}
