"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function FinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-[#020202] py-24 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(10,10,10,0.9)_0%,rgba(6,6,6,0.95)_50%,rgba(0,0,0,1)_95%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-500/30 via-transparent to-transparent" />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0d0d] px-4 py-2 text-xs uppercase tracking-[0.25em] text-neutral-200"
        >
          Ready to move faster
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-3xl font-semibold leading-tight md:text-5xl"
        >
          Ship interview-ready stories with an AI co-pilot that never sleeps
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="max-w-2xl text-base text-neutral-300 md:text-lg"
        >
          Join thousands of candidates using Lets Kraack to simulate real panels, blueprint their course work, and walk into every interview with conviction.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="bg-blue-500 text-white shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:bg-blue-500/90"
          >
            <Link href="/auth/sign-up">Start free session</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/20 bg-transparent text-white hover:bg-white/10"
          >
            <Link href="#">Talk to sales</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
