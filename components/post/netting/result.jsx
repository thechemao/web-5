export function Result({DataState}) {
  const [calculated, setCalculated] = DataState

  return(
  <div className="relative">
    <div className="bg-neutral-800 bg-gradient-to-t max-h-[300px] shadow-md p-4 border-2 rounded-md border-white overflow-y-scroll flex flex-col gap-2">
      {calculated.Data.map((netWork, index) => (
        <div key={index} className="relative w-full border-2 border-sky-500 rounded-md p-4">
          <ul>
            <li>
            id: {netWork.ID} / {netWork.mask}
            </li>
            <li>
            First Host: {netWork.FirstHost}
            </li>
            <li>
            Last Host: {netWork.LastHost}
            </li>
            <li>
            BroadCast: {netWork.BroadCast}
            </li>
          </ul>
          <div className="absolute top-[-5px] left-[-5px] text-center w-6 h-6 border-2 rounded-full border-white bg-neutral-800">{index}</div>
        </div>
      ))}
    </div>
    <button onClick={() => {setCalculated({...calculated, state: false})}} className="text-center absolute top-[-10px] left-[-10px] w-8 h-8 text-xl hover:bg-red-600 hover:text-white duration-500 bg-slate-500 text-red-600 rounded-full border border-white">X</button>
  </div>
  )
}