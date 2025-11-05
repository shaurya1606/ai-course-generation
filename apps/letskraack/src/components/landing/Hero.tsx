"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Menu, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const navItems = [
    { label: "Demo", href: "#demo" },
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#workflow" },
    { label: "Tools", href: "#tools" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
];

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#050505] text-white">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.6)_45%,transparent_80%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-[#080808] via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-[#020202] via-transparent to-transparent" />
            <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

            <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
                <Link href="#" className="flex items-center gap-3 text-base font-semibold text-white">
                    <Logo />
                </Link>

                <nav className="hidden items-center gap-8 text-sm text-neutral-300 md:flex">
                    {navItems.map((item) => (
                        <Link key={item.label} href={item.href} className="transition-colors hover:text-white">
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <Button asChild variant="ghost" className="text-sm text-neutral-300 hover:text-white">
                        <Link href="/auth/sign-in">Sign In</Link>
                    </Button>
                    <Button asChild size="sm" className="bg-blue-500 text-white hover:bg-blue-500/80">
                        <Link href="/auth/sign-up">Get Started</Link>
                    </Button>
                </div>

                <div className="md:hidden">
                    <Button variant="ghost" size="icon" className="text-neutral-300">
                        <span className="sr-only">Open navigation</span>
                        <Menu className="size-5" aria-hidden="true" />
                    </Button>
                </div>
            </header>

            <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-20 pt-16 text-center md:pb-28 md:pt-24">
                <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0d0d0d]/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-200"
                >
                    AI interview mastery
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl font-semibold leading-tight text-white md:text-6xl"
                >
                    Crack every interview with precision guidance from your AI co-pilot
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="mt-6 max-w-2xl text-base text-neutral-300 md:text-lg"
                >
                    Lets Kraack blends adaptive mock interviews, realtime coaching insights, and resume intelligence so you stay confident, concise, and compelling for every opportunity.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-8 flex flex-wrap items-center justify-center gap-3"
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
                        <Link href="#tools">Watch product tour</Link>
                    </Button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.65 }}
                className="relative z-10 mx-auto mb-20 w-full max-w-5xl px-6"
            >
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#080808] shadow-[0_20px_160px_rgba(0,0,0,0.65)]">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="flex flex-col items-center justify-center gap-4 px-6 pb-12 pt-12 md:px-16 md:pb-16 md:pt-16">
                        <div id="demo" className="flex items-center gap-2 rounded-full border border-white/10 bg-[#111]/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-neutral-200">
                            Demo Video
                        </div>
                        <p className="max-w-3xl text-sm text-neutral-300 md:text-base">
                            See how Lets Kraack simulates real interview rooms, delivers tailored AI feedback, and surfaces closing insights in one streamlined workspace.
                        </p>
                        <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0b0b0b] via-[#020202] to-blue-500/15">
                            <div className="flex h-full items-center justify-center">
                                <button className="flex size-16 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20">
                                    <Play className="size-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
