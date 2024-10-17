import Breadcrumb from "@/components/components/common/Breadcrumb";
import Newslatter from "@/components/components/common/Newslatter";
import Footer from "@/components/components/footer/Footer";
import Header from "@/components/components/header/Header";
import Topbar from "@/components/components/topbar/Topbar";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import useProducts from "@/hooks/useProducts";
import FilterForm from "../../components/Site/dashboardLayout/FilterForm";
import ProjectCard from "../../components/Site/ProjectCard";
import { ImageEndpoint } from "../../utils/global";
import { useState } from "react";
import { Pagination } from "@material-ui/lab";
import { useLanguageContext } from "@/context/languageContext";

const Projects = ({
  country,
  baths,
  rooms,
  minPrice,
  maxPrice,
  type,
  city,
  beds,
  condition,
  lockoff,
  resale
}) => {
  const router = useRouter;
  const { query } = router;

  const { language } = useLanguageContext();

  console.log(query, "Query data");

  const [page, setPage] = useState(1);

  const { mutate, data } = useProducts({
    page,
    country,
    baths,
    rooms,
    minPrice,
    maxPrice,
    type,
    city,
    beds,
    condition,
    lockoff,
    resale
  });

  const handlePageChange = (event, value) => {
    if (value === page) return;
    setPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <div dir="ltr" className="">
      <Topbar />
      <Header />
      <Breadcrumb  pagename={language === "en" ? "Projects Grid" : "Grille des projets"} pagetitle={language === "en" ? "Projects Grid":"Grille des projets"}/>
      
      <FilterForm isProjectsPage={true} />
      <div className="package-grid-with-sidebar-section pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-4 gy-5">
            <div className="col-lg-12">
              <div className="list-grid-product-wrap mb-70 ">
                <div className="row gy-4">
                  {data?.books?.map((blog) => {
                    return <ProjectCard isProjectsPage={true} language={language} blog={blog} />;
                  })}
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <nav className="inner-pagination-area !text-center  !flex !justify-center">
                    <Pagination
                      dir="rtl"
                      className=""
                      onChange={(e, i) => {
                        handlePageChange(e, i);
                      }}
                      count={data?.pages}
                      defaultPage={page}
                      page={page}
                      siblingCount={0}
                      shape="rounded"
                      color="primary"
                      showFirstButton
                      showLastButton
                    />
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Newslatter />
      <Footer />
    </div>
  );
};

export default Projects;

export const getServerSideProps = async (context) => {
  const { baths, rooms, beds, minPrice, maxPrice, country, type, city } =
    context.query;

   const condition= context?.query?.condition ? context?.query?.condition : "";
   const resale= context?.query?.resale ? context?.query?.resale : "";

   const lockoff= context?.query?.lockoff ? context?.query?.lockoff : "";

   //lockoff

  // const baths = context?.query?. ? context?.query?.baths :0;

  // const searchTerm = context?.query?.country ? context?.query?.country : 0;

  // const searchTerm = context?.query?.country ? context?.query?.country : "";

  // const searchTerm = context?.query?.country ? context?.query?.country : "";

  // const searchTerm = context?.query?.country ? context?.query?.country : "";

  return {
    props: {
      country: country,
      city: city,
      baths: baths,
      rooms: rooms,
      minPrice: minPrice,
      maxPrice: maxPrice,
      type: type,
      beds: beds,
      condition:condition,
      resale,
      lockoff
    },
  };
};
