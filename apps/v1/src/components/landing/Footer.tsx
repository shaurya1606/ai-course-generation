"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import Logo from "@/components/Logo";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
];

const resourceLinks = [
  { label: "Blog", href: "#" },
  { label: "Templates", href: "#" },
  { label: "Help center", href: "#" },
];

const legalLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Security", href: "#" },
];

const socialLinks = [
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "GitHub", href: "https://github.com", icon: Github },
];

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-[#010101] py-16 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(6,6,6,0.65)_0%,rgba(3,3,3,0.95)_45%,rgba(0,0,0,1)_90%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-10 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-sm flex-col gap-6">
            <Link href="#" className="flex items-center gap-3 text-base font-semibold text-white">
              <Logo />
            </Link>
            <p className="text-sm text-neutral-400">
              Lets Kraack helps ambitious candidates run AI-powered mock interviews, generate tailored prep plans, and deliver stories that land offers.
            </p>
            <div className="flex items-center gap-3 text-neutral-400">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-200 transition hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="size-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 text-sm text-neutral-400 md:grid-cols-3">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Product</p>
              <ul className="space-y-2">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Resources</p>
              <ul className="space-y-2">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Legal</p>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Lets Kraack. All rights reserved.</p>
          <p className="uppercase tracking-[0.35em]">Crack your next interview</p>
        </div>
      </div>
    </footer>
  );
}
