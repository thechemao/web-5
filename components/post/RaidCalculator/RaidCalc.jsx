'use client'

import { RaidCalculator, toleranciaFallos } from "./calculadora";
import RenderSchema from "./svgSchema";
import {useEffect, useRef, useState } from "react";

const raidLevels =[
  {name: "nada", lvl: "", minDisks: 1, parity: () => {return 0}},
  {name: "raid 0", lvl: "0", minDisks: 2, parity: (Disks) => {return Disks - Disks}},
  {name: "raid 1", lvl: "1", minDisks: 2, parity: (Disks) => {return Disks-1}},
  {name: "raid 5", lvl: "5", minDisks: 3, parity: () => {return 1}},
  {name: "raid 6", lvl: "6", minDisks: 4, parity: () => {return 2}}
]

const capacidades=[
  {name: "1TB", val: 1},
  {name: "2TB", val: 2},
  {name: "3TB", val: 3},
  {name: "4TB", val: 4},
  {name: "8TB", val: 8},
  {name: "10TB", val: 10},
  {name: "12TB", val: 12},
  {name: "14TB", val: 14},
  {name: "16TB", val: 16},
  {name: "18TB", val: 18},
  {name: "20TB", val: 20},
]

export default function RaidCalc() {
  const [selectedRaidLevels, setSelectedRaidLevels] = useState([
    raidLevels[1],
    raidLevels[0]
  ])
  const [show, setShow] = useState(false)
  const [disksCapacity, setDisksCapacity] = useState(capacidades[0])
  const [numberDisks, setNumberDisks] = useState(selectedRaidLevels[0].minDisks)
  const [numberBlocks, setNumberBlocks] = useState(selectedRaidLevels[1].minDisks)
  const [totalDisks, setTotalDisks] = useState(numberDisks*numberBlocks)
  const [result, setResult] = useState()

  const handleLvlChange1 = (e) => {
    setSelectedRaidLevels([
      raidLevels[e.target.value],
      selectedRaidLevels[1]
    ])
    setNumberDisks(raidLevels[e.target.value].minDisks)
  }
  const handleLvlChange2 = (e) => {
    setSelectedRaidLevels([
      selectedRaidLevels[0],
      raidLevels[e.target.value]
    ])
    setNumberBlocks(raidLevels[e.target.value].minDisks)
  }
  const handleCapacityChange = (e) => {
    setDisksCapacity(capacidades[e.target.value])
  }
  const handleDisksChange = (e) => {
    setNumberDisks(Number(e.target.value))
  }
  const handleBlocksChange = (e) => {
    setNumberBlocks(Number(e.target.value))
  }

  useEffect(()=>{
    setResult(RaidCalculator({
      selectedRaidLevels: selectedRaidLevels,
      disks: numberDisks,
      blocks: numberBlocks
    }))
    if (selectedRaidLevels[1].lvl == "") {
      setTotalDisks(numberDisks)
    }else {
      setTotalDisks(numberDisks*numberBlocks)
    }

  },[selectedRaidLevels,disksCapacity, numberDisks, numberBlocks])

  return (
    <div className="p-0 justify-items-center">
      <div className="border-2 border-sky-500 rounded-xl p-4 bg-neutral-800 flex flex-col justify-items-center">

        <p>nivel raid: {selectedRaidLevels[0].lvl}{selectedRaidLevels[1].lvl}</p>

        <form className="grid grid-cols-2 justify-around gap-2">

          <div className="flex md:flex-row flex-col border gap-2 border-sky-500 p-2">
            <div className="md:flex-grow">
              <label htmlFor="raidSelect1" className="mt-4 mb-2">raid 1º nivel:</label> <br/>
              <select onChange={(e)=>{handleLvlChange1(e)}}  defaultValue={1} id="raidSelect1" className="p-2 w-full h-10 border rounded-lg border-sky-500 bg-neutral-900">
                {raidLevels.map((val,index)=>{
                  if (index !== 0) {
                    return(
                      <option value={index} key={index}>{val.name}</option>
                    )
                  }

                })}
              </select>
            </div>
            <div>
              <label htmlFor="numberDisks" className="mt-4 mb-2">discos {selectedRaidLevels.lvl2? "por bloque" : ""}:</label> <br/>
              <input type="number" min={selectedRaidLevels[0].minDisks} id="numberDisks" defaultValue={selectedRaidLevels[0].minDisks} onChange={(e)=> handleDisksChange(e)} className="p-2 rounded-xl bg-neutral-900 border border-sky-500 w-full  md:max-w-[64px] h-10"/>
            </div>
            <div>
              <label htmlFor="raidSelect1" className="mt-4 mb-2">capacidad:</label> <br/>
              <select onChange={(e)=>{handleCapacityChange(e)}}  defaultValue={0} id="raidSelect1" className="p-2 h-10 w-full border rounded-lg border-sky-500 bg-neutral-900">
                {capacidades.map((val,index)=>{
                    return(
                      <option value={index} key={index}>{val.name}</option>
                    )
                })}
              </select>
            </div>
          </div>

          <div className="flex md:flex-row flex-col border gap-4 border-sky-500 p-2">
            <div className=" md:flex-grow">
              <label htmlFor="raidSelect1" className="mt-4 mb-2">raid 2º nivel:</label> <br/>
              <select onChange={(e)=>{handleLvlChange2(e)}} defaultValue={0} id="raidSelect1" className="p-2 w-full h-10 border rounded-lg border-sky-500 bg-neutral-900">
                {raidLevels.map((val,index)=>{
                  return(
                    <option value={index} key={index}>{val.name}</option>
                  )
                })}
              </select>
            </div>
            <div>
              <label htmlFor="numberBlocks" className="mt-4 mb-2">bloques:</label> <br/>
              <input type="number" id="numberBlocks" min={selectedRaidLevels[1].minDisks} defaultValue={selectedRaidLevels[1].minDisks} onChange={(e)=> handleBlocksChange(e)} className="p-2 rounded-xl bg-neutral-900 border border-sky-500 w-full md:max-w-[64px] h-10"/>
            </div>

          </div>

        </form>

        <p className="mt-4">resultado: </p>
        <div className="flex flex-row w-full border border-sky-500 h-10 text-black font-bold">
          <div className={`bg-green-300 h-full p-2`} style={{width: result/totalDisks*100+"%" }}>
            {result * disksCapacity.val + "TB"} = {(result/totalDisks*100).toFixed(0)+"%"}
          </div>
          <div className={"bg-red-300 h-full " + ((totalDisks-result)/totalDisks > 0 ? "p-2": '')} style={{width: (totalDisks-result)/totalDisks*100+"%" }}>
            <p className={(totalDisks-result)/totalDisks == 0 ? "hidden":null}>{(totalDisks-result) * disksCapacity.val + " TB"} = {((totalDisks-result)/totalDisks*100).toFixed(0)+"%"}</p>
          </div>
        </div>

        <ul className="mt-4">
          <li><strong>Capacidad Util:</strong> {result * disksCapacity.val + "TB"}</li>
          <li><strong>Capacidad de paridad:</strong> {(totalDisks-result) * disksCapacity.val + " TB"}</li>
          <li><strong>max Nº de discos comprometidos:</strong> {toleranciaFallos(selectedRaidLevels, numberDisks, numberBlocks)}</li>
          <li><strong>velocidad de lectura y escritura:</strong> X{result} Discos
            <ul className="ml-4">
              <li> la velocidad de escritura es menor debido a los cálculos de la RAID</li>
            </ul>
          </li>

        </ul>

        <div className=" flex flex-row gap-2 mb-2">
          Esquema:
          <button
            onClick={(e) => {
              e.preventDefault
              setShow(!show)
            }}
            className="border-2 rounded-lg border-sky-500 p-1 hover:bg-slate-700 hover:scale-75 duration-100"
          >
            {show? "esconder": "mostrar"}
          </button>
        </div>
        {show && <div className="h-80 border overflow-x-scroll" id="svgContainer">
          <RenderSchema
            size={disksCapacity.name}
            disks={numberDisks}
            blocks={numberBlocks}
            raids={[
              selectedRaidLevels[0].lvl,
              selectedRaidLevels[1].lvl
              ]
            }
          />
        </div>}
      </div>
    </div>
  );
}
