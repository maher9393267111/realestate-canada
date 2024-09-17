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
      <Breadcrumb pagename="Package Grid" pagetitle="Package Grid" />

      <FilterForm />
      <div className="package-grid-with-sidebar-section pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-4 gy-5">
            <div className="col-lg-12">
              <div className="list-grid-product-wrap mb-70">
                <div className="row gy-4">
                  {data?.books?.map((blog) => {
                    const {
                      _id,

                      createdAt,

                      cover,
                      image,
                      title,
                      story,
                      storyfr,
                      category,
                      country,
                      city,
                      area,
                      features,
                      details,
                      price,

                      // read_time,
                    } = blog;
                    return (
                      <div className="col-md-4 item">
                        <div className="package-card">
                          <div className="package-card-img-wrap">
                            <Link
                              href={`/projects/${_id}`}
                              className="card-img"
                            >
                              <img src={`${ImageEndpoint}/${cover}`} alt="" />

                              {/* <img
                             src="/assets/img/home1/package-card-img1.png"
                            alt=""
                          /> */}
                            </Link>
                          </div>
                          <div className="package-card-content">
                            <div className="card-content-top">
                              <h5>
                                <Link href={`/projects/${_id}`}>{title}</Link>
                              </h5>
                              <div className="location-area">
                                <ul className="location-list scrollTextAnimation">
                                  <li>
                                    <Link href="/package">{country}</Link>
                                  </li>
                                  <li>
                                    <Link href="/package">{city}</Link>
                                  </li>
                                  <li>
                                    <Link href="/package">{area}</Link>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            {/* <div className=" flex gap-2">
<p>Beds {details?.beds}</p>
                                <p>Rooms {details?.rooms}</p>

                                <p>baths {details?.baths}</p>
</div> */}

                            <div className="location-area ">
                              <ul className="!flex w-2/3  text-[#888] !gap-3 !justify-between containe ">
                                <li>Rooms {details?.rooms}</li>
                                <li>Beds {details?.beds}</li>
                                <li>Baths {details?.baths}</li>
                              </ul>
                            </div>

                            <div className="card-content-bottom">
                              <div className="price-area ">
                                <span>${price}</span>
                              </div>

                              <Link
                                href={`/projects/${_id}`}
                                className="primary-btn2"
                              >
                                Project Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
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

              {/* <div className="row">
                <div className="col-lg-12">
                  <nav className="inner-pagination-area">
                    <ul className="pagination-list">
                      <li>
                        <a href="#" className="shop-pagi-btn">
                          <i className="bi bi-chevron-left" />
                        </a>
                      </li>
                      <li>
                        <a href="#">1</a>
                      </li>
                      <li>
                        <a href="#" className="active">
                          2
                        </a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="bi bi-three-dots" />
                        </a>
                      </li>
                      <li>
                        <a href="#">6</a>
                      </li>
                      <li>
                        <a href="#" className="shop-pagi-btn">
                          <i className="bi bi-chevron-right" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div> */}
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

  // const searchTerm = context?.query?.country ? context?.query?.country : "";
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
    },
  };
};
