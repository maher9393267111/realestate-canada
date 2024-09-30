import React from "react";
import ProductsHero from "@/components/Site/Hero";
import Footer from "@/components/components/footer/Footer";
import Header from "@/components/components/header/Header";
import Breadcrumb from "@/components/components/common/Breadcrumb";
import { useLanguageContext } from "@/context/languageContext";
import TeamCard from '@/components/Site/TeamCard'
import {teamData} from '@/data/team'

export default function Meetteam() {
  const { language } = useLanguageContext();

  return (
    <div dir="ltr" className=" !text-[#3a3a3a] !font-rubik ">
      <Header />
      <Breadcrumb
        pagename={language === "en" ? "Meet The Team" : "Rencontrez l'équipe"}
        pagetitle={language === "en" ? "Meet The Team" : "Rencontrez l'équipe"}
      />

    <ProductsHero
        title="Automotive Gas Oil - Diesel"
        background="automotive-hero"
        text="Vaspack Energy Limited is an indigenous downstream company in the Oil & Gas sector with interests in procurement, marketing and distribution of Petroleum Products (Automotive Gas Oil (AGO), Premium Motor Spirit (PMS) and Liquefied Petroleum Gas (LPG); using innovative technology."
      />

<div className="guide-section pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-4 gy-5">

          {teamData.map((member, index) => (

            <div key={index} className="col-xl-3 col-lg-4 col-sm-6">
            <TeamCard member={member}/>
            </div>
          ))}
      
          </div>
        </div>
      </div>


<Footer/>




    </div>
  );
}
