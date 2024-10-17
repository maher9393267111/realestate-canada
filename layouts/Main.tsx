import React from 'react';
import Head from "next/head";
import { Container } from "semantic-ui-react";
import Footer from "./partials/Footer";
// import GoTop from './GoTop';
// import Header from "./partials/";


const Layout = ({ children }) => {
    
  return (
    <React.Fragment>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
            <title> Sand n Sea Store</title>
            <meta name="description" content="Buy high-quality products  and save money  " />
            <meta name="og:title" property="og:title" content="Sand n Sea -  eCommerce Store"></meta>
            <meta name="twitter:card" content="Sand n Sea ecommerce Store"></meta>
            {/* <link rel="canonical" href="https://shoponix.envytheme.com/"></link> */}
            {/* <meta property="og:image" content="https://res.cloudinary.com/dev-empty/image/upload/v1590078952/qlm6qb1hzxd6iccmaf82.jpg" /> */}
        </Head>
        
        {/* <Header  /> */}
            {/* <Container fluid> */}
            <div className='    !w-[100%]'>

              {children}

            </div>
                
            {/* </Container> */}
        {/* <Footer  /> */}
        {/* <GoTop scrollStepInPx="100" delayInMs="10.50" /> */}
    </React.Fragment>
  );
}

export default Layout;



