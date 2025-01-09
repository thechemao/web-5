export default function Card({page}){
  return (
    <div className="bg-gray-950 border-sky-500 border-2 rounded-t-lg shadow-inner shadow-sky-300 grow flex flex-col p-5">
      <h1 className="text-2xl text-sky-500 font-bold">Title {page}</h1>
      <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec eros ultricies tincidunt. Nullam nec purus nec eros ultricies</p>
    </div>
  )
}