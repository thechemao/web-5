import dynamic from 'next/dynamic'
import { sql } from '@vercel/postgres'

async function getPostMeta(request) {
  const data = request
  try {
    const result =
      await sql`SELECT * FROM posts WHERE id = ${data};`;
    return result.rows;
  } catch (error) {
    return error;
  }
}

export async function generateMetadata({ params }) {
  const meta = (await getPostMeta(params.slug))[0]
  return {
    title: meta?.title? meta.title : 'titulo post',
    description: meta?.descripcion? meta.descripcion : 'descripción',
    keywords: meta?.key_words? meta.key_words.split(" ") : 'palabras clave'
  }
}

export default function Post ({ params }) {
    const Proyecto = dynamic(() => import(`@/proyectos/${params.slug}.mdx`))

    return (
      <>
        <main className="font-sans xl:mx-64 lg:mx-32 h-max my-2 p-2 md:py-4 md:p-0">
          <Proyecto/>
        </main>
      </>
    );
}
