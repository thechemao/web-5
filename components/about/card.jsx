import { cards } from "@/components/about/cards_data"
import { Roboto } from "next/font/google"

const robotoFont = Roboto({ subsets: ['latin'], weight: ['400'] })

export default function Card({page}){
  const data = cards[page]
  return (
      <div className={robotoFont.className + " bg-gray-950 border-sky-500 border-2 md:rounded-t-lg shadow-inner shadow-sky-300 grow flex flex-col px-5 pb-5 pt-2"}>
        <h1 className="text-4xl text-sky-500 font-bold py-2 border-b-2">{data.title}</h1>
        <div className="h-full mt-4 flex flex-row flex-wrap justify-center items-center gap-4">
        {data.items? data.items.map((item, id) =>{
          return(
            <div 
              key={"card-"+id}
              className="w-full lg:w-1/5 md:w-1/3 sm:w-1/2 h-min bg-white/10 backdrop-blur-md text-white border border-sky-500 rounded-xl p-4 shadow-md shadow-sky-800 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-sky-400 hover:border-white"
            >
              {item.name}
            </div>
          )
        }):
        <p>{data.description}</p>
        
        }
        </div>
      </div>
  )
}