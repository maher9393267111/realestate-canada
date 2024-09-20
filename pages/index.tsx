

import Home2About from "../components/components/about/Home2About";
// import Home2Activities from "../components/components/activities/Home2Activities";
import Home2Banner from "../components/components/banner/Home2Banner";
import Home2Banner2 from "../components/components/banner/Home2Banner2";
import Home2Blog from "../components/components/blog/Home2Blog";
import Home2Destinationslide from "../components/components/destinationSlider/Home2Destinationslide";
import Footer from "../components/components/footer/Footer";
import Header from "../components/components/header/Header";
import Home2Team from "../components/components/team/Home2Team";
import Home2Testimonial from "../components/components/testimonial/Home2Testimonial";
import Home2ThrillingTour from "../components/components/tourPackage/Home2ThrillingTour";
import Home2VideoSection from "../components/components/videoSection/Home2VideoSection";
import Home2WhyChoose from "../components/components/whyChoose/Home2WhyChoose";

import CountriesSlider from '@/components/Site/CountriesSlider'
import ProjectsOfferSlider from "@/components/Site/ProjectsOfferSlider"
import ServicesTabs from '@/components/Site/ServicesTabs'
import useBlogs from "../hooks/useBlogs";
import AboutBlogs from "@/components/Site/AboutBlogs";
import { useLanguageContext } from "@/context/languageContext";


import React from "react";
export const metadata = {
  title: "TripRex - Tour & Travel Agency  NextJs Template ",
  description:
    "TripRex is a NextJs Template for Tour and Travel Agency purpose",
  icons: {
    icon: "/assets/img/sm-logo.svg",
  },
};
const page = () => {

  const { data, isLoading, error, mutate } = useBlogs({page:1});
  const { language } = useLanguageContext();


  return (
    <div dir="ltr">
    <Header />
      <Home2Banner />
      <CountriesSlider/>
    <ProjectsOfferSlider/>
    <AboutBlogs language={language} blogs={data?.books} />
    <ServicesTabs/>
     
      <Home2About />

      {/* <Home2Activities /> */}
      <Home2WhyChoose />
      <Home2Testimonial />
      <Home2Team />
      <Home2VideoSection />
    
      <Home2Banner2 />
      <Footer style="style-2" />
    </div>
  );
};

export default page;
