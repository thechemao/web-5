import Filtros from "./filter"
import { sql } from "@vercel/postgres";

async function getTypes(){
  const sqlQuery = 'SELECT * FROM types'
  try {
    const result = await sql.query(sqlQuery);
    return result.rows
  } catch (error) {
    return [];
  }
}
export default async function PagesAside() {
  const types = await getTypes()
  console.log("types: -----------------");
  console.log(types)
  return(
    <aside className="xl:mr-40 lg:mr-28 p-2 pl-4 hidden md:block border-l-2 border-sky-500">
      <p className="mb-8 text-md">Filtros:</p>
      <Filtros tipos={types}/>
    </aside>
  )
}