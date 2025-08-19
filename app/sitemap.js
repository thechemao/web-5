import pool from "@/lib/db";

async function getProyectos() {
  try {
    const result = await pool.query(`SELECT * FROM posts`);
    return result.rows;
  } catch (error) {
    return error;
  }
}

export default async function sitemap() {
  const baseUrl = 'chemao.es';
  const pages = await getProyectos();

  const sitemapEntries = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      priority: 0.1,
    },
    {
      url: `${baseUrl}/entradas`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      priority: 0.4,
    },
        {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      priority: 0.4,
    },
  ];

  const postEntries = pages.map((page) => ({
    url: `${baseUrl}/post/${page.title_id}`,
    lastModified: page.post_date,
    priority: 1,
  }));

  return sitemapEntries.concat(postEntries);
}