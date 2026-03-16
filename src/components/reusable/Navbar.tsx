"use client"

import { navLinks } from '@/data/data'
import { FirstAidIcon, SignInIcon  } from '@phosphor-icons/react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 p-4 bg-background'>
      <div className='max-w-6xl mx-auto flex items-center justify-between '>
        <div className='flex items-center gap-x-1'>
          <div className='w-5 h-5 bg-primary rounded-full flex items-center justify-center'>
            <FirstAidIcon size={11} className='text-white' weight='fill'/>
          </div>
          <div className='flex items-start justify-start gap-x-1'>
            <h3 className='text-xl font-medium tracking-tight'>Telemedicine</h3>
            <p className='font-medium'>®</p>
          </div>
        </div>
        <div className='flex items-center justify-end gap-x-6'>
          <ul className='flex items-center gap-x-6 text-sm font-medium'>
            {navLinks.map((item, i) => {
              return (
                <li key={i}>
                  {item.title}
                </li>
              )
            })}
          </ul>
          <Link href={`/auth/login`} className='hover:gap-x-3 transition-all duration-200 cursor-pointer hover:opacity-70 px-4 py-2 bg-primary text-white font-medium rounded-full text-sm flex items-center gap-x-2'>
            Login
            <SignInIcon weight='bold' size={14} className=''/>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar