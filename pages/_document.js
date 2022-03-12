import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
            <meta charSet="utf-8" />
            <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

            <link rel="stylesheet" href="/assets/css/bootstrap.min.css" type="text/css" />
            <link rel="stylesheet" href="/assets/css/font-awesome.min.css" type="text/css" />
            <link rel="stylesheet" href="/assets/css/elegant-icons.css" type="text/css" />
            <link rel="stylesheet" href="/assets/css/plyr.css" type="text/css" />
            <link rel="stylesheet" href="/assets/css/nice-select.css" type="text/css" />
            <link rel="stylesheet" href="/assets/css/slicknav.min.css" type="text/css" />
            <link rel="stylesheet" href="/assets/sass/style.css" type="text/css" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument