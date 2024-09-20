import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import theme from "@/site-settings/theme";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ar">
        <Head>
          <title>TripRex</title>
          <meta name="title" content=" TripRex" />
          <meta name="description" content="TripRex" />
        <meta
            name="keywords"
            content="TripRex"
   
          />

          <link rel="manifest" href="/manifest.json" />
          {/* <link
            rel="apple-touch-icon"
              
            href="https://firebasestorage.googleapis.com/v0/b/test-2221c.appspot.com/o/logo-2.jfif?alt=media&token=8b51a5e3-9500-41ae-806e-10db8d17e38e"
             sizes="256x256"
            // "/favicon.ico"
          ></link> */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          />




        </Head>
        <body dir="rtl">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
