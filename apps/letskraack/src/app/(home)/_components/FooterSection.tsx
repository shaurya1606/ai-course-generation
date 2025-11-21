'use client'
import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const FooterSection = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'AI Courses', href: '/workspace' },
      { name: 'Coding Interviews', href: '/coding' },
      { name: 'Resume Analysis', href: '/resume-analyser' },
      { name: 'AI Interview Coach', href: '/ai-interview' }
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Partners', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: 'mailto:support@letskrack.com' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Status', href: '#' }
    ],
    social: [
      { name: 'GitHub', icon: Github, href: '#' },
      { name: 'Twitter', icon: Twitter, href: '#' },
      { name: 'LinkedIn', icon: Linkedin, href: '#' },
      { name: 'Email', icon: Mail, href: 'mailto:hello@letskrack.com' }
    ]
  }

  return (
    <footer className='bg-neutral-900 border-t border-neutral-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
          {/* Brand */}
          <div className='lg:col-span-2'>
            <Link href='/' className='flex items-center space-x-2 mb-4'>
              <svg fill="none" height="32" viewBox="0 0 42 48" width="32" xmlns="http://www.w3.org/2000/svg" className='text-white'>
                <path clipRule="evenodd" d="m22.1017 20.8596 9.8995-9.8994-2.1213-2.12137-7.3389 7.33887v-13.1777h-3v13.1777l-7.3388-7.33887-2.1213 2.12137 9.8995 9.8994 1.0606 1.0607zm2.1207 2.1214 9.8995-9.8995 2.1213 2.1213-7.3388 7.3388h13.0956v3h-13.0956l7.3388 7.3389-2.1213 2.1213-9.8995-9.8995-1.0607-1.0607zm-16.26224 12.0208 9.89944-9.8995 1.0607-1.0607-1.0607-1.0606-9.89944-9.8995-2.12133 2.1213 7.33887 7.3388h-13.17574688v3h13.17574688l-7.33887 7.3389zm12.02024-7.7782-9.8995 9.8995 2.1213 2.1213 7.3388-7.3388v13.0944h3v-13.0944l7.3389 7.3388 2.1213-2.1213-9.8995-9.8995-1.0607-1.0607z" fill="currentColor" fillRule="evenodd"/>
              </svg>
              <span className='text-xl font-bold text-white'>LetsKrack</span>
            </Link>
            <p className='text-neutral-400 mb-6 max-w-md'>
              Empowering learners worldwide with AI-driven education. Transform your career with personalized courses,
              coding challenges, and professional development tools.
            </p>
            <div className='flex space-x-4'>
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className='text-neutral-400 hover:text-white transition-colors'
                  aria-label={social.name}
                >
                  <social.icon className='h-5 w-5' />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Product</h3>
            <ul className='space-y-2'>
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-neutral-400 hover:text-white transition-colors text-sm'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Company</h3>
            <ul className='space-y-2'>
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-neutral-400 hover:text-white transition-colors text-sm'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Support</h3>
            <ul className='space-y-2'>
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className='text-neutral-400 hover:text-white transition-colors text-sm'
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='border-t border-neutral-800 mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-neutral-400 text-sm'>
              © {currentYear} LetsKrack. All rights reserved.
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <Link href='#' className='text-neutral-400 hover:text-white transition-colors text-sm'>
                Privacy
              </Link>
              <Link href='#' className='text-neutral-400 hover:text-white transition-colors text-sm'>
                Terms
              </Link>
              <Link href='#' className='text-neutral-400 hover:text-white transition-colors text-sm'>
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
