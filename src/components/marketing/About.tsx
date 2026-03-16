"use client"

import { aboutData } from "@/data/data"
import { GlobalStyles } from "@/styles/style"
import Image from "next/image"

const About = () => {
  return (
    <main className={`${GlobalStyles.mainContainer}`}>
      <div className={`${GlobalStyles.innerContainer}`}>
        <div className='text-center text-4xl leading-13 tracking-tight font-medium'>
          <h1>Modern care at your homes will be</h1>
          <div className='flex items-center justify-center gap-x-2'>
            <h1>essential, Your health</h1>
            <div className='w-24 h-10 border border-accent/15 rounded-full bg-neutral-400 relative overflow-hidden'>
              <Image src={"https://images.unsplash.com/photo-1687804446688-d455c357385d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z3JlZW4lMjBhYnN0cmFjdHxlbnwwfHwwfHx8Mg%3D%3D"} alt="" width={100} height={100} className='w-full h-full object-cover object-left rounded-xl absolute inset-0 '/>
            </div>
            <h1>reports <span className="text-accent">arrive</span></h1>
          </div>
          <h1 className="text-accent">faster than vitals tracked in real-time</h1>
        </div>
        <div className='mt-20 grid grid-cols-3 gap-12 max-w-4xl mx-auto '>
          {aboutData.map((item, i) => {
            return (
              <div key={i} className="flex items-center gap-x-6">
                <div className="w-14 h-14 rounded-xl bg-neutral-400 overflow-hidden">
                  <Image src={item.image} className="w-full h-full object-cover" width={100} height={100} alt=""/>
                </div>
                <div>
                  <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
                  <p className="text-accent font-medium">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default About