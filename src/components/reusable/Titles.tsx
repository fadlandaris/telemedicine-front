"use client"

import { titleDashboardData } from "@/data/data"

const Titles = ({title, value} : {value: string, title: string}) => {
  return (
    <div className=' flex items-center justify-between'>
      <div>
        <h3 className='text-lg font-medium tracking-tight'>{title}</h3>
        <p className='text-accent text-sm'>{value}</p>
      </div>
      <div className='flex items-center gap-x-2'>
        {titleDashboardData.map((item, i) => {
          return (
            <div key={i} className={`p-2 flex items-center gap-x-2 rounded-xl border border-accent/15 cursor-pointer ${i === titleDashboardData.length -1 ? "bg-red-500" : "bg-white"} `}>
              <item.icon className={`${i === titleDashboardData.length -1 ? "text-white" : "text-primary"}`} size={16} weight={`${i === 0 ? "fill" : "bold"}`}/>
              {i === 0 ? (
                <p className=" font-medium text-sm">
                  March 12, 2026
                </p>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Titles