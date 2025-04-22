import Image from "next/image";
import WebLinks from "./WebLinks";

export default function Pie() {
  return(
    <footer className="bg-stone-800 flex flex-col justify-center items-center text-xs p-3">
      <div className="flex flex-row justify-center text-xs max-sm:hidden gap-4">
        <WebLinks social/>
      </div>
      <div className="flex flex-row justify-evenly text-xs sm:hidden max-[430px]:visible w-full">
      <WebLinks social sm/>
      </div>
      <Image alt='logo' src={'/logo.svg'} width={40} height={40} className="p-1 mt-4 border-2 rounded-sm border-sky-500 hover:scale-125 duration-500"/>
    </footer>

  )
}