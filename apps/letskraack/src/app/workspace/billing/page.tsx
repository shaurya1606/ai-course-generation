import React from 'react'
import { PricingTable } from '@clerk/nextjs'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { Shield, Sparkles } from 'lucide-react'

const Billing = () => {
  return (
    <div>
      <div className='mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16 md:px-10'>
        <section className='rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-cyan-500/10 p-10 shadow-[0_40px_120px_-60px_rgba(14,165,233,0.45)]'>
          <div className='flex flex-col gap-6 text-center'>
            <span className='mx-auto inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-sm font-semibold text-blue-200'>
              <Sparkles className='h-4 w-4' />
              Manage your subscription
            </span>
            <h1 className='text-4xl font-bold tracking-tight md:text-5xl'>
              Billing & subscriptions, powered by Clerk
            </h1>
            <p className='mx-auto max-w-2xl text-lg text-neutral-300'>
              Pick the plan that fits your team and update payment details without leaving the dashboard. Everything is synced directly with Clerk Billing.
            </p>
            <div className='mx-auto flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-300'>
              <div className='flex items-center gap-2'>
                <Shield className='h-5 w-5 text-blue-300' />
                PCI & SOC 2 compliant payments
              </div>
              <div className='flex items-center gap-2'>
                <span className='inline-flex h-5 w-5 items-center justify-center rounded-full border border-blue-500/40 text-xs text-blue-200'>✓</span>
                Cancel or upgrade any time
              </div>
            </div>
          </div>
        </section>

        <SignedIn>
          <section className='space-y-8'>
            <div className='rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6'>
              <h2 className='mb-4 text-2xl font-semibold text-neutral-100'>Choose your plan</h2>
              <p className='mb-6 text-sm text-neutral-400'>
                Plans and pricing come directly from your Clerk Billing configuration. Updates in the Clerk Dashboard will reflect here instantly.
              </p>
              <PricingTable
                appearance={{
                  elements: {
                    root: 'rounded-2xl border border-neutral-800 bg-black/40',
                    planCard: 'rounded-2xl border border-neutral-800 bg-neutral-900/70 shadow-none hover:border-blue-500/40',
                    planName: 'text-neutral-100',
                    price: 'text-3xl font-bold text-neutral-50',
                  },
                }}
              />
            </div>
          </section>
        </SignedIn>

        <SignedOut>
          <section className='rounded-3xl border border-neutral-800 bg-neutral-900/60 p-10 text-center'>
            <h2 className='text-3xl font-semibold text-neutral-100'>Sign in to manage billing</h2>
            <p className='mt-3 text-sm text-neutral-400'>
              Your billing information is tied to your Clerk account. Sign in to view plans, update payment details, or download invoices.
            </p>
            <div className='mt-6'>
              <SignInButton mode='modal'>
                <button className='rounded-full bg-blue-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition hover:bg-blue-400'>
                  Sign in to continue
                </button>
              </SignInButton>
            </div>
          </section>
        </SignedOut>
      </div>
    </div>
  )
}

export default Billing