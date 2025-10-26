import React from 'react'
import Image from 'next/image'

const Logo = () => {
  return (
    <div className="flex items-center">
      <Image src="/logo.svg" alt="Logo" width={35} height={35} />
      <div className="ml-2 font-bold text-lg">LetsKraack</div>
    </div>
  )
}

export default Logo;