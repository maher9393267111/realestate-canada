import React, { useMemo, useEffect, useState } from "react";

import "@/styles/globals.css";
// import '../public/semantic.min.css';

import "../public/assets/css/bootstrap-icons.css";
import "../public/assets/css/all.min.css";
import "../public/assets/css/boxicons.min.css";
import "../public/assets/css/fontawesome.min.css";
import "../public/assets/css/swiper-bundle.min.css";
import "../public/assets/css/nice-select.css";
import "react-modal-video/css/modal-video.css";
import "../public/assets/css/slick-theme.css";
import "../public/assets/css/slick.css";
import "../public/assets/css/bootstrap-datetimepicker.min.css";
import "react-datepicker/dist/react-datepicker.css";
 import "../public/assets/css/bootstrap.min.css";
import "yet-another-react-lightbox/styles.css";
import "../public/assets/css/style.css";
import "../public/assets/sass/main.scss";

import "../public/assets/css/dashboard.css";


import type { AppProps } from "next/app";
import CssBaseline from "@material-ui/core/CssBaseline";
 import { ThemeProvider } from "@material-ui/core/styles";
 import theme from "@/site-settings/theme";
import RTL from "@/site-settings/RTL";
import { IntlProvider } from "react-intl";
import msgs from "@/site-settings/site-translations";
import Head from "next/head";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import NextNProgress from "nextjs-progressbar";
import { ChakraProvider } from '@chakra-ui/react'
// import themechakra from "@/site-settings/chakra/theme";
import {
  LanguageProvider,
  useLanguageContext,
} from "@/context/languageContext";

// import { useTranslation } from '@/context/useTranslation'
export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);


  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <>
      <Head>

      <Script id="1"  strategy='lazyOnload' src={`https://code.jquery.com/jquery-3.3.1.slim.min.js`}  />
    <Script id="1"  strategy='lazyOnload' src={`https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js`}  />
    <Script id="1"  strategy='lazyOnload' src={`https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js`}  />
    <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"></Script>


      </Head>

      {!isSSR && (
        <ThemeProvider 
         theme={theme}
        
        >

        {/* <ChakraProvider  */}
        {/* //   theme={themechakra}
        // > */}
          
          <LanguageProvider>
            <IntlProvider locale="en" messages={msgs["en"]}>
              {/* <RTL> */}
              <CssBaseline />
              {/* <MainLayout> */}

              <Component {...pageProps} />

              <Analytics />
              {/* </MainLayout> */}

              {/* </RTL> */}
            </IntlProvider>
          </LanguageProvider>
          <NextNProgress
            color="#a38579"
            startPosition={0.2}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          {/* //  </ChakraProvider>  */}

         </ThemeProvider>
      )}
    </>
  );
}

// App.propTypes = {
//   Component: PropTypes.elementType.isRequired,
//   pageProps: PropTypes.object.isRequired,
// };
