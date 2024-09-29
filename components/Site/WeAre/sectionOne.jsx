import React from "react";
import { useLanguageContext } from "@/context/languageContext";

export default function SectionOne({ background }) {
  const rootStyle = ` flex flex-col  pb-24 pt-4 gap-10 sm:gap-0 sm:flex-row items-center sm:items-en justify-cente sm:justify-cente mx-0 sm:mx-[5%] text-NormalWhite    md:h-auto pb-[2vh] px-[3%] sm:px-[1.5%] mt- ssm:mt-16 sm:mt-0 md:mt-0 lg:mt-0 ${background} `;

  const { language } = useLanguageContext();

  return (
    <div className={rootStyle}>
      <section className=" text-center sm:text-left w-full sm:w-[68%] xl:w-[100%]">
        {/* <div className=" flex justify-center  mb-12 mt-6 ">
          <img
            className=""
            src="https://bluecaribbeanproperties.com/wp-content/uploads/2023/07/blue-values.png"
            alt=""
          />
        </div> */}

        <div>
          <div className=" mt-6 !w-full flex-col  flex items-center justify-center">
            <div class="flex items-center">
              {/* <svg
                class="mr-1 text-bc-blue w-auto h-10 md:h-12 lg:h-16 2xl:h-20"
                width="353"
                height="482"
                viewBox="0 0 353 482"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M351.14 307.14L348.91 306.66C348.606 307.477 348.221 308.261 347.76 309C339.34 319.8 331.34 331 322.3 341.22C314.78 349.76 314.23 349.4 322.49 356.89C312.88 370.98 300.49 382.18 286.05 391.12C260.2 407.12 231.66 414.41 201.69 417.12C196.31 417.61 195.69 414.95 195.57 410.53C195.01 386.72 194.12 362.92 193.48 339.11C191.66 271.85 189.833 204.573 188 137.28C187.86 132.28 189.65 130.76 194.4 130.91C202.483 131.324 210.584 131.257 218.66 130.71C221.45 130.46 225.23 127.91 226.39 125.41C229.34 119.05 224.92 113.29 217.67 113.2C207.9 113.09 198.12 113.2 187.97 113.2C187.5 105.54 187.33 98.78 186.61 92.08C185.61 83.24 188.54 77.44 196.91 73.08C210.91 65.89 218.75 49.27 216.56 34.6C215.353 26.5533 211.702 19.072 206.102 13.1694C200.501 7.26673 193.222 3.22793 185.25 1.6C183.593 1.15335 181.961 0.619266 180.36 0H175.11C170.11 1.64 164.91 2.67 160.34 5C147.34 11.72 139.78 22.6 138.92 37.27C138.02 52.77 144.58 64.99 157.92 72.88C164.92 77.04 168.37 82.23 167.73 90.44C167.373 96.0999 167.33 101.775 167.6 107.44C167.74 111.66 166.13 113.27 161.85 113.15C153.76 112.92 145.66 113 137.57 113.15C131.88 113.25 129.46 116.55 129.48 122.06C129.5 127.57 131.48 130.9 137.48 130.89C144.04 130.89 150.6 130.89 157.17 130.89C167.26 130.89 167.12 130.89 166.87 141.07C165.81 184.123 164.81 227.167 163.87 270.2C162.863 317.18 161.95 364.18 161.13 411.2C161.05 416.09 159.44 418.01 154.64 417.46C149.84 416.91 145.04 416.74 140.29 416.08C108.81 411.74 79.2899 402.08 54.4099 381.69C45.7599 374.6 38.4099 365.89 30.1899 357.6C34.9399 353.37 38.6199 350.22 34.8699 345.03C25.9299 332.7 16.9999 320.29 7.99989 308C7.11989 306.79 5.32989 306.24 3.99989 305.38C3.31989 306.64 2.21989 307.83 1.99989 309.16C-0.680108 328.03 1.36989 346.62 6.26989 364.88C7.75989 370.46 13.0599 371.39 17.6599 367.7C18.7599 366.82 19.8999 365.97 21.6599 364.6C38.8499 395.6 67.0799 413.05 96.8399 428.38C112.31 436.38 128.04 444.23 144.44 449.88C159.84 455.18 171.65 462.41 175.44 479.16C175.656 479.796 176.026 480.369 176.519 480.826C177.011 481.284 177.609 481.612 178.26 481.78C178.907 481.625 179.503 481.308 179.993 480.858C180.483 480.408 180.85 479.841 181.06 479.21C183.28 464.5 192.68 455.55 205.9 451.53C226.64 445.21 245.18 434.63 263.9 424.33C285.43 412.5 306.45 399.93 321.62 379.83C325.4 374.83 329.03 369.71 332.73 364.64C341.51 371.36 346.73 371.07 347.87 363.36C350.19 348.12 351.48 332.7 352.8 317.36C353.17 314 351.77 310.53 351.14 307.14ZM177.7 63.23C164.87 63.23 153.7 51.97 154.01 39.32C154.186 33.144 156.749 27.2768 161.162 22.9521C165.574 18.6273 171.492 16.1819 177.67 16.13C190.59 16.13 201.67 27.23 201.38 39.95C201.09 52.67 190.25 63.23 177.7 63.23Z"
                  fill="currentColor"
                ></path>
              </svg> */}
              <span class="text-5xl lg:text-8xl 2xl:text-[82px] ml-1 lg:ml-2 font-serif uppercase text-bc-navy">
               {language === "en" ? "WHO":"OMS"}
              </span>
            </div>

            <div class="flex items-center">
              <span class="ml-2 w-[65%] flex items-center gap-1 text-2xl text-[#9aea24] lg:text-4xl 2xl:text-5xl font-sans whitespace-nowrap uppercase text-bc-green">
                <img
                  className="h-1 hidden md:block"
                  src="https://bluecaribbeanproperties.com/wp-content/uploads/2023/07/separator-1.png"
                  alt=""
                />
                {language === "en" ? "WE ARE":"NOUS SOMMES"}
              </span>
            </div>


<div>
<div class="wp-block-uagb-advanced-heading font-[300] !text-xl md:!text-[32px] mt-5  mb-[24px] !text-[#16426F]"><section class="uagb-heading-text">
{language === "en" ? "Who We Are":"Qui Nous Sommes"} </section>

{language === "en" ?
<p class="has-text-align-center  !text-[#16426F]  max-w-[900px] text-center my-6">We are real estate specialists, passionate about supporting our clients in their projects, whether it's buying their dream home or selling their property. Our goal is to identify your specific needs in order to provide you with personalized and comprehensive service.</p>
:
<p class="has-text-align-center  !text-[#16426F]  max-w-[900px] text-center my-6">Nous sommes des spécialistes de l'immobilier, passionnés par le soutien à nos clients dans leurs projets, qu'il s'agisse d'acheter leur maison de rêve ou de vendre leur propriété. Notre but est d'identifier vos besoins spécifiques afin de vous fournir un service personnalisé et complet.</p>
}

<section class="uagb-heading-text">{language === "en" ? "What We Do":"Ce Que Nous Faisons"}</section>


{language === "en" ?
<p class="has-text-align-center  !text-[#16426F]  max-w-[900px] text-center my-6">For buyers, we offer tailored support, facilitating your navigation in the real estate market. We help you identify properties that meet your criteria and are committed to securing the best offers for you.
For sellers, we implement effective marketing strategies to optimize your property's visibility. From pricing evaluation to staging advice, our aim is to ensure a smooth and successful sale.
</p>
:
<p class="has-text-align-center  !text-[#16426F]  max-w-[900px] text-center my-6">Pour les acheteurs, nous offrons un soutien adapté, facilitant votre navigation sur le marché immobilier. Nous vous aidons à identifier des propriétés qui répondent à vos critères et nous nous engageons à sécuriser les meilleures offres pour vous.Pour les vendeurs, nous mettons en œuvre des stratégies de marketing efficaces pour optimiser la visibilité de votre propriété. De l'évaluation des prix aux conseils de mise en scène, notre objectif est d'assurer une vente fluide et réussie.
</p>
}

</div>
</div>


          </div>
        </div>

        {/* <h1 className=" px-[5%] sm:px-0 text-[1.3rem] ssm:text-[1.4rem] sm:text-[1.2rem] md:text-[1.3rem] lg:text-[1.5rem] xl:text-[1.7rem] leading-[171%] font-bold ">
        {title}
      </h1>

      <p className="px-[3%] text-justify sm:px-0 text-[0.9rem] sm:text-[0.75rem] md:text-[0.8rem] lg:text-[0.85rem] xl:text-[0.9rem] font-semibold leading-[200%] mt-6 ssm:mt-8   sm:mt-2 md:mt-4 ">
        {text}
      </p> */}
      </section>
    </div>
  );
}
