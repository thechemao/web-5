import { cards } from "@/components/about/cards_data"
import { Roboto } from "next/font/google"
import { useState } from 'react';
import Image from "next/image"

const robotoFont = Roboto({ subsets: ['latin'], weight: ['400'] })

export default function Card({page}){
  const data = cards[page]
  return (
      <div className={robotoFont.className + " bg-gray-950 border-sky-500 border-2 md:rounded-t-lg shadow-inner shadow-sky-300 grow flex flex-col px-5 pb-5 pt-2"}>
        <h1 className="text-4xl text-sky-500 font-bold py-2 border-b-2">{data.title}</h1>
        <div className="h-full mt-4 flex flex-row flex-wrap justify-center items-center gap-4">
        {data.items.map((item, id) =>{
          const [isHovered, setIsHovered] = useState(false);

          return(
            <div 
              key={"card-"+id}
              className="flex flex-row items-center justify-start gap-2 w-full lg:w-1/5 md:w-1/3 sm:w-1/2 h-min bg-white/10 backdrop-blur-md text-white border border-sky-500 rounded-xl p-4 shadow-md shadow-sky-800 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-sky-600 hover:border-white"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {item.icon? <Image src={item.icon} width={64} height={64}  alt="icon" className="h-16l"/> : null}
              <p>{item.name}</p>
              { isHovered && item.descripcion && (
                <div className="absolute top-[-50px] translate-x-[50%] bg-white text-black rounded-md p-2">
                  <div className="absolute bottom-[1px] left-1/2 translate-x-[-50%] translate-y-full w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white"></div>
                  <p>{item.descripcion}</p>
                </div>
              )}
            </div>
          )
        })
        }
        </div>
      </div>
  )
}