'use client'
import { useState } from "react";
import { Result } from "./result";
import { SubNeting } from "./subNeting";
import { SuperNeting } from "./superNeting";

function subneting(ip, mask, bits) {
  let bitsCombination = []
  const posibilidades = 2 ** bits
  let ipString = `${ip[0]}${ip[1]}${ip[2]}${ip[3]}`
  for (let index = 0; index < posibilidades; index++) {
    const binaryNumber = index.toString(2);
    const paddingLength = bits - binaryNumber.length;
    bitsCombination.push('0'.repeat(paddingLength) + binaryNumber)
  }
  let allNewIpsString = []
  for (let i = 0; i < bitsCombination.length; i++) {
    let newIDString = ipString.substring(0, mask) + bitsCombination[i] + ipString.substring(mask+bitsCombination[i].length)
    let NewFirstHost = newIDString.slice(0, -1) + 1
    let NewLastHost = newIDString.substring(0, mask+bitsCombination[i].length) + "1".repeat(newIDString.length - (mask+bitsCombination[i].length + 1)) + "0";
    let newBroadCats = NewLastHost.slice(0, -1) + 1
    allNewIpsString.push({'ID': newIDString, 'FirstHost': NewFirstHost, 'LastHost': NewLastHost, 'BroadCast': newBroadCats})
  }

  const AllIps = allNewIpsString.map(ip =>{
    let newNetData = {}
    for (var propiedad in ip) {
      if (ip.hasOwnProperty(propiedad)) {
        let newIP = []
        for (var i = 0; i < ip[propiedad].length; i += 8) {
          var segmento = ip[propiedad].substring(i, i + 8);
          newIP.push(segmento);
        }
        newNetData[propiedad] = `${parseInt(newIP[0], 2)}.${parseInt(newIP[1], 2)}.${parseInt(newIP[2], 2)}.${parseInt(newIP[3], 2)}`
      }
    }
    return {...newNetData, 'mask': mask + bits}
  })
  return AllIps
}

function ipToBin(ip) {
  return ip.map((Byte) => {
    const binaryNumber = Byte.toString(2);
    const paddingLength = 8 - binaryNumber.length;
    return '0'.repeat(paddingLength) + binaryNumber;
  })
}

function maskTuBinIp(mask) {
  const NumberOfBytes = Math.floor(mask/8)
  const RestBits = mask % 8
  let MaskBinIp = []
  if (NumberOfBytes > 0) {
    for (let index = 0; index < NumberOfBytes; index++) {
      MaskBinIp.push('11111111')
    }
  }
  if (RestBits > 0) {
    let nextByte ='1'.repeat(RestBits);
    const paddingLength = 8 - nextByte.length;
    nextByte += '0'.repeat(paddingLength);
    MaskBinIp.push(nextByte)
  }
  for (let index = MaskBinIp.length; index < 4; index++) {
    MaskBinIp.push('00000000')
  }
  return MaskBinIp
}

function GetBitsToTake(nets, mask) {
  const maxBits = 31 - mask
  if (nets < 2){
    return 0
  } else {
    for (let i = 1; i <= maxBits; i++){
      if (2 ** i >= nets) {
        return i
      }
    }
    return 0
  }

}
export default function NettingMenu() {
  const [type, setType ] = useState({
    sub: true,
    super: false,
  })
  const [calculated, setCalculated ] = useState({
    state: false,
    Data: [],
  })
  const [ipData, setIPData ] = useState({ip: [192,168,0,0], mask: 24, nets: 0})
  const [networks, setNetworks] = useState({bits: 1, networks: [], mask: 24})

  const handlers = {
    Ip: (event) => {
      event.preventDefault()
      let newIp = ipData.ip
      newIp[Number(event.target.id.slice(-1))] = Number(event.target.value) > 255? 255 : Number(event.target.value)
      setIPData({...ipData, ip: newIp})
    },
    Mask: (event) => {
      event.preventDefault()
      setIPData({...ipData, mask: Number(event.target.value) > 30? 30 : Number(event.target.value)})
    },
    Nets: (event) => {
      event.preventDefault()
      setIPData({...ipData, nets: Number(event.target.value)})
    },
    Type: (event) => {
      event.preventDefault()
      setType({sub: !type.sub, super: !type.super})
    },
    AddNetworks: (event, type) => {
      event.preventDefault()
      if (networks.bits > 1  && type == 1 ) {
        const newBits = networks.bits - 1
        setNetworks({ ...networks, bits: newBits})
      }else if (type == 0) {
        const newBits = networks.bits + 1
        setNetworks({ ...networks, bits: newBits})
      }
    },
    Ips: (event, index) => {
      event.preventDefault()
      let newNetworks = networks.networks
      let newIp = newNetworks[index]
      newIp[Number(event.target.id)] = Number(event.target.value) > 255? 255 : Number(event.target.value)
      newNetworks[index] = newIp
      setNetworks({...networks, networks: newNetworks})
    },
    SuperMask: (event) => {
      event.preventDefault()
      setNetworks({ ...networks, mask: event.target.value})
    },
  }

  const handleCalculate = (event) => {
    event.preventDefault()

    if (type.sub) {
      const binMask = maskTuBinIp(ipData.mask)
      const binIp = ipToBin(ipData.ip)
      let NetID = [];
      for (let index = 0; index < 4; index++) {
        let result = ""
        let binario1 = binIp[index]
        let binario2 = binMask[index]
        for (let i = 0; i < 8; i++) {
          let bit1 = parseInt(binario1[i], 10)
          let bit2 = parseInt(binario2[i], 10)
          let resultadoBit = bit1 & bit2
          result += resultadoBit.toString()
        }
        NetID.push(result)
      }
      const BitsToTake = GetBitsToTake(ipData.nets, ipData.mask)
      if (BitsToTake != 0) {
        const data = subneting(NetID, ipData.mask, BitsToTake)
        setCalculated({state: true, Data: data})
      }
    } else {
      const binMask = maskTuBinIp(networks.mask)
      const binNetworks = networks.networks.map(ip => {
        return ipToBin(ip)
      })
      let NetID = [];
      for (let index1 = 0; index1 < binNetworks.length; index1++) {
        NetID.push([]);
        const newBinNetwork = binNetworks[index1]
        for (let index2 = 0; index2 < 4; index2++) {
          let result = ""
          let binario1 = newBinNetwork[index2]
          let binario2 = binMask[index2]
          for (let index3 = 0; index3 < 8; index3++) {
            let bit1 = parseInt(binario1[index3], 10)
            let bit2 = parseInt(binario2[index3], 10)
            let resultadoBit = bit1 & bit2
            result += resultadoBit.toString()
          }
          NetID[index1].push(result)
        }
      }
      let verified = true
      for (let index = 0; index < NetID.length; index++) {
        let firstIp = `${NetID[0][0]}${NetID[0][1]}${NetID[0][2]}${NetID[0][3]}`
        let checkIp = `${NetID[index][0]}${NetID[index][1]}${NetID[index][2]}${NetID[index][3]}`
        firstIp = firstIp.slice(0, networks.mask - networks.bits)
        checkIp = checkIp.slice(0, networks.mask - networks.bits)
        console.log([firstIp, checkIp])
        if ( (checkIp === firstIp) && verified) {
          verified = true
        } else {
          verified = false
        }
      }
      let ipString = `${NetID[0][0]}${NetID[0][1]}${NetID[0][2]}${NetID[0][3]}`
      if (verified) {
        let newIDString = ipString.slice(0, networks.mask - networks.bits) + '0'.repeat(32 - networks.mask + networks.bits)
        let NewFirstHost = newIDString.slice(0, -1) + 1
        let NewLastHost = newIDString.substring(0, networks.mask - networks.bits) + "1".repeat(32 - networks.mask + networks.bits - 1) + "0";
        let NewBroadCats = NewLastHost.slice(0, -1) + 1

        let allNewIpsString = [{'ID': newIDString, 'FirstHost': NewFirstHost, 'LastHost': NewLastHost, 'BroadCast': NewBroadCats}]
        const AllIps = allNewIpsString.map(ip =>{
          let newNetData = {}
          for (var propiedad in ip) {
            if (ip.hasOwnProperty(propiedad)) {
              let newIP = []
              for (var i = 0; i < ip[propiedad].length; i += 8) {
                var segmento = ip[propiedad].substring(i, i + 8);
                newIP.push(segmento);
              }
              newNetData[propiedad] = `${parseInt(newIP[0], 2)}.${parseInt(newIP[1], 2)}.${parseInt(newIP[2], 2)}.${parseInt(newIP[3], 2)}`
            }
          }
          return {...newNetData, 'mask': networks.mask - networks.bits}
        })
        setCalculated({state: true, Data: AllIps})
      }else{
        console.log('error')
      }


    }
  }
  return (
    <div className="h-full flex items-center justify-center m-auto">
      <br />
      {calculated.state?
        <Result DataState={[calculated,setCalculated]}/>
        :
        <form className="bg-neutral-800 bg-gradient-to-t p-4 border-2 rounded-md border-white">
          <div className="flex flex-row justify-evenly mb-4 gap-3">
            <button onClick={(e) => {handlers.Type(e)}} className={type.sub? "border-2 border-white bg-sky-700 p-2 w-full rounded-md hover:bg-sky-800" : "border-2 border-white bg-stone-800 p-2 w-full rounded-md hover:bg-stone-600"}>Subneting</button>
            <button onClick={(e) => {handlers.Type(e)}} className={type.super? "border-2 border-white bg-sky-700 p-2 w-full rounded-md hover:bg-sky-800" : "border-2 border-white bg-stone-800 p-2 w-full rounded-md hover:bg-stone-600"}>superneting</button>
          </div>
          {type.sub?
            <SubNeting handlers={handlers} state={[ipData, setIPData ]}/>
            :
            <SuperNeting handlers={handlers}  state={[networks, setNetworks]}/>
          }
          <div className=" text-center mt-3">
            <button onClick={(e)=>{handleCalculate(e)}} type="submit" className="border-2 border-white bg-stone-800 p-2 w-full rounded-md hover:bg-stone-600">Calcular</button>
          </div>
        </form>
      }
    </div>
  );
}
