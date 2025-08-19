import pool from "@/lib/db";

export async function POST(req) {
  // optener campos
  const {nombre, mail, asuntosSelect, mensaje, ipaddress} = await req.json();

  // comprovar que todos los campos existen
  if (!nombre || !mail || !Array.isArray(asuntosSelect) || asuntosSelect.length === 0 || !mensaje || !ipaddress) {
    return Response.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  // intentar insertar campos en la base de datos
  try {
    // insercion de los datos e optencion de la id del nuevo mensaje
    const msgResult = await pool.query(`INSERT INTO mensajes (nombre, mail, ip, mensaje)
      VALUES ($1,$2,$3,$4)
      RETURNING mensaje_id;`,
      [nombre,mail,ipaddress,mensaje]
    );

    // preparar variables para insertar los asuntos
    const msgID = msgResult?.rows[0].mensaje_id
    let insertsStringsArray = []
    let valuesArray = [msgID]

    // crear la lista de valores
    asuntosSelect.forEach((asunto, index) => {
      const position = index+2
      const insertString = '($1,$'+position+')'
      insertsStringsArray.push(insertString)
      valuesArray.push(asunto.id_asunto)
    });

    // construccion de la sentencia con los datos
    const buildedQuery = "INSERT INTO mensajes_asuntos (mensaje_id, asunto_id) VALUES"+insertsStringsArray.join(", ")+";"

    // intentar insertal los datos en la tabla relacional mensajes_asuntos
    await pool.query(buildedQuery,[...valuesArray]);

  } catch (error) {
    // console.log(msgResult)
    let mensaje
    switch (error.code) {
      case 'P0001':
        mensaje = "Ya se ha realizado una petición con tu correo o IP hace menos de 4h inténtalo más tarde contacta desde las redes sociales"
        break;
    
      default:
        mensaje = "Error al realizar la petición, inténtalo más tarde o contáctame por las redes sociales"
        break;
    }
    return Response.json({ error: mensaje }, { status: 400 });
  }





  return Response.json({ ok: true }, { status: 200 });
}
