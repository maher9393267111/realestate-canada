import Breadcrumb from "@/components/components/common/Breadcrumb";
import blogData from "../../data/blog.json";
import Link from "next/link";
import Newslatter from "@/components/components/common/Newslatter";
import Footer from "@/components/components/footer/Footer";
import Topbar from "@/components/components/topbar/Topbar";
import Header from "@/components/components/header/Header";
//header2
import Header2 from "@/components/components/header/Header2";
import useBlogs from "@/hooks/useServices";
import { ImageEndpoint } from "../../utils/global";
import { useState } from "react";
import { Pagination } from "@material-ui/lab";
import { useLanguageContext } from "@/context/languageContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Suspense, lazy } from "react";

export const metadata = {
  title: "TripRex - Tour & Travel Agency  NextJs Template",
  description:
    "TripRex is a NextJs Template for Tour and Travel Agency purpose",
  icons: {
    icon: "/assets/img/sm-logo.svg",
  },
};

const BlogsMainpage = () => {
  const { language } = useLanguageContext();
  const [page, setPage] = useState(1);

  const { data, isLoading, error, mutate } = useBlogs({
    page,

    search: "",
  });

  const handlePageChange = (event, value) => {
    if (value === page) return;
    setPage(value);
  //  window.scrollTo(0, 0);
  };

  const renderPagination = () => {
    const totalPages = data?.pages || 1;
    const maxVisiblePages = 4;
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= maxVisiblePages - 1) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (page > totalPages - maxVisiblePages + 1) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return (
      <div className="flex justify-center items-center space-x-2" style={{ maxWidth: '300px', margin: '0 auto' }}>
        <button
          onClick={() => handlePageChange(null, Math.max(1, page - 1))}
          className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 ${
            page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-green-500 hover:bg-green-100'
          }`}
          disabled={page === 1}
        >
          <ArrowBackIcon />
        </button>
        {pages.map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => typeof pageNumber === 'number' && handlePageChange(null, pageNumber)}
            className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 ${
              pageNumber === page ? 'bg-green-500 text-white' : 'text-green-500 hover:bg-green-100'
            } ${pageNumber === '...' ? 'cursor-default' : ''}`}
            disabled={pageNumber === '...'}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(null, Math.min(totalPages, page + 1))}
          className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 ${
            page === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-green-500 hover:bg-green-100'
          }`}
          disabled={page === totalPages}
        >
          <ArrowForwardIcon />
        </button>
      </div>
    );
  };

  return (
    <Suspense fallback={<div>
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    </div>
    }>
    <div dir="ltr" className="">
      <Topbar />
      <Header2 />
      <Breadcrumb pagename="Service Grid" pagetitle="Service Grid" />
      <div className="blod-grid-section pt-120 mb-120">
        <div className="container">
          <div className="row g-md-4 gy-5 mb-70">
            {data?.books?.map((blog) => {
              const {
                _id,

                createdAt,

                image,
                title,
                titlefr,
                subtitle,
                story,
                storyfr,
                category,
                // read_time,
              } = blog;
              return (
                <div key={_id} className="col-lg-4 col-md-6">
                  <div className="blog-card">
                    <div className="blog-card-img-wrap">
                      <Link href={`/services/${_id}`} className="card-img">
                        <img 
                         className="  !w-full !h-[360px] "
                         src={`${ImageEndpoint}/${image[0]}`} alt="" />
                      </Link>
                      {/* <Link href="/services" className="date">
                        <span>
                          <strong>2024</strong> <br />
                         
                        </span>
                      </Link> */}
                    </div>
                    <div className="blog-card-content">
                      <div className="blog-card-content-top">
                        {/* <ul>
                          <li>
                            By <Link href="/blog">Admin</Link>
                          </li>
                          <li>
                            <Link href={`/services/${_id}`}>{category}</Link>
                          </li>
                        </ul> */}
                      </div>
                      <h5>
                        <Link href={`/services/${_id}`}>
                          {language === "en" ? title : titlefr}
                        </Link>
                      </h5>
                      <div className="bottom-area">
                        <Link href={`/services/${_id}`}>
                          {language === "en"
                            ? "Learn More"
                            : "Découvrir davantage"}
                          {/* Découvrir davantage */}
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={14}
                              height={12}
                              viewBox="0 0 14 12"
                              fill="none"
                            >
                              <path
                                d="M2.07617 8.73272L12.1899 2.89355"
                                strokeLinecap="round"
                              />
                              <path
                                d="M10.412 7.59764L12.1908 2.89295L7.22705 2.08105"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                        </Link>
                        {/* <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={9}
                            height={12}
                            viewBox="0 0 9 12"
                          >
                            <path d="M5.85726 11.3009C7.14547 9.08822 6.60613 6.30362 4.57475 4.68025C4.57356 4.67933 4.57238 4.67818 4.57143 4.6775L4.58021 4.69862L4.57878 4.71446C4.97457 5.72599 4.91905 6.83648 4.43285 7.78924L4.09022 8.461L3.9851 7.71876C3.91368 7.21529 3.71745 6.735 3.41515 6.32382H3.36745L3.3423 6.25495C3.34586 7.02428 3.17834 7.78213 2.8497 8.49704C2.41856 9.43259 2.48191 10.5114 3.01936 11.3833L3.39023 11.9853L2.72299 11.7126C1.62271 11.2628 0.743103 10.3964 0.309587 9.33547C-0.176131 8.15083 -0.0862008 6.77725 0.550429 5.66194C0.882388 5.08179 1.11493 4.46582 1.24187 3.8308L1.36597 3.2084L1.68251 3.76353C1.83366 4.02824 1.94494 4.31476 2.01399 4.61574L2.02111 4.62285L2.02847 4.67107L2.03535 4.669C2.98353 3.45015 3.55158 1.93354 3.6344 0.397865L3.65575 0L4.00076 0.217643C5.4088 1.10544 6.38664 2.52976 6.6887 4.13017L6.69558 4.163L6.69914 4.16805L6.71457 4.14693C6.99053 3.79429 7.13622 3.37485 7.13622 2.93336V2.24967L7.56261 2.7947C8.55398 4.06153 9.06224 5.63301 8.99391 7.21988C8.90991 9.08776 7.85708 10.7272 6.17736 11.6154L5.45008 12L5.85726 11.3009Z" />
                          </svg>
                         5 Min Read
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="row">
            <div className="col-lg-12">
              <nav className="inner-pagination-area text-center">
                {renderPagination()}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Newslatter />
      <Footer />
    </div>
    </Suspense>
  );
};

export default BlogsMainpage;
