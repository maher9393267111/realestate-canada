import React from "react";
import { useLanguageContext } from "@/context/languageContext";
export default function ProductsHero({ title, text, background }) {
  const rootStyle = ` flex flex-col pb-4 gap-10 sm:gap-0 sm:flex-row items-center sm:items-en justify-cente sm:justify-cente mx-0 sm:mx-[5%] text-NormalWhite    md:h-auto pb-[2vh] px-[3%] sm:px-[1.5%] mt- ssm:mt-16 sm:mt-0 md:mt-0 lg:mt-0 ${background} `;

  const { language } = useLanguageContext();
  return (
    <div className={rootStyle}>
      <section className=" text-center sm:text-left w-full sm:w-[70%] md:w-[100%] ">
        <div className=" flex justify-center  mb-12 mt-6 text-4xl ">
          {/* <img
            className=""
            src="https://bluecaribbeanproperties.com/wp-content/uploads/2023/07/blue-values.png"
            alt=""
          /> */}
           {language === "en" ? "Sand n Sea Realty Values":"Valeurs de Sand n Sea Realty"}
        </div>

        <div>
          <div className="flex gap-4 flex-col md:flex-row justify-between px-6 md:px-12 container flex-wrap">
            <p className="m-t flex gap-1 md:w-1/2 lg:w-1/4">
              <span>
                {/* <img
                  src="https://bluecaribbeanproperties.com/wp-content/uploads/2023/07/ai-check-icon-1-1.png"
                  alt=""
                /> */}
                <img
                  src="/checkmark-aboutpage.png"
                  alt=""
                  className="w-11 h-9"
                />
              </span>
              {language === "en" ? "Be Honest":"Soyez Honnête"} 
            </p>

            <p className="m-t flex gap-1 md:w-1/3 lg:w-1/4 ">
              <span>
              <img
                  src="/checkmark-aboutpage.png"
                  alt=""
                  className="w-11 h-9"
                />
              </span>
              {language === "en" ? "Be Integrity":"Soyez Intègre"} 
            </p>

            <p className="m-t flex gap-1 md:w-1/2 lg:w-1/4">
              <span>
              <img
                  src="/checkmark-aboutpage.png"
                  alt=""
                  className="w-11 h-9"
                />
              </span>
             <span className="1md:text-[20px] !font-rubik lg:text-[21px] xl:text-[20px]"> {language === "en" ? "Be Respect":"Soyez Respectueux"} </span>
            </p>
            <p className="m-t flex gap-1 md:w-1/3 lg:w-1/4">
              <span>
              <img
                  src="/checkmark-aboutpage.png"
                  alt=""
                  className="w-11 h-9"
                />
              </span>
            <span className="md1:text-[20px] !font-rubik lg:text-[21px] xl:text-[20px]">  {language === "en" ? "Be Customer-Oriented":"Soyez Orienté Client"} </span>
            </p>
            <p className="m-t flex gap-1 md:w-1/2 lg:w-1/4  ">
              <span>
              <img
                  src="/checkmark-aboutpage.png"
                  alt=""
                  className="w-11 h-9"
                />
              </span>
             <span className="md:text-[20px lg:text-[21px] xl:text-2xl">{language === "en" ? "Be Collaboration":"Soyez Collaboratif"}</span>
            </p>
            <p className="m-t flex gap-1 md:w-1/3 lg:w-1/4">
              <span>
              <img
                  src="/checkmark-aboutpage.png"
                  alt=""
                  className="w-11 h-9"
                />
              </span>
              {language === "en" ? "Be Expertise":"Soyez Expert"} 
            </p>
            <p className="m-t flex gap-1 md:w-1/2 lg:w-1/4">
              <span>
              <img
                  src="/checkmark-aboutpage.png"
                  alt=""
                  className="w-11 h-9"
                />
              </span>
              {language === "en" ? "Be Innovation":"Soyez Innovant"} 
            </p>
            <p className="m-t flex gap-1 md:w-1/3 lg:w-1/4">
              <span>
              <img
                  src="/checkmark-aboutpage.png"
                  alt=""
                  className="w-11 h-9"
                />
              </span>
              {language === "en" ? "Be Yourself":"Soyez Vous-même"}   
            </p>
            <p className="m-t flex gap-1 md:w-1/3 lg:w-1/4">
              <span>
              <img
                  src="/checkmark-aboutpage.png"
                  alt=""
                  className="w-11 h-9"
                />
              </span>
              {language === "en" ? "Be Humble":"Soyez Humble"}   
            </p>
            <p className="m-t flex gap-1 md:w-1/3 lg:w-1/4">
              <span>
                <img
                  src="/checkmark-aboutpage.png"
                  alt=""
                  className="w-11 h-9"
                />
              </span>
              <span className="1md:text-[20px] lg:text-[21px]"> {language === "en" ? "Be Sand n Sea Realty":"Soyez Sand n Sea Realty"}   </span>
            </p>
          </div>

          <div  className=" mt-16 !w-full">
            <p style={{fontfamily:  'Rubik' }} className=" !text-[#16426F] text-2xl   md:!text-[36px] !font-rubik  ">
            {language === "en" ? "We'll exceed your expectations":"Nous dépasserons vos attentes"}  
            </p>
            <p  style={{fontfamily: "Rubik"}}  className="!text-[#16426F] font-bold text-xl md:!mt-3 md:pt-3 !font-rubik md:!text-[36px]">
            {language === "en" ? "GUARANTEED":"GARANTI"}       
            </p>

            <div className=" flex pb-5  justify-center m-6">
              <img
                src="https://bluecaribbeanproperties.com/wp-content/uploads/2023/07/separator-1.png"
                alt=""
              />
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
