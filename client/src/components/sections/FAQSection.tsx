import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from '@/lib/types';

const faqs: FAQ[] = [
  {
    question: "What makes StartupPulse different from other accelerators?",
    answer: "StartupPulse offers a unique tiered approach that allows entrepreneurs to engage at their comfort level. Whether you're looking for a quick assessment, targeted consultation, or comprehensive mentorship, we have options tailored to your needs. Our accelerator also boasts a 90% success rate in helping startups secure funding."
  },
  {
    question: "How is the self-evaluation conducted?",
    answer: "Our self-evaluation is a comprehensive questionnaire that covers all aspects of your startup including business model, market opportunity, competitive landscape, team composition, and financial projections. After submission, our experts analyze your responses and provide a detailed report with actionable recommendations within 3 business days."
  },
  {
    question: "Who will be my mentor during the 6-month program?",
    answer: "We match you with mentors based on your industry, stage, and specific needs. Our mentor network includes successful entrepreneurs, industry experts, VCs, and corporate executives. You'll have a primary mentor for regular sessions, plus access to specialists for specific areas like marketing, technology, or finance."
  },
  {
    question: "What happens after I complete the 6-month program?",
    answer: "After completing the program, you'll join our alumni network, giving you continued access to our resources and community. Many graduates maintain relationships with their mentors and fellow cohort members. We also host exclusive events for alumni and provide ongoing support for fundraising efforts."
  },
  {
    question: "How do the consultancy sessions work?",
    answer: "Consultancy sessions are 1-hour video calls with our expert consultants. You can book sessions based on your specific needs (marketing, finance, technology, etc.). After booking and payment, you'll receive a calendar invite with the video conference link. We recommend preparing specific questions beforehand to maximize the value of your session."
  },
  {
    question: "What kind of startups do you work with?",
    answer: "We work with startups across various industries including technology, healthcare, education, finance, and e-commerce. We accept founders at all stages from idea to scaling, though our comprehensive program is most beneficial for early-stage startups with at least a minimum viable product or prototype."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heading text-3xl md:text-4xl font-bold text-dark mb-4">Frequently Asked Questions</h2>
          <p className="max-w-3xl mx-auto text-gray-600">Find answers to common questions about our services</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-lg font-medium text-dark hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
