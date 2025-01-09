"use client"

import { Pagination } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useEffect } from "react";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function MyPagination ({ contenidos }) {
  const SearchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()
  const page = Number(SearchParams.get('page')? SearchParams.get('page') : 1)
  const paginas = Math.ceil(contenidos / 8)

  useEffect(() => {
    const params = new URLSearchParams(SearchParams)
    if (!params.get('page')) {
      params.set('page', 1)
      replace(`${pathName}?${params.toString()}`)
    }
  },[])

  const onChange = ( event, value ) => {
    const params = new URLSearchParams(SearchParams)
    params.set('page', value)
    replace(`${pathName}?${params.toString()}`)
  }

  return (
    <div className="flex flex-row justify-center p-4">
      <ThemeProvider theme={darkTheme}>
        <Pagination count={paginas} page={page} onChange={onChange} siblingCount={0} color="primary" variant="outlined"/>
      </ThemeProvider>
    </div>
  )
}