import PostDrawer from "@/components/posts/drawer";
import MyPagination from "@/components/posts/pagination";
import Tarjetas from "@/components/posts/tarjetas";
import styles from '@/styles/scroll.module.css'
import pool from "@/lib/db";
export const dynamic = 'force-dynamic';

async function getMoreProyectos(request){
  const data = request
  let sqlQuery = 'SELECT * FROM posts WHERE true'
  let parametersArray = []
  if(data?.type){
    sqlQuery += ' AND id_type = $1'
    parametersArray.push(Number(data.type))
  }
  if (data?.search) {
    const parameternumber = (parametersArray.length > 0? '$2' : '$1')
    parametersArray.push(data.search)
    sqlQuery += ` AND plainto_tsquery(${parameternumber}) @@ to_tsvector(coalesce(title_show,\'\') || \' \' || coalesce(descripcion,\'\'))`
  }
  if(data?.orderMethod == 'asc'){
    sqlQuery += ' ORDER BY post_date ASC;'
  } else {
    sqlQuery += ' ORDER BY post_date DESC;'
  }
  try {
    const result = await pool.query(sqlQuery, parametersArray);
    return result.rows;
  } catch (error) {
    console.log(error)
    return [] // Return an empty array in case of error;
  }
}

async function getTypes(){
  try {
    const result = await pool.query('SELECT * FROM types');
    return result.rows;
  } catch (error) {
    console.log(error)
    return [];
  }
}


export default async function Posts({searchParams}) {
  const params = await searchParams
  const res = await getMoreProyectos(params)
  const tipos = await getTypes()
  const iniCont = (Number(params.page) - 1) * 8
  const endCont = iniCont + 8
  let contenido = []
  console.log(res)
  if (res.length > 7){
    contenido = res.slice(iniCont, endCont)
  }
  else if (res.length >= 1){
    contenido = res
  }

  return (
  <>
    <main className="xl:ml-40 lg:ml-32 h-max p-5 mr-3 md:py-4 md:p-0">
      <PostDrawer tipos={tipos}/>
      <section className="flex flex-row">
        <div className="w-5 my-8 rounded-[4px] bg-white">
          <div className={styles.progesscroll}/>
        </div>
        <div className="ml-4 w-full">
          <p className="mb-8">Posts recientes:</p>
          <Tarjetas contenido={contenido}/>
          <div> {/* pagination buttons */}
            {res.length > 7 ?
              <MyPagination contenidos={res.length}/> : null
            }
          </div>
        </div>
      </section>
    </main>
  </>
  )
}
