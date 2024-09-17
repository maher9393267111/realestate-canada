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
import "bootstrap/dist/css/bootstrap.min.css"; 



 import "../public/assets/css/dashboard.css";

import type { AppProps } from "next/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "@/site-settings/theme";
import RTL from "@/site-settings/RTL";
import { IntlProvider } from "react-intl";
import msgs from "@/site-settings/site-translations";
import Head from 'next/head';

import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import NextNProgress from "nextjs-progressbar";
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

  // const { translation } = useTranslation()

  // const t = useMemo(() => translation ?? {}, [translation])

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
   
    <>

<Head>
          
         
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
            integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
            crossOrigin="anonymous"
          />
          <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
            integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
            crossOrigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"
            integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T"
            crossOrigin="anonymous"
          />
        </Head>


      {!isSSR && (
       
        

          

          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
          
       
      )}
    </>
 
  );
}

// App.propTypes = {
//   Component: PropTypes.elementType.isRequired,
//   pageProps: PropTypes.object.isRequired,
// };
