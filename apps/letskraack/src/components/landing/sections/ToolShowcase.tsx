"use client";

import { motion } from "motion/react";
import { BarChart3, MicVocal, NotebookPen } from "lucide-react";
import { cn } from "@/lib/utils";

const tiles = [
  {
    icon: NotebookPen,
    title: "AI feedback summaries",
    description:
      "Capture every behavioural highlight, gap, and action item in an instant executive-ready digest after each mock interview.",
    badge: "Summaries",
    layout: "col-span-1 row-span-2",
  },
  {
    icon: BarChart3,
    title: "Performance analytics",
    description:
      "Track trends across delivery, clarity, and confidence with auto-generated charts that pinpoint where to double down.",
    badge: "Analytics",
    layout: "col-span-1",
  },
  {
    icon: MicVocal,
    title: "Voice transcription & tone",
    description:
      "Bring in live transcripts with sentiment scoring, filler detection, and emphasis cues to perfect your spoken delivery.",
    badge: "Voice",
    layout: "col-span-1",
  },
];

export function ToolShowcaseSection() {
  return (
    <section id="tools" className="relative overflow-hidden bg-[#040404] py-24 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(4,4,4,0.95)_0%,rgba(5,5,5,0.95)_45%,rgba(0,0,0,1)_90%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-transparent to-transparent" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0d0d] px-4 py-2 text-xs uppercase tracking-[0.25em] text-neutral-200"
          >
            Advanced tools
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-6 text-3xl font-semibold leading-tight md:text-5xl"
          >
            A textured workspace built for serious prep
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-6 text-base text-neutral-300 md:text-lg"
          >
            Mix and match advanced coaching utilities in a bento-style layout tailored to keep a pulse on every interview dimension.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {tiles.map((tile, index) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.45, delay: 0.12 * index }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]/85 p-6 shadow-[0_15px_90px_rgba(0,0,0,0.45)]",
                tile.layout,
                index === 0 ? "md:row-span-2" : ""
              )}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.25)_0%,rgba(59,130,246,0.1)_40%,transparent_75%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col justify-between gap-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-blue-200">
                  <span className="rounded-full border border-blue-500/40 bg-blue-500/15 px-3 py-1">{tile.badge}</span>
                </div>
                <div>
                  <tile.icon className="mb-4 size-10 text-blue-300" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-white md:text-xl">{tile.title}</h3>
                  <p className="mt-3 text-sm text-neutral-300 md:text-[15px]">{tile.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
