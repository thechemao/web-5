import Filtros from "./filter"
import pool from "@/lib/db";

async function getTypes(){
  const sqlQuery = 'SELECT * FROM types'
  try {
    const result = await pool.query(sqlQuery);
    return result.rows
  } catch (error) {
    return [];
  }
}
export default async function PagesAside() {
  const types = await getTypes()
  return(
    <aside className="xl:mr-40 lg:mr-28 p-2 pl-4 hidden md:block border-l-2 border-sky-500">
      <p className="mb-8 text-md">Filtros:</p>
      <Filtros tipos={types}/>
    </aside>
  )
}