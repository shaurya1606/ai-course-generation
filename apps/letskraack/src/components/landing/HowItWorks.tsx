"use client";

import { Fragment } from "react";
import { motion } from "motion/react";

type Step = {
  title: string;
  description: string;
};

type Flow = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  steps: Step[];
};

const flows: Flow[] = [
  {
    id: "interview",
    eyebrow: "Interview prep",
    title: "Three fast steps from nervous to interview-ready",
    description:
      "Stay in one streamlined loop where every session keeps momentum and every insight lands exactly when you need it.",
    steps: [
      {
        title: "Choose your focus",
        description:
          "Pick the role or interview round you need to win. Lets Kraack calibrates rubrics, competencies, and pacing around that target.",
      },
      {
        title: "Practice with AI",
        description:
          "Step into camera-on mock interviews driven by AI panelists that probe deeper, adapt to your answers, and mirror real recruiter tone.",
      },
      {
        title: "Receive insights",
        description:
          "Get instant scorecards, behavioural highlights, and an updated action plan so the next session compounds your progress.",
      },
    ],
  },
  {
    id: "resume",
    eyebrow: "Resume analyzer",
    title: "Transform your resume into a recruiter magnet",
    description:
      "Your resume gets benchmarked against live job descriptions so you can prioritize the updates that move the needle first.",
    steps: [
      {
        title: "Upload resume & role",
        description:
          "Drop in your latest resume plus the JD. Our analyzer maps the competency gaps and ATS keywords instantly.",
      },
      {
        title: "Review AI critiques",
        description:
          "See quantified impact scores, flagged phrasing, and missing metrics with side-by-side suggestions.",
      },
      {
        title: "Apply prioritized fixes",
        description:
          "Follow guided rewrites and export an ATS-optimized version ready to submit or share with your mentor.",
      },
    ],
  },
  {
    id: "course",
    eyebrow: "AI course generation",
    title: "Spin up a tailored prep plan in minutes",
    description:
      "AI turns your goals into a living curriculum so you always know the next drill, resource, or checkpoint to tackle.",
    steps: [
      {
        title: "Set learning goals",
        description:
          "Share target companies, interview types, and timeline. Lets Kraack matches the best rubrics and frameworks.",
      },
      {
        title: "Generate adaptive modules",
        description:
          "AI builds short lessons, drills, and mock prompts—automatically sequenced by difficulty and coverage gaps.",
      },
      {
        title: "Track and iterate",
        description:
          "Mark sessions complete to trigger fresh follow-ups and keep momentum without juggling spreadsheets.",
      },
    ],
  },
];

export function HowItWorksSection() {
  return (
    <section id="workflow" className="relative overflow-hidden bg-[#050505] py-24 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.9)_0%,rgba(10,10,10,0.95)_45%,rgba(0,0,0,1)_90%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-transparent to-transparent" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6">
        {flows.map((flow, flowIndex) => (
          <div key={flow.id} className="flex flex-col gap-10">
            <div className="mx-auto max-w-3xl text-center">
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.4, delay: flowIndex * 0.05 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0d0d] px-4 py-2 text-xs uppercase tracking-[0.25em] text-neutral-200"
              >
                {flow.eyebrow}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.45, delay: 0.1 + flowIndex * 0.05 }}
                className="mt-6 text-3xl font-semibold leading-tight md:text-4xl"
              >
                {flow.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.45, delay: 0.2 + flowIndex * 0.05 }}
                className="mt-6 text-base text-neutral-300 md:text-lg"
              >
                {flow.description}
              </motion.p>
            </div>

            <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-0">
              {flow.steps.map((step, index) => (
                <Fragment key={step.title}>
                  <motion.article
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.45, delay: 0.12 * index }}
                    className="relative flex flex-1 flex-col items-center gap-4 rounded-3xl border border-white/10 bg-[#090909]/85 p-6 text-center shadow-[0_14px_90px_rgba(0,0,0,0.4)] md:items-start md:text-left"
                  >
                    <span className="flex size-11 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/15 text-base font-semibold text-blue-200 md:size-12 md:text-lg">
                      {index + 1}
                    </span>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white md:text-xl">{step.title}</h3>
                      <p className="text-sm text-neutral-300 md:text-[15px]">{step.description}</p>
                    </div>
                  </motion.article>

                  {index < flow.steps.length - 1 ? (
                    <>
                      <div className="hidden items-center md:flex md:w-16 lg:w-24">
                        <span className="h-px w-full bg-gradient-to-r from-blue-500/35 via-blue-500/15 to-transparent" />
                      </div>
                      <div className="flex items-center justify-center md:hidden">
                        <span className="h-10 w-px bg-gradient-to-b from-blue-500/40 via-blue-500/15 to-transparent" />
                      </div>
                    </>
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
