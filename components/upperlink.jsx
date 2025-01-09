'use client'
import Link from "next/link";
import styles from '@/styles/upperlink.module.css'
import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export default function UpperLink(){
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    if (window.pageYOffset > 150) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Agregar un evento de escucha para el desplazamiento
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return(
    <>
    {
      isVisible && (
      <Link href={'#'} className={styles.upperlink}>
        <KeyboardArrowUpIcon fontSize="large"/>
      </Link>)
    }
    </>
  )
}