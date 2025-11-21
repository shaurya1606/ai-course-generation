'use client'
import React from 'react'
import { Star, Quote } from 'lucide-react'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      content: 'LetsKrack transformed my interview preparation. The AI-generated courses were exactly what I needed to land my dream job.',
      rating: 5,
      avatar: 'SC'
    },
    {
      name: 'Marcus Johnson',
      role: 'Full Stack Developer',
      content: 'The coding interview tool is incredible. It helped me practice consistently and improve my problem-solving skills significantly.',
      rating: 5,
      avatar: 'MJ'
    },
    {
      name: 'Priya Patel',
      role: 'Data Scientist',
      content: 'Resume analysis feature gave me actionable feedback that helped me stand out. Highly recommend for career advancement.',
      rating: 5,
      avatar: 'PP'
    },
    {
      name: 'David Kim',
      role: 'Product Manager',
      content: 'The discussion rooms are great for networking and learning from peers. The AI moderation keeps conversations productive.',
      rating: 5,
      avatar: 'DK'
    },
    {
      name: 'Emma Rodriguez',
      role: 'UX Designer',
      content: 'From resume tips to interview practice, LetsKrack has everything I needed to transition into tech. Amazing platform!',
      rating: 5,
      avatar: 'ER'
    },
    {
      name: 'Alex Thompson',
      role: 'DevOps Engineer',
      content: 'The personalized learning paths saved me months of trial and error. The AI really understands what you need to learn.',
      rating: 5,
      avatar: 'AT'
    }
  ]

  return (
    <section className='bg-neutral-800 py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            What Our Users Say
          </h2>
          <p className='text-xl text-neutral-400 max-w-3xl mx-auto'>
            Join thousands of successful learners who have transformed their careers with LetsKrack
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='bg-neutral-900/50 border border-neutral-700 rounded-xl p-6 hover:bg-neutral-900/70 transition-all duration-300'
            >
              <div className='flex items-center mb-4'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm mr-3'>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className='font-semibold text-white'>{testimonial.name}</h4>
                  <p className='text-sm text-neutral-400'>{testimonial.role}</p>
                </div>
              </div>

              <div className='flex mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className='h-4 w-4 text-yellow-400 fill-current' />
                ))}
              </div>

              <div className='relative'>
                <Quote className='h-6 w-6 text-blue-400/50 absolute -top-2 -left-2' />
                <p className='text-neutral-300 leading-relaxed pl-6'>{testimonial.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-16 text-center'>
          <div className='bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-8 max-w-4xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
              <div>
                <div className='text-3xl font-bold text-white mb-2'>10,000+</div>
                <div className='text-neutral-400'>Active Learners</div>
              </div>
              <div>
                <div className='text-3xl font-bold text-white mb-2'>95%</div>
                <div className='text-neutral-400'>Success Rate</div>
              </div>
              <div>
                <div className='text-3xl font-bold text-white mb-2'>500+</div>
                <div className='text-neutral-400'>Companies Hiring</div>
              </div>
            </div>
            <p className='text-neutral-300'>
              Join a community of successful professionals who trust LetsKrack for their career growth
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
