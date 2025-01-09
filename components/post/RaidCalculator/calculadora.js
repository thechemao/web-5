function singleLevel(disks, parity) {
  return ((disks - parity) / disks) * disks
}

export function RaidCalculator(data){
  let levels = data.selectedRaidLevels
  let disks = Number(data.disks)
  let blocks = Number(data.blocks)
  let usageDisks

  if (levels[1].lvl !== "") {
    usageDisks = singleLevel(disks, levels[0].parity(disks)) * singleLevel(blocks, levels[1].parity(blocks))
  } else {
    usageDisks = singleLevel(disks, levels[0].parity(disks))
  }
  return usageDisks

}

export function toleranciaFallos(raid, disks, blocks) {
  let tolerancia
  if (raid[1].lvl == "0") { // 0x
    tolerancia = raid[0].parity(disks)
  } else if (raid[0].lvl == "0") { //x0
    tolerancia = raid[1].parity(disks)
  } else if (raid[0].lvl == "5" && raid[1].lvl == "1"){ //51
    tolerancia = 2 * (blocks-1) + 1
  } else if (raid[0].lvl == "6" && raid[1].lvl == "1"){ //61
    tolerancia = 3 * (blocks-1) + 2
  } else if (raid[0].lvl == "5" && raid[1].lvl == "5"){ // 55
    tolerancia = 3
  } else if ((raid[0].lvl == "5" && raid[1].lvl == "6") || (raid[0].lvl == "6" && raid[1].lvl == "5")){ //56 65
    tolerancia = 5
  } else if (raid[0].lvl == "6" && raid[1].lvl == "6"){ // 66
    tolerancia = 8
  } else {
    tolerancia = (raid[1].parity(blocks)*disks)+raid[0].parity(disks)
  }
  return tolerancia
}