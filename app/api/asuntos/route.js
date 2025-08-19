import pool from "@/lib/db";

export async function GET() {

  try {
    const result = await pool.query('SELECT * FROM asuntos');
    const asuntos = result.rows
    return Response.json(asuntos, { status: 200 });
  } catch (error) {
    console.log(error)
    return Response.json([], { status: 200 });
  }
  
  
}