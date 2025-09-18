import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body className="bg-black text-zinc-200 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
