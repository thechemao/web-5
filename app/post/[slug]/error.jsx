'use client'
import Link from "next/link";

export default function Error({ error, reset }) {
  console.log(error)
  return (
    <main className="flex flex-col justify-center p-3 h-screen">
      <div className=" flex flex-row justify-center">
        <h2 className="tracking-tight font-mono text-lg md:text-4xl">La pagina no existe</h2>
        <Link href='/entradas' className="ml-2 md:ml-5 p-2 border-2 border-sky-500 bg-slate-800 hover:bg-red-300"><p>Volver</p></Link>
      </div>
    </main>

  )
}