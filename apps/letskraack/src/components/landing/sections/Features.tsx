"use client";

import { motion } from "motion/react";
import { CheckCircle, GraduationCap, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const features = [
  {
    icon: Video,
    title: "AI Video Mock Calls",
    description:
      "Step into camera-on sessions where an AI interviewer reacts to your delivery, facial cues, and answers just like a live panel.",
    metricLabel: "Weekly mock cadence",
    metricValue: 72,
    metricCaption: "3 of 4 recommended sessions completed",
  },
  {
    icon: GraduationCap,
    title: "AI Course Generation",
    description:
      "Spin up tailored prep courses from any job description and resume pair, complete with drills, rubrics, and check-ins.",
    metricLabel: "Curriculum completion",
    metricValue: 58,
    metricCaption: "7 modules wrapped · next: System Design",
  },
  {
    icon: CheckCircle,
    title: "Resume & ATS Intelligence",
    description:
      "Surface the experiences that matter most for the role while ensuring your profile clears every automated screen.",
    metricLabel: "ATS match score",
    metricValue: 91,
    metricCaption: "Top keywords covered across 5 target postings",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden bg-[#080808] py-24 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0f0f0f] px-4 py-2 text-xs uppercase tracking-[0.25em] text-neutral-200"
          >
            Built for serious candidates
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-6 text-3xl font-semibold leading-tight md:text-5xl"
          >
            Everything you need to own every stage of the interview loop
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-6 text-base text-neutral-300 md:text-lg"
          >
            Lets Kraack keeps practice sharp, insights actionable, and accountability simple so you stay ready for the final round.
          </motion.p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.45, delay: 0.1 * index }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]/85 p-6 shadow-[0_15px_80px_rgba(0,0,0,0.35)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 transition duration-500 group-hover:from-blue-500/10 group-hover:via-blue-500/5 group-hover:to-blue-500/0" />
              <feature.icon className="relative mb-5 size-9 text-blue-300" aria-hidden="true" />
              <h3 className="relative text-lg font-semibold text-white md:text-xl">{feature.title}</h3>
              <p className="relative mt-3 text-sm text-neutral-300 md:text-[15px]">{feature.description}</p>

              {feature.metricLabel ? (
                <div className="relative mt-6 space-y-2">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-neutral-400">
                    <span>{feature.metricLabel}</span>
                    <span>{feature.metricValue}%</span>
                  </div>
                  <Progress value={feature.metricValue} className="h-2 bg-white/10" />
                  <p className="text-xs text-neutral-400">{feature.metricCaption}</p>
                </div>
              ) : null}
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-300"
        >
          <span>Powered by tailored AI, curated rubrics, and senior hiring panels.</span>
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 bg-transparent text-white hover:bg-white/10"
          >
            Explore full platform
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
