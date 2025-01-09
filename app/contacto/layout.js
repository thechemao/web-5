import Pie from '../../components/pie'
import Cabecera from '../../components/cabecera'
import styles from '@/styles/layout.module.css'

export const metadata = {
  title: 'about',
  description: 'información sobre el creador de la pagina',
}

export default function InicioLayout({ children }) {
  return (
  <div className={styles.gridnotaside}>
    <Cabecera/>
      {children}
    <Pie/>
  </div>
  )
}