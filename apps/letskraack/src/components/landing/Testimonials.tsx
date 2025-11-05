"use client";

import { motion } from "motion/react";

const testimonials = [
  {
    name: "Priya S.",
    role: "Senior Product Manager · Atlassian",
    quote:
      "The AI mock loops feel like the panel I face in real interviews. The feedback digest helped me tighten my stories in half the time.",
  },
  {
    name: "Jordan L.",
    role: "Data Scientist · Stripe",
    quote:
      "Resume analyzer + adaptive courses meant I stopped second guessing prep. Interview invites doubled within a month.",
  },
  {
    name: "Mia R.",
    role: "Software Engineer · Shopify",
    quote:
      "I can run a mock at midnight, get actionable coaching summaries, and walk away with a clear tasklist for the next session.",
  },
];

const marqueeTestimonials = [...testimonials, ...testimonials];

const marqueeVariants = {
  animate: {
    x: ["0%", "-50%"],
    transition: {
      x: {
        duration: 36,
        ease: "linear" as any,
        repeat: Infinity,
      },
    },
  },
};

const logos = [
  "Stripe",
  "Atlassian",
  "Shopify",
  "Lyft",
  "Canva",
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#040404] py-24 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(4,4,4,0.95)_0%,rgba(5,5,5,0.95)_45%,rgba(0,0,0,1)_90%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-transparent to-transparent" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0d0d] px-4 py-2 text-xs uppercase tracking-[0.25em] text-neutral-200"
          >
            Trusted by ambitious candidates
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-6 text-3xl font-semibold leading-tight md:text-5xl"
          >
            Stories from candidates who cracked their next role
          </motion.h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#040404] via-[#040404]/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#040404] via-[#040404]/80 to-transparent" />

          <motion.div
            variants={marqueeVariants}
            animate="animate"
            className="flex w-max gap-6"
          >
            {marqueeTestimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                className="group relative min-w-[280px] max-w-sm overflow-hidden rounded-[28px] border border-white/10 bg-[#090909]/80 shadow-[0_18px_110px_rgba(0,0,0,0.45)] md:min-w-[320px]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25)_0%,rgba(59,130,246,0)_65%)] opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
                <div className="relative flex h-full flex-col gap-6 rounded-[26px] border border-white/10 bg-[#0b0b0b]/90 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-blue-500/45 via-blue-500/25 to-blue-500/10 text-lg font-semibold text-white">
                        {testimonial.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                        <p className="text-xs uppercase tracking-[0.22em] text-neutral-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <span className="rounded-full border border-blue-500/40 bg-blue-500/15 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-blue-200">
                      Success
                    </span>
                  </div>

                  <div className="relative flex-1">
                    <div className="absolute -left-2 top-0 text-4xl text-blue-500/40">“</div>
                    <p className="relative mt-3 text-sm leading-relaxed text-neutral-300 md:text-[15px]">
                      {testimonial.quote}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.26em] text-neutral-500">
                    <span>Verified</span>
                    <span>Lets Kraack</span>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 text-sm uppercase tracking-[0.4em] text-neutral-500 md:gap-12"
        >
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-xs font-semibold tracking-[0.45em] text-neutral-500 transition hover:text-neutral-300 md:text-sm"
            >
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
