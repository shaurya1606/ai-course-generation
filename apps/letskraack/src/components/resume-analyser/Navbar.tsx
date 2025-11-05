import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import Logo from '../Logo'

const Navbar = () => {
  return (
   <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <Logo />
      <Button variant='default' className="px-4 py-2">
        Upload Resume
      </Button>
    </nav>
  )
}

export default Navbar