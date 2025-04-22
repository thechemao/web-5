import Pie from '../../components/pie'
import Cabecera from '../../components/cabecera'
import styles from '@/styles/layout.module.css'

export const metadata = {
  title: 'Sobre Mi',
  description: 'Conoce a Chemao / Josep Maria',
}

export default function InicioLayout({ children }) {
  return (
  <div className={styles.gridnotaside + " overflow-hidden"}>
    <Cabecera/>
    {children}
    <Pie/>
  </div>
  )
}