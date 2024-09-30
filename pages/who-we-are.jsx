import React from "react";
import SectionOne from "../components/Site/WeAre/sectionOne";
import SectionTwo from "../components/Site/WeAre/sectionTwo";
import SectionThree from "../components/Site/WeAre/sectionThree";
import ContactCountries from "../components/Site/contactCountries"




import Footer from "@/components/components/footer/Footer";
import Header from "@/components/components/header/Header";
import Breadcrumb from "@/components/components/common/Breadcrumb";
import { useLanguageContext } from "@/context/languageContext";
import TeamCard from "@/components/Site/TeamCard";
import { teamData } from "@/data/team";

export default function WhoWeArea() {
  const { language } = useLanguageContext();

  return (
    <div dir="ltr" className=" !text-[#3a3a3a]">
      <Header />
      <Breadcrumb
        pagename={language === "en" ? "Who we are" : "Qui nous sommes"}
        pagetitle={language === "en" ? "Who we are" : "Qui nous sommes"}
      />

      <SectionOne background="section-1-hero" />

      <SectionTwo background="section-2-hero" />
      <SectionThree />


      <div className="guide-section pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-4 gy-5">
            {teamData.map((member, index) => (
              <div key={index} className="col-xl-3 col-lg-4 col-sm-6">
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactCountries/>

      <Footer />
    </div>
  );
}
