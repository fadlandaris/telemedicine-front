"use client"

import { GlobalStyles } from "@/styles/style"
import Title from "../reusable/Title"
import { struggeData } from "@/data/data"
import Image from "next/image"
import Marquee from "react-fast-marquee"

const Struggle = () => {
  return (
    <main className={`${GlobalStyles.mainContainer}`}>
      <div className={`${GlobalStyles.innerContainer}`}>
        <Title
          variant={true}
          subValue={"Common"}
          value="struggles"
          title={"When hospitals feel weird"}
          desc={
            "Long waiting times, limited access to specialists, and unclear reports often leave patients."
          }
        />
        <div className="mt-12 grid grid-cols-1 max-w-6xl mx-auto gap-6 cursor-pointer">
          <Marquee pauseOnHover speed={30} direction="left" gradient gradientColor="#f7f5f2" gradientWidth={100} loop={0} autoFill>
            {struggeData.map((item, i) => {
              return (
                <div key={i} className="mx-3 hover:bg-primary hover:text-white transition-all duration-400 border border-accent/15 py-2 px-3 bg-[#f7f7f7] text-accent rounded-full flex items-center justify-center gap-x-2">
                  <Image alt="" width={15} height={15} src={item.image}/>
                  <p className="font-medium text-sm">{item.title}</p>
                </div>
              )
            })}
          </Marquee>
          <Marquee pauseOnHover speed={32} direction="right" gradient gradientColor="#f7f5f2" gradientWidth={100} loop={0} autoFill>
            {struggeData.map((item, i) => {
              return (
                <div key={i} className="mx-3 hover:bg-primary hover:text-white transition-all duration-400 border border-accent/15 py-2 px-3 bg-[#f7f7f7] text-accent rounded-full flex items-center justify-center gap-x-2">
                  <Image alt="" width={15} height={15} src={item.image}/>
                  <p className="font-medium text-sm">{item.title}</p>
                </div>
              )
            })}
          </Marquee>
          <Marquee pauseOnHover speed={27} direction="left" gradient gradientColor="#f7f5f2" gradientWidth={100} loop={0} autoFill>
            {struggeData.map((item, i) => {
              return (
                <div key={i} className="mx-3 hover:bg-primary hover:text-white transition-all duration-400 border border-accent/15 py-2 px-3 bg-[#f7f7f7] text-accent rounded-full flex items-center justify-center gap-x-2">
                  <Image alt="" width={15} height={15} src={item.image}/>
                  <p className="font-medium text-sm">{item.title}</p>
                </div>
              )
            })}
          </Marquee>
          <Marquee pauseOnHover speed={33} direction="right" gradient gradientColor="#f7f5f2" gradientWidth={100} loop={0} autoFill>
            {struggeData.map((item, i) => {
              return (
                <div key={i} className="mx-3 hover:bg-primary hover:text-white transition-all duration-400 border border-accent/15 py-2 px-3 bg-[#f7f7f7] text-accent rounded-full flex items-center justify-center gap-x-2">
                  <Image alt="" width={15} height={15} src={item.image}/>
                  <p className="font-medium text-sm">{item.title}</p>
                </div>
              )
            })}
          </Marquee>
        </div>
      </div>
    </main>
  )
}

export default Struggle