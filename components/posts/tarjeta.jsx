import styles from '@/styles/tarjeta.module.css'
import SVGRender from './SVGRender';
import Link from 'next/link';

export default function Tarjeta({contenido}) {
  const fecha = new Date(contenido.post_date);

  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const año = fecha.getFullYear();

  const fechaFormateada = `${dia}/${mes}/${año}`
  return(
    <Link className={styles.contenedor} href={`/post/${contenido.id}`}>
      <div className={styles.image + " rounded-full w-20 h-20 bg-red-200 border-2 border-sky-500 flex items-center justify-center"}>
        <SVGRender id={contenido.id_type} height={60}/>
      </div>

      <p className={styles.titulo + ' text-sm'}>{contenido.title}</p>
      <p className={styles.descripcion+ ' text-[14px] mb-2 font-mono font-bold'}>{contenido.descripcion}</p>
      <p className={styles.fecha + ' text-[10px]'}>{fechaFormateada}</p>
    </Link>
  )

}