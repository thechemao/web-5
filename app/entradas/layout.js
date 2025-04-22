import Pie from '../../components/pie'
import Cabecera from '../../components/cabecera'
import PagesAside from '@/components/posts/aside-Posts'
import styles from '@/styles/layout.module.css'

export const metadata = {
  title: 'posts',
  description: 'En esta pagina podrás encontrar o buscar los post por interés',
}

export default function PostsLayout({ children }) {
  return (
  <div className={styles.gridaside}>
    <Cabecera/>
    {children}
    <PagesAside/>
    <Pie/>
  </div>
  )
}
