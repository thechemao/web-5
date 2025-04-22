import { sql } from '@vercel/postgres'

async function getPostMeta(request) {
  const data = request
  try {
    const result =
      await sql`SELECT * FROM posts WHERE id = ${data};`;
    return result.rows[0];
  } catch (error) {
    return error;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const meta = (await getPostMeta(slug))
  return {
    title: meta?.title? meta.title : 'titulo post',
    description: meta?.descripcion? meta.descripcion : 'descripción',
    keywords: meta?.key_words? meta.key_words.split(" ") : 'palabras clave'
  }
}

export default async function Post ({ params }) {
    const { slug } = await params
    const { default: Post } = await import(`../../../proyectos/${slug}.mdx`)

    return (
      <>
        <main className="font-sans xl:mx-64 lg:mx-32 h-max my-2 p-2 md:py-4 md:p-0">
          <Post/>
        </main>
      </>
    );
}

export function generateStaticParams() {
  return [{ slug: 'welcome' }, { slug: 'about' }]
}
