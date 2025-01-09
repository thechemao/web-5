'use client'

import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import Filtros from './filter';

export default function PostDrawer({tipos}){
  const [open, setOpen] = useState(false)
  return(
    <div className="w-full bg-stone-800 md:hidden block mb-2">
      <button
        className="w-full p-2 border-2 border-sky-500 flex flex-row justify-between"
        onClick={() => {setOpen(true)}}
      >
        <p>Filtros:</p>
        <FilterListIcon/>
      </button >
      <Drawer
        anchor={'left'}
        open={open}
        onClose={() => {setOpen(false)}}
      >
        <div className='w-64 h-full bg-stone-800 block md:hidden text-white'>
          <button
            className="w-full p-2 border-2 border-sky-500 flex flex-row justify-between"
            onClick={() => {setOpen(false)}}
          >
            <p>Filtros:</p>
            <FilterListOffIcon/>
          </button >
          <Filtros tipos={tipos}/>
        </div>
      </Drawer>
    </div>
  )
}