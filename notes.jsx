


"use client";
import React, { useState } from "react";
import Breadcrumb from "@//components/components/common/Breadcrumb";
import RecommendatedPackage from "@/components/components/tourPackage/RecommendatedPackage";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Link from "next/link";
import DestinationActivitis from "@/components/components/destinationSlider/DestinationActivitis";
import DestinationLocationGallery from "@//components/components/destinationSlider/DestinationLocationGallery";

import Header from "@/components/components/header/Header";
import Topbar from "@/components/components/topbar/Topbar";
import useProduct from "../../hooks/useProductDetails";
import useBlogs from "../../hooks/useBlogs";
import useProducts from "../../hooks/useProducts";
import ProjectCard from "@/components/Site/ProjectCard";

import { useRouter } from "next/router";
import { ImageEndpoint } from "../../utils/global";

import { useLanguageContext } from "@/context/languageContext";

import moment from "moment/moment";
import ProjectForm from "../../components/Site/ProjectForm";
import ContactModal from "../../components/Site/ContactModal";

const ProjectDetails = () => {
  const [isOpenimg, setOpenimg] = useState({
    openingState: false,
    openingIndex: 0,
  });

  const router = useRouter();
  const { language } = useLanguageContext();
  const { id } = router.query;
  const { data } = useProduct({ id });
  const { data: blogs } = useBlogs({
    country: data?.book?.country,
  });

  const { data: products } = useProducts({
    page: 1,
    isfeatured: true,
  });

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const images2 = [
    {
      id: 6,
      imageBig: "/assets/img/innerpage/gallery-06.jpg",
    },
    {
      id: 1,
      imageBig: "/assets/img/innerpage/gallery-01.jpg",
    },
    {
      id: 2,
      imageBig: "/assets/img/innerpage/gallery-02.jpg",
    },
    {
      id: 3,
      imageBig: "/assets/img/innerpage/gallery-03.jpg",
    },
    {
      id: 4,
      imageBig: "/assets/img/innerpage/gallery-04.jpg",
    },
    {
      id: 5,
      imageBig: "/assets/img/innerpage/gallery-05.jpg",
    },
  ];

  const images = data?.book?.image?.map((img, index) => {
    return {
      id: index + 1,
      imageBig: `${ImageEndpoint}/${img}`,
      // Add more properties if needed
    };
  });

  console.log("images22", images2, "imagess", images);

  return (
    <div dir="ltr">
      <Header />

      <Breadcrumb
        pagename="Destination Details"
        pagetitle="Destination Details"
      />
    

<div className="destination-details-wrap mb-120 pt-120">
        <div className="container">
          <div className="row g-lg-4 gy-5">
            <div className="col-lg-7">
            <h2>Welcome To Our project</h2>
              <p>

                {language === "en" ? data?.book?.title : data?.book?.titlefr}
              </p>
              <div className="destination-gallery mb-40 mt-40">
                <div className="row g-4">
                  
                
                  {images?.map((img, index) => {
                    return (
                      <div key={index} className="col-lg-5 col-sm-6">
                        <div className="gallery-img-wrap">
                          <img className="h-[400px] w-full md:w-[500px] object-cover md:h-[300px]" src={img?.imageBig} alt="" />
                          <a
                            data-fancybox="gallery-01"
                            onClick={() =>
                              setOpenimg({
                                openingState: true,
                                openingIndex: 1,
                              })
                            }
                          >
                            <i className="bi bi-eye" /> Discover Island
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

          
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    language === "en" ? data?.book?.story : data?.book?.storyfr,
                }}
              ></p>
              <h2>Features</h2>
              <ul>
                {data?.book?.services &&
                  Object.keys(data?.book?.services)?.map((feature, index) => {
                    if (data?.book?.services[feature]) {
                      return <li key={index}>{feature}</li>;
                    }
                  })}
              </ul>

              <ul>
                {data?.book?.features &&
                  Object.keys(data?.book?.features)?.map((feature, index) => {
                    if (data?.book?.features[feature]) {
                      return <li key={index}>{feature}</li>;
                    }
                  })}
              </ul>

             
            </div>
            <div className="col-lg-5">
            <div className="destination-sidebar sidebar-area">
              <div className="destination-info mb-30">
                <div className="single-info">
                  <span>Destination: {data?.book?.country}</span>
                
                </div>
                <div className="single-info">
                  <span>City: {data?.book?.city}</span>
                 
                </div>

                <div className="single-info">
                  <span>
                    Resale: {data?.book?.services?.resale ? "True" : "False"}
                  </span>
                 
                </div>
                <div className="single-info">
                  <span>
                    Lock off: {data?.book?.services ? "True" : "False"}
                  </span>
              
                </div>
                <div className="single-info">
                  <span>Bathrooms: {data?.book?.details?.baths}</span>
               
                </div>
                <div className="single-info">
                  <span>Rooms: {data?.book?.details?.rooms}</span>
                 
                </div>
                <div className="single-info">
                  <span>Beds: {data?.book?.details?.beds}</span>
                  
                </div>

                <div className="single-info">
                  <span>
                    Furnished:{" "}
                    {data?.book?.services?.Furnished ? "True" : "False"}
                  </span>
                
                </div>

                <div className="single-info">
                  <span>Parking Lots: {data?.book?.details?.parkings}</span>
                </div>

                <div className="single-info">
                  <span>Reference: {data?.book?.reference}</span>
                </div>

                <div className="single-info">
                  <span>Condition: {data?.book?.condition}</span>
                </div>

                <div className="mt-3">
                  <ProjectForm />
                </div>

            
                <div className="single-widget mb-30">
                  <h5 className="widget-title">
                    {language === "en" ? "Recent Post" : "Article récent"}
                  </h5>

                  {blogs?.books?.map((blog) => {
                    const {
                      _id,

                      createdAt,

                      image,
                      title,
                      titlefr,
                      story,
                      storyfr,
                      category,

                      // read_time,
                    } = blog;
                    return (
                      <div className="recent-post-widget mb-20">
                        <div className="recent-post-img">
                          <Link href={`/blogs/${_id}`}>
                            <img
                              src={`${ImageEndpoint}/${image[0]}`}
                              // src="/assets/img/innerpage/recent-post-img1.png"
                              alt=""
                            />
                          </Link>
                        </div>

                        <div className="recent-post-content">
                          <Link className=" px-2" href={`/blogs/${_id}`}>
                            20 July, 2023
                          </Link>
                          <Link href={`/blogs?country=${category}`}>
                            {category}
                          </Link>

                          <h6>
                            <Link href={`/blogs/${_id}`}>
                              {language === "en"
                                ? title?.slice(0, 30)
                                : titlefr?.slice(0, 30)}
                              ....
                            </Link>
                          </h6>
                        </div>
                      </div>
                    );
                  })}

 
                </div>
              </div>

              <div className="banner2-car fou">
         
              </div>

              <ContactModal isOpen={isOpen} closeModal={closeModal} />
            </div>
            <section className="projectcard">
              {products?.books && products?.books[0] && (
                <ProjectCard
                  openModal={openModal}
                  isfeaturepage={true}
                  hieght={300}
                  blog={products?.books[0]}
                  language={language}
                />
              )}
            </section>
          </div>

            


          </div>
        </div>
      </div>


      {images && images?.length && (
        <Lightbox
          className="img-fluid"
          open={isOpenimg.openingState}
          plugins={[Fullscreen]}
          index={isOpenimg.openingIndex}
          close={() => setOpenimg(false)}
          styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
          slides={images?.map(function (elem) {
            return { src: elem.imageBig };
          })}
        />
      )}
    </div>
  );
};

export default ProjectDetails;
