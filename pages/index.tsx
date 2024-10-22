import React, { Suspense, lazy, useMemo } from "react";
import Header from "../components/components/header/Header";
import Header2 from "../components/components/header/Header2";
import Footer from "../components/components/footer/Footer";
import useBlogs from "../hooks/useBlogs";
import { useLanguageContext } from "@/context/languageContext";
import { SWRConfig } from 'swr';

// Lazy load components
const Home2Banner = lazy(() => import("../components/components/banner/Home2Banner"));
const CountriesSlider = lazy(() => import('@/components/Site/CountriesSlider'));
const ProjectsOfferSlider = lazy(() => import("@/components/Site/ProjectsOfferSlider"));
const AboutBlogs = lazy(() => import("@/components/Site/AboutBlogs"));
const ServicesTabs = lazy(() => import('@/components/Site/ServicesTabs'));
const Home2About = lazy(() => import("../components/components/about/Home2About"));
const Home2WhyChoose = lazy(() => import("../components/components/whyChoose/Home2WhyChoose"));
const Home2Testimonial = lazy(() => import("../components/components/testimonial/Home2Testimonial"));
const Home2Team = lazy(() => import("../components/components/team/Home2Team"));
const Home2VideoSection = lazy(() => import("../components/components/videoSection/Home2VideoSection"));
const Home2Banner2 = lazy(() => import("../components/components/banner/Home2Banner2"));

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

  // Memoize props to avoid unnecessary re-renders
  const memoizedBlogs = useMemo(() => data?.books, [data]);

  return (
    <SWRConfig value={{ shouldRetryOnError: false, revalidateOnFocus: false }}>
      <div dir="ltr">
        <Suspense fallback={

<div className="flex justify-center items-center h-screen">
<div className="loader"></div>
          </div>
        }>
          <Header2 />
          <Home2Banner />
          <CountriesSlider />
          <ProjectsOfferSlider />
          <AboutBlogs language={language} blogs={memoizedBlogs} />
          <ServicesTabs />
          <Home2About />
          <Home2WhyChoose />
          <Home2Testimonial />
          <Home2Team />
          <Home2VideoSection />
          <Home2Banner2 />
          <Footer style="style-2" />
        </Suspense>
      </div>
    </SWRConfig>
  );
};

export default page;
