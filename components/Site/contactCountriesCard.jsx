import React from "react";
import { useLanguageContext } from "@/context/languageContext";


export default function OurCoreItem({ item }) {

  
  const { language } = useLanguageContext();

  return (
    <div className="flex flex-col items-center ">

 {item?.svg}



      {/* <item.icon className="text-8xl text-primary mb-3" /> */}

      <div className="text-center text-xl mb-1  ">
        <span className=" font-semibold">{language === "en" ? item.title : item.titlefr}</span>
      </div>

      <p className="text-center text-md text-secondar !text-[#16426F] font-semibold">{item.description}</p>
    </div>
  );
}