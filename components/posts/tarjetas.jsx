import Tarjeta from "./tarjeta"

export default function Tarjetas({contenido}) {
  return(
    <div className="flex flex-col gap-4">
      {contenido.map( postData => {
        return <Tarjeta key={postData.id} contenido={postData}/>
      })}
    </div>
  )
}
