"use client"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

export default function Filtros({tipos}) {
  const SearchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const handleChangeSearch = useDebouncedCallback((event) => {
    const search = event.target.value
    const params = new URLSearchParams(SearchParams)
    if(search){
      params.set('search', search)
      params.set('page', 1)
    } else {
      params.delete('search')
    }

    replace(`${pathName}?${params.toString()}`)
  }, 300)

  const handleChangeType = (event) => {
    event.preventDefault()
    const type = event.target.value
    const params = new URLSearchParams(SearchParams)
    if(type){
      params.set('type', type)
      params.set('page', 1)
    } else {
      params.delete('type')
    }

    replace(`${pathName}?${params.toString()}`)
  }

  const handleChangeOrderMethod = (event) => {
    event.preventDefault()
    const type = event.target.value
    const params = new URLSearchParams(SearchParams)
    if(type){
      params.set('orderMethod', type)
      params.set('page', 1)
    } else {
      params.delete('orderMethod')
    }
    replace(`${pathName}?${params.toString()}`)
  }

  const handleclickClear = (event) => {
    event.preventDefault()
    const params = new URLSearchParams(SearchParams)
    params.delete('type')
    params.delete('orderMethod')
    params.delete('search')
    replace(`${pathName}?${params.toString()}`)
  }

  return(
    <div className="p-3 w-full">
      <form>
        <label className="mb-8 text-sm" htmlFor="search">Buscar: </label ><br />
        <input type="text" id="search"
          onChange={(e) => handleChangeSearch(e)}
          defaultValue={SearchParams.get('search')}
          className='input'
        />
        <p className="mt-4 mb-2 text-sm">Tipos: </p>

        {tipos.map(tipo => {return(
          <div key={tipo.id}>
            <input type="radio" name='tipos' id={tipo.type_name}
              onChange={(e) => handleChangeType(e)}
              value={tipo.id} checked={SearchParams.get('type') == tipo.id? true : false }
              className='radio'
            />
            <label htmlFor={tipo.type_name} className="pl-2 text-[16px] font-mono">{tipo.type_name}</label>
          </div>
        )})}

        <p className="mt-4 mb-2 text-sm">Orden: </p>
        <input type="radio" name='order' id="asc" value="asc"
          onChange={(e) => handleChangeOrderMethod(e)}
          checked={SearchParams.get('orderMethod') == 'asc'? true : false }
          className='radio'
        />
        <label htmlFor="asc" className="pl-2 text-[16px] font-mono">ascendente</label>
        <br />
        <input type="radio" name='order' id="desc" value="desc"
          onChange={(e) => handleChangeOrderMethod(e)}
          checked={SearchParams.get('orderMethod') == 'desc' ||
            SearchParams.get('orderMethod') == null ?
            true : false
          }
          className='radio'
        />
        <label htmlFor="desc" className="pl-2 text-[16px] font-mono">descendente</label>

        <button onClick={(e) => handleclickClear(e)} value={'Todo'} className="border-2 rounded-lg border-sky-500 hover:bg-slate-500 duration-200 w-full my-4 p-2 text-sm">Limpiar</button>
      </form>
    </div>
  )
}