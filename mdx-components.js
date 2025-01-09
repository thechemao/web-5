import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vs from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';
import style from '@/styles/post.module.css'
import Image from 'next/image';

const componentes = {
	h1: ({...props }) => (
		<h1
			className={style.H1}
			{...props}
		/>
	),
	h2: ({...props }) => (
		<h2
			className={style.H2}
			{...props}
		/>
	),
	h3: ({...props }) => (
		<h3
			className={style.HMore}
			{...props}
		/>
	),
	h4: ({...props }) => (
		<h4
			className={style.HMore}
			{...props}
		/>
	),
	h5: ({...props }) => (
		<h5
			className={style.HMore}
			{...props}
		/>
	),
	h6: ({...props }) => (
		<h6
			className={style.HMore}
			{...props}
		/>
	),
	a: ({ className, ...props }) => (
		<Link
			className={style.Link}
			{...props}
		/>
	),
	p: ({...props }) => (
		<p
			className={style.P}
			{...props}
		/>
	),
	ul: ({...props }) => (
		<ul className={style.Ul} {...props} />
	),
	ol: ({...props }) => (
		<ol className={style.Ol} {...props} />
	),
	li: ({...props }) => (
		<li className={style.Li} {...props} />
	),
  code: ({ className, children}) => {
    const langclass = className.split('-')[1]
    return (
      <SyntaxHighlighter language={langclass} style={vs} className={style.Code}>
        {children}
      </SyntaxHighlighter>
    );
  },
  pre: ({children}) => (
    <>{children}</>
  ),
	table: ({...props }) => (
		<div className={style.TableDiv}>
			<table className={style.Table} {...props} />
		</div>
	),
	tr: ({...props }) => (
		<tr
			className={style.Tr}
			{...props}
		/>
	),
	th: ({...props }) => (
		<th
			className={style.Th}
			{...props}
		/>
	),
	td: ({...props }) => (
		<td
			className={style.Td}
			{...props}
		/>
	),
  img: ({alt, ...props}) => (
		<Image
      width={640}
      height={360}
			{...props}
			className={style.Image}
			alt={alt}
		/>
	),
	strong: ({...props}) => (
		<strong
			className={style.Strong}
			{...props}
		/>
	),
}
export function useMDXComponents(components) {
  return {...componentes, ...components}
}