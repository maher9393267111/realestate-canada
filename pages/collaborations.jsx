import Breadcrumb from "@/components/components/common/Breadcrumb";
import Footer from "@/components/components/footer/Footer";
import Header from "@/components/components/header/Header";
import TeamCard from '@/components/Site/TeamCard'
import {teamData} from '@/data/team'

export const metadata = {
  title: "TripRex - Tour & Travel Agency  NextJs Template",
  description:
    "TripRex is a NextJs Template for Tour and Travel Agency purpose",
  icons: {
    icon: "/assets/img/sm-logo.svg",
  },
};

const Team = () => {
  return (
    <div dir="ltr">

<Header/>
      <Breadcrumb pagename="Our Guide" pagetitle="Our Guide" />
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
    </div>
  );
};

export default Team;
