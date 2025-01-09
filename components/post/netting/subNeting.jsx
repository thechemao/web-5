'use client'

export function SubNeting({handlers, state}){
  const [ipData] = state
  return(
  <>
    <label htmlFor="ip-0">ID de Red:</label>
    <div className="flex flex-row gap-1">
      <input aria-label="Byte-0" onChange={(e) => handlers.Ip(e)} type="number" id="ip-0" className="max-w-[40px] text-black text-center rounded-md" max={255} defaultValue={ipData.ip[0]}/>.
      <input aria-label="Byte-1" onChange={(e) => handlers.Ip(e)} type="number" id="ip-1" className="max-w-[40px] text-black text-center rounded-md" max={255} defaultValue={ipData.ip[1]}/>.
      <input aria-label="Byte-2" onChange={(e) => handlers.Ip(e)} type="number" id="ip-2" className="max-w-[40px] text-black text-center rounded-md" max={255} defaultValue={ipData.ip[2]}/>.
      <input aria-label="Byte-3" onChange={(e) => handlers.Ip(e)} type="number" id="ip-3" className="max-w-[40px] text-black text-center rounded-md" max={255} defaultValue={ipData.ip[3]}/>
    </div>
    <br/>
    <label htmlFor="mask">Mascara:</label>
    <div className="flex flex-row gap-1">
      /<input onChange={(e) => handlers.Mask(e)} id="mask" type="number" className="max-w-[40px] text-black text-center rounded-md" max={30} defaultValue={ipData.mask}/>
    </div>
    <hr className=" my-2"/>
    <div className="flex flex-row">
      <label htmlFor="networks">cantidad de redes:</label>
      <input onChange={(e) => {handlers.Nets(e)}} type="number" id="networks" className="max-w-[40px] text-black text-center ml-5 rounded-md" defaultValue={0}/>
    </div>
  </>
  )
}