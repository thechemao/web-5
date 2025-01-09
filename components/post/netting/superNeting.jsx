'use client'

import { useEffect, useState } from "react"

export function SuperNeting({handlers, state}){
  const [networks, setNetworks] = state

  useEffect(()=>{
    const NumberOfNetworks = 2 ** networks.bits
    let NewNetworks = []
    for (let index = 0; index < NumberOfNetworks; index++) {
      if (networks.networks[index]){
        NewNetworks.push(networks.networks[index])
      } else{
        NewNetworks.push([0,0,0,0])
      }
    }
    setNetworks({...networks, networks: NewNetworks})
  },[networks.bits])



  return(
  <>
    <div className="max-h-[256px] overflow-y-scroll w-max p-1 border-white border-2">
      {
      networks.networks.map((ip, index) => (
        <div key={index} className=" my-2">
          <label htmlFor="0">ID de Red {index} :</label>
          <div className="flex flex-row gap-1">
            <input aria-label="Byte-0" onChange={(e) => handlers.Ips(e, index)} type="number" id="0" className="w-16 text-black text-center rounded-md" max={255} defaultValue={ip[0]}/>.
            <input aria-label="Byte-1" onChange={(e) => handlers.Ips(e, index)} type="number" id="1" className="w-16 text-black text-center rounded-md" max={255} defaultValue={ip[1]}/>.
            <input aria-label="Byte-2" onChange={(e) => handlers.Ips(e, index)} type="number" id="2" className="w-16 text-black text-center rounded-md" max={255} defaultValue={ip[2]}/>.
            <input aria-label="Byte-3" onChange={(e) => handlers.Ips(e, index)} type="number" id="3" className="w-16 text-black text-center rounded-md" max={255} defaultValue={ip[3]}/>
          </div>
        </div>
      ))
      }
    </div>

    <div className=" flex flex-row my-4 align-middle">
      <button onClick={(e) => {handlers.AddNetworks(e, 0)}} className=" border-2 border-white rounded-full w-5 h-5 flex flex-row justify-center items-center"><p>+</p></button>
      <hr className="my-2 border-2 flex-grow"/>
      <button onClick={(e) => {handlers.AddNetworks(e, 1)}} className=" border-2 border-white rounded-full w-5 h-5 flex flex-row justify-center items-center"><p>-</p></button>
    </div>

    <label htmlFor="mask">Mascara:</label>
    <div className="flex flex-row gap-1">
      /<input onChange={(e) => handlers.SuperMask(e)} id="mask" type="number" className="w-16 text-black text-center rounded-md" max={30} defaultValue={networks.mask}/>
    </div>
  </>
  )
}