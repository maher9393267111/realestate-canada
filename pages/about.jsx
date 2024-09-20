
import { useLanguageContext } from "@/context/languageContext";

import useBlogs from "../hooks/useBlogs";
import Breadcrumb from "@/components/components/common/Breadcrumb";
import Newslatter from "@/components/components/common/Newslatter";
import Footer from "@/components/components/footer/Footer";
import Header from "@/components/components/header/Header";
import Topbar from "@/components/components/topbar/Topbar";
import Home2Activities from "@/components/components/activities/Home2Activities";
import Home2Team from "@/components/components/team/Home2Team";
import AboutBlogs from "@/components/Site/AboutBlogs";
import Home2WhyChoose from "@/components/components/whyChoose/Home2WhyChoose";
import Home2About from "@/components/components/about/Home2About";

export const metadata = {
  title: "TripRex - Tour & Travel Agency  NextJs Template",
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
    <div className="" dir="ltr">
      <Topbar />
      <Header />
      <Breadcrumb pagename="About Us" pagetitle="About Us" />
     <AboutBlogs language={language} blogs={data?.books} />
      <Home2About />
      <Home2WhyChoose />
      <Home2Activities />
      <Home2Team />
  
      <Newslatter />
      <Footer />
    </div>
  );
};

export default page;


// import Breadcrumb from "@/components/components/common/Breadcrumb";
// import Newslatter from "@/components/components/common/Newslatter";
// import Footer from "@/components/components/footer/Footer";
// import Header from "@/components/components/header/Header";
// import Topbar from "@/components/components/topbar/Topbar";
// import Home2Activities from "@/components/components/activities/Home2Activities";
// import Home2Team from "@/components/components/team/Home2Team";
// import Home2Blog from "@/components/components/blog/Home2Blog";
// import Home2WhyChoose from "@/components/components/whyChoose/Home2WhyChoose";
// import Home2About from "@/components/components/about/Home2About";
// import useBlogs from "../hooks/useBlogs";
// export const metadata = {
//   title: "TripRex - Tour & Travel Agency  NextJs Template",
//   description:
//     "TripRex is a NextJs Template for Tour and Travel Agency purpose",
//   icons: {
//     icon: "/assets/img/sm-logo.svg",
//   },
// };
// const page = () => {
//     const { data, isLoading, error, mutate } = useBlogs({page:1});


//   return (
//     <>
//       <Topbar />
//       <Header />
//       <Breadcrumb pagename="About Us" pagetitle="About Us" />
//       <Home2Blog />
//       <Home2About />
//       <Home2WhyChoose />
//       <Home2Activities />
//       <Home2Team />
     
//       <Newslatter />
//       <Footer />
//     </>
//   );
// };

// export default page;
