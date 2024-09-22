import React from "react";
import useCountry from "../../hooks/useCountry";
import useCountries from "../../hooks/useCountries";

import { useState , useEffect } from "react";
import { useLanguageContext } from "@/context/languageContext";
import Breadcrumb from "@/components/components/common/Breadcrumb";

import Footer from "@/components/components/footer/Footer";
import Header from "@/components/components/header/Header";
import Topbar from "@/components/components/topbar/Topbar";

import { useRouter } from "next/router";
export default function CountryDetails() {
  const router = useRouter();
  const { language } = useLanguageContext();
  const { id } = router.query;
  const { data } = useCountry({ id });
  const { data: countries, isLoading, error } = useCountries();
  console.log("data -->", countries);

const [currentCountry , setCurrentCountry] = useState(id && id)

  const handleCountryClick = (countryId) => {
    setCurrentCountry(countryId)
    router.push(`/forsale/${countryId}`); // Navigate to the country details page
  };


  useEffect(() => {
    if (id) {
      setCurrentCountry(id); 
    }// Set currentCountry when ID is available
    },[id])


  return (
    <div dir="ltr">
      <Topbar />
      <Header />
      <Breadcrumb
        pagename={language === "en" ? "Country details" : "Détails du country"}
        pagetitle={language === "en" ? "Country details" : "Détails du country"}
      />

{/* ---All countries tab-- */}
<div className=" bg-primary !text-white flex gap-3 font-semibold text-md  flex-wrap md:text-xl  px-3 py-4">
{countries?.map((country,index)=>{
return (
<div onClick={() => handleCountryClick(country._id)} className={` ${country?._id === currentCountry ? 'bg-black' : ''} g-black py-2 px-4 rounded-md cursor-pointer`} key={index}>

  {language=== 'en' ? country?.title : country?.titlefr}



</div>
)



})}

</div>

      <div className=" container mt-12">
        {/* {data?.book?.title} */}

        <div
          className="bg-whit !text-[#100c08]"
          dangerouslySetInnerHTML={{
            __html: language === "en" ? data?.book?.story : data?.book?.storyfr,
          }}
        />
      </div>
    </div>
  );
}
