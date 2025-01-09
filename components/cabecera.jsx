import Image from "next/image";
import WebLinks from "./WebLinks";

export default function Cabecera() {

  return(
    <header className="flex flex-col p-2 xl:px-40 lg:px-28 bg-stone-800 justify-center">
      <div className="flex flex-row py-2 px-1 w-full items-center flex-wrap">

        <Image alt='logo' src={'/logo.svg'} width={60} height={60} className="p-1 border-2 rounded-sm border-sky-500 max-[430px]:hidden hover:scale-125 duration-500"/>

        <p className="grow text-center align-middle md:text-3xl text-2xl">ChemaoWeb</p>

        <div className="flex-col text-xs justify-between hidden md:flex">
          <div className="flex flex-row justify-end text-xs gap-4">
            <WebLinks social sm/>
          </div>

          <div className="flex flex-row text-xs mt-5 gap-4">
            <WebLinks/>
          </div>
        </div>

      </div>

      <div className="flex flex-row text-xs justify-between w-full md:hidden">

        <div className="flex flex-row text-xs max-[430px]:justify-between w-full gap-2">
          <WebLinks/>
        </div>

        <div className="flex flex-row justify-end text-xs max-[430px]:hidden gap-2">
          <WebLinks social sm/>
        </div>

      </div>
    </header>
  )
}