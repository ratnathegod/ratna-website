import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <Head />
      <body 
        className="bg-black text-zinc-200 antialiased"
        style={{ backgroundColor: '#000', color: '#e4e4e7' }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
