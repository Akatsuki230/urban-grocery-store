import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* urban grocery store title and short description, color brown */}
        <meta name="theme-color" content="#795548" />
        <meta name='og:description' content='Urban Grocery Store' />
        <meta name='keywords' content='urban, grocery, store' />
        <meta name='author' content='mldkyt, TanZan' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='og:title' content='Urban Grocery Store' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

