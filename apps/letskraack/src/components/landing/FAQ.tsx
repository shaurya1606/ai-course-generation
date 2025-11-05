"use client";

import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How personalized are the mock interviews?",
    answer:
      "Every mock calibrates to your chosen role, seniority, and recent answers. The AI interviewer adjusts follow-ups, tone, and difficulty in real time so no two sessions feel the same.",
  },
  {
    question: "Can I export summaries and action items?",
    answer:
      "Yes. Download executive-ready feedback digests, share action lists with mentors, or push highlights to your Notion or Slack workspace directly.",
  },
  {
    question: "Does the resume analyzer support multiple roles?",
    answer:
      "Upload as many job descriptions as you like. We score each one against your resume, surface gaps, and help you tailor versions for each target.",
  },
  {
    question: "Do I need to schedule sessions in advance?",
    answer:
      "No scheduling needed. Launch an AI mock whenever you have time; the system tracks cadence and nudges you toward consistency.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="relative overflow-hidden bg-[#030303] py-24 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(4,4,4,0.95)_0%,rgba(6,6,6,0.95)_45%,rgba(0,0,0,1)_90%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-transparent to-transparent" />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0d0d] px-4 py-2 text-xs uppercase tracking-[0.25em] text-neutral-200"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-6 text-3xl font-semibold leading-tight md:text-5xl"
          >
            Answers to the questions candidates ask most
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="rounded-3xl border border-white/10 bg-[#0a0a0a]/85 p-4 shadow-[0_18px_90px_rgba(0,0,0,0.45)] md:p-6"
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 px-4"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-white hover:text-white md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm text-neutral-300 md:text-[15px]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
