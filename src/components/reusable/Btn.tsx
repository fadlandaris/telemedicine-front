"use client"

import React from 'react'
import { PhoneCallIcon } from '@phosphor-icons/react'

const Btn = ({value, variant} : {value: string, variant: string}) => {
  return (
    <button className={`group flex items-center justify-center gap-x-1 px-4 pr-6 py-2 rounded-full bg-primary hover:gap-x-3 text-white font-medium hover:bg-primary/70 transition-all duration-200 cursor-pointer ${variant === "primary" ? "bg-primary" : "bg-secondary"}`}>
      <PhoneCallIcon size={16} weight='bold' className='group-hover:rotate-32 transition-all duration-200'/>
      {value}
    </button>
  )
}

export default Btn