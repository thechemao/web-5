function MakeDisks({disksArray, iniCoords, height}) {
  return(
    <svg id="disks">
      {disksArray.map((data, index) =>{
        const positions = {
          x: data.position + (iniCoords? iniCoords : 0),
          y: height
        }
        return(
          <svg x={positions.x} y={positions.y} key={index}>
            <ellipse cx="37.5" cy="71.25" rx="30" ry="11.25" fill="gray" stroke="black" strokeWidth="5" />
            <rect x="7.5" y="18.75" height="52" width="60" fill="gray" />
            <ellipse cx="37.5" cy="18.75" rx="30" ry="11.25" fill="#666" stroke="black" strokeWidth="5" />
            <line x1="7.5" y1="18.75" x2="7.5" y2="74.5" stroke="black" strokeWidth="5" />
            <line x1="67.5" y1="18.75" x2="67.5" y2="74.5" stroke="black" strokeWidth="5" />
            <text x={data.name.length > 3? 16 : 22} y="60" fontWeight="700">{data.name}</text>
          </svg>
        )
      })}
    </svg>
  )
}

function MakeBlocks({blocksArray, disksArray}) {
  return(
    blocksArray.map((data,index) =>{
      const iniCoords = (65+10) * (disksArray.length + 1) * index
      return(
        <svg id="raidsDisks" key={index}>
          {
            disksArray.map((dataDisks,index)=>{
              return(
                <line key={index} x1={data.position + 35} y1={80} x2={dataDisks.position+iniCoords+35} y2={160} stroke="black" strokeWidth={2}/>
              )
            })
          }
          <svg x={data.position} y="80" >
            <rect x="0" y="0" height="25" width="75" fill="#F00" rx="5"/>
            <text x="10" y="18" fontWeight="700">{data.name}</text>
          </svg>,
          <MakeDisks disksArray={disksArray} iniCoords={iniCoords} height={150}/>
        </svg>
      )
    })
  )
}

export default function RenderSchema({disks, blocks, raids, size}) {
  const textR0 = "RAID " + (raids[1] == ""? raids[0] : raids[1])
  const middlePosition = (75 * disks * blocks + (blocks-1) * 75) / 2 - 35
  let disksArray = []
  let blocksArray = []
  // crear array de discos
  for (let i = 0; i < disks; i++) {
    disksArray.push({name: size, position: ((65+10)*i)})
  }
  // crear array de bloques
  for (let i = 0; i < blocks; i++) {
    blocksArray.push({name: "RAID " + raids[0], position: ((65+10) * disks / 2 - 35) + (75 * (disks+1) * i)})
  }


  return(
    <svg width={75 * disks * blocks + (blocks-1) * 75 } height={256}>
      {raids[1] == ""?
        disksArray.map((data,index)=>{
          return(
            <line key={index} x1={middlePosition + 35} y1={30} x2={data.position+35} y2={90} stroke="black" strokeWidth={2}/>
          )
        })
        :
        blocksArray.map((data,index)=>{
          return(
            <line key={index} x1={middlePosition + 35} y1={30} x2={data.position+35} y2={90} stroke="black" strokeWidth={2}/>
          )
        })
      }
      <svg x={middlePosition} y="10">
        <rect x="0" y="0" height="25" width="75" fill="#F00" rx="5"/>
        <text x="10" y="18" fontWeight="700">{textR0}</text>
      </svg>

      {raids[1] == ""?
        <MakeDisks disksArray={disksArray} height={80} key={disks}/>
        :
        <MakeBlocks blocksArray={blocksArray} disksArray={disksArray}/>
      }

    </svg>
  )
}