import styles from '@/styles/home.module.css'
import WebLinks from "@/components/WebLinks";

export default function Home() {

  return (
    <div className={styles.divanimation}>

      <div className={styles.divfullscreen}>
        <nav className={'flex w-full flex-row justify-evenly mb-8 text-[12px] md:text-[16px]'}>
          <WebLinks/>
        </nav>
        <div className={styles.textborder}>
          <p className={styles.phover + ' text-[16px] sm:text-3xl md:text-4xl sm:p-2 p-1'}>C</p>
          <p className={styles.phover + ' text-[16px] sm:text-3xl md:text-4xl sm:p-2 p-1'}>h</p>
          <p className={styles.phover + ' text-[16px] sm:text-3xl md:text-4xl sm:p-2 p-1'}>e</p>
          <p className={styles.phover + ' text-[16px] sm:text-3xl md:text-4xl sm:p-2 p-1'}>m</p>
          <p className={styles.phover + ' text-[16px] sm:text-3xl md:text-4xl sm:p-2 p-1'}>a</p>
          <p className={styles.phover + ' text-[16px] sm:text-3xl md:text-4xl sm:p-2 p-1'}>o</p>
          <p className={styles.phover + ' text-[16px] sm:text-3xl md:text-4xl sm:p-2 p-1'}>-</p>
          <p className={styles.phover + ' text-[16px] sm:text-3xl md:text-4xl sm:p-2 p-1'}>W</p>
          <p className={styles.phover + ' text-[16px] sm:text-3xl md:text-4xl sm:p-2 p-1'}>e</p>
          <p className={styles.phover + ' text-[16px] sm:text-3xl md:text-4xl sm:p-2 p-1'}>b</p>
        </div>

      </div>
    </div>
  )
}
