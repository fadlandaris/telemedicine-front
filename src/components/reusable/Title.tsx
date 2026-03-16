"use client"

import { FirstAidIcon } from "@phosphor-icons/react"

const Title = ({title, variant, value, subValue, desc} : {value: string, subValue:string, variant: boolean, title: string, desc: string}) => {
  return (
    <div className={` ${variant ? "text-center" : "text-left" }`}>
      <div className={`${variant ? "flex items-center justify-center gap-x-2" : "flex items-center justify-start gap-x-2"}`}>
        <div className='w-4 h-4 bg-primary rounded-full flex items-center justify-center'>
          <FirstAidIcon size={8} className='text-white' weight='fill'/>
        </div>
        <p className='flex items-center gap-x-1 font-medium text-accent'>{subValue}<span className='text-black'>{value}</span></p>
      </div>
      <h1 className="mt-4 text-[42px] font-semibold tracking-tight">{title}</h1>
      <p className={`mt-3 text-accent font-medium  ${variant? 'max-w-md mx-auto' : "max-w-md"}`}>
        {desc}
      </p>
    </div>
  )
}

export default Title