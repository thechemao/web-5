import Image from "next/image";
import styles from '@/styles/about.module.css'

export default function About() {
  return (
    <main className={styles.pageGrid+ " xl:mx-40 lg:mx-32 h-max my-3 p-3 md:py-4 md:p-0"}>
      Hola Mundo
    </main>
  )
}