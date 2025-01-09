import Pie from '../../components/pie'
import Cabecera from '../../components/cabecera'
import styles from '@/styles/layout.module.css'

export const metadata = {
  title: 'contacto',
  description: 'Contacta con migo',
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