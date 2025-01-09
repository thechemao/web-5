import Pie from '../../components/pie'
import Cabecera from '../../components/cabecera'
import styles from '@/styles/layout.module.css'
import 'katex/dist/katex.min.css'

export default function InicioLayout({ children }) {
  return (
  <div className={styles.gridpost}>
    <Cabecera/>
    {children}
    <Pie/>
  </div>
  )
}
