import Link from "next/link"

export default function WebLinks({sm, social}) {
  const socialLinks = {
    def: [
      {name: 'X', url: 'https://x.com'},
      {name: 'LinkedIn', url: 'https://linkedin.com'},
      {name: 'InfoJobs', url: 'https://infojobs.com'},
      {name: 'YouTube', url: 'https://youtube.com'}
    ],
    sm: [
      {name: 'X', url: 'https://x.com'},
      {name: 'LN', url: 'https://linkedin.com'},
      {name: 'IJ', url: 'https://nfojobs.com'},
      {name: 'YT', url: 'https://youtube.com'}
    ]
  }
  const webLinks = [
    {name: 'Entradas', url: '/entradas'},
    {name: 'Sobre Mí', url: '/about'},
    {name: 'Contacto', url: '/contacto'},
  ]

  const links = social? sm ? socialLinks.sm : socialLinks.def : webLinks

  return(
    links.map((link, index) => {
      return(
        <Link href={link.url} key={index} className="hover:text-sky-500 hover:scale-125 duration-100"> {link.name} </Link>

      )
    })
  )
}