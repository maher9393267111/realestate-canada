import Breadcrumb from "@/components/components/common/Breadcrumb";
import blogData from "../../data/blog.json";
import Link from "next/link";
import { useRouter } from "next/router";
import Newslatter from "@/components/components/common/Newslatter";
import Footer from "@/components/components/footer/Footer";
import Topbar from "@/components/components/topbar/Topbar";
import Header from "@/components/components/header/Header";
import useBlogs from "@/hooks/useBlogs";
import { ImageEndpoint } from "../../utils/global";
import { useState } from "react";
import { Pagination } from "@material-ui/lab";
import { useLanguageContext } from "@/context/languageContext";
import { CircularLoading as Loading } from "@/components/loading";
import Select from "react-select";
import { handleChange } from "../../utils/handleLanguage";

export const metadata = {
  title: "TripRex - Tour & Travel Agency  NextJs Template",
  description:
    "TripRex is a NextJs Template for Tour and Travel Agency purpose",
  icons: {
    icon: "/assets/img/sm-logo.svg",
  },
};

const BlogsMainpage = ({ search, country }) => {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const { language } = useLanguageContext();
  const [searchstate, setSearch] = useState("");
  const [countrystate, setCountry] = useState({ value: "", label: "" });

  const countries = [
    { value: "", label: "All countries" },

    { value: "Mexico", label: language === "en" ? "Mexico" : "Mexique" },
    {
      value: "North Cyprus",
      label: language === "en" ? "North Cyprus" : "Chypre du Nord",
    },
    { value: "Spain", label: language === "en" ? "Spain" : "Espagne" },
    {
      value: "Republic Dominica",
      label: language === "en" ? "Republic Dominica" : "République Dominique",
    },

    // { value: "Portugal", label: language === 'en' ? " Portugal" : "Portugal"},

    // { value: "Canada", label: language === 'en' ? "Canada" : "Canada"},

    {
      value: "United Arab Emirates",
      label: language === "en" ? "United Arab Emirates" : "",
    },
  ];

  const { data, isLoading, error, mutate } = useBlogs({
    page,

    search,
    country,
  });

  const handlePageChange = (event, value) => {
    if (value === page) return;
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/blogs?search=${searchstate}&country=${countrystate?.value}`);
  };

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleReset = (e) => {
    e.preventDefault();
    router.push(`/blogs`);
    setCountry({ value: "", label: "" });
    setSearch("");
    mutate();
  };

  return (
    <div dir="ltr" className="">
      <Topbar />
      <Header />
      <Breadcrumb pagename={language === 'en' ? "Blog Grid" : "Grille de blog"} pagetitle={language === 'en' ? "Blog Grid" : "Grille de blog"} />
      <div className="blog-details-section pt-120 mb-120">
        <div className="container">
          {isLoading && <Loading />}


<div className="  container bg-white py-12 rounded-md px-4 mb-12">


<div>

<p>
{language === "en" ? "Search Here" : "Rechercher ici"}{" "}
</p>


{/* ---flex search forms-- */}

<div className=" grid grid-cols-1  md:grid-cols-4  gap-4 flex-wrap">


<form onSubmit={handleSearch}>
                    <div className="search-box">
                      <input
                        placeholder={language === "en" ? "Search Here" : "Rechercher ici"}
                        // value={search}
                        onChange={handleSearchInputChange}
                        type="text"
                      />

                  
                    </div>
      
                  </form>


                  <div className=" mt !block">
                    <div className="mb-">
                      {/* <label className="form-label f-6">
                        {language === "en"
                          ? "Select coutry"
                          : "sélectionner un pays"}
                      </label> */}
                      <div className="filte-search-fo position-relativ focus:!border-none filter-borde bg-light">
                        <Select
                          onChange={(newValue) => {
                            setCountry(newValue);
                          }}
                          className="form-inpu  !focus-ring-info filter-input-box !bg-gray-50  border-0"
                          options={countries}
                          placeholder={language === "en" ? "Select" : "Sélectionner"}
                        />
                      </div>
                    </div>
                  </div>

                  <input
                    onClick={handleSearch}
                    type="submit"
                    id="search"
                    name="search"
                    style={{ height: "48px" }}
                    className="btn !h-full !bg-primary !text-white searchbtn w-100"
                    value={language === "en" ? "Search" : "Recherche"}
                    
                  />

                  <input
                    onClick={handleReset}
                    type="submit"
                    id="search"
                    name="search"
                    style={{ height: "48px" }}
                    className="btn !h-full !bg-primary  !text-white searchbtn w-100"
                    value={language === "en" ? "Reset" : "Réinitialiser"}
                    
                  />



</div>

</div>


</div>


          <div className="row mb-7 g-lg-4 gy-5 justify-content-center flex-col-reverse md:!flex-row ">
            <div className=" col-lg-12 row ">
              {data?.books?.map((blog) => {
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
                  <div key={_id} className="col-lg-6 col-md-6 mb-4">
                    <div className="blog-card">
                      <div className="blog-card-img-wrap">
                        <Link href={`/blogs/${_id}`} className="card-img">
                          <img
                            className="!h-[300px] !w-full"
                            src={`${ImageEndpoint}/${image[0]}`}
                            alt=""
                          />
                        </Link>
                        {/* <Link href="/blogs" className="date">
                          <span>
                            <strong>2024</strong> <br />
                          </span>
                        </Link> */}
                      </div>
                      <div className="blog-card-content">
                        <div className="blog-card-content-top">
                          <ul>
                            {/* <li>
                            By <Link href="/blog">Admin</Link>
                          </li> */}
                            <li>
                              <Link href="/blogs">{language ==='en' ? category  : handleChange(category)}</Link>
                            </li>
                          </ul>
                        </div>
                        <h5>
                          <Link href={`/blogs/${_id}`}>
                            {language === "en"
                              ? title?.slice(0, 30)
                              : titlefr?.slice(0, 30)}
                            ....
                          </Link>
                        </h5>
                        <div className="bottom-area">
                          <Link href={`/blogs/${_id}`}>
                          {language === "en" ? "View Post" : "Voir le message"}
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
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={9}
                              height={12}
                              viewBox="0 0 9 12"
                            >
                              <path d="M5.85726 11.3009C7.14547 9.08822 6.60613 6.30362 4.57475 4.68025C4.57356 4.67933 4.57238 4.67818 4.57143 4.6775L4.58021 4.69862L4.57878 4.71446C4.97457 5.72599 4.91905 6.83648 4.43285 7.78924L4.09022 8.461L3.9851 7.71876C3.91368 7.21529 3.71745 6.735 3.41515 6.32382H3.36745L3.3423 6.25495C3.34586 7.02428 3.17834 7.78213 2.8497 8.49704C2.41856 9.43259 2.48191 10.5114 3.01936 11.3833L3.39023 11.9853L2.72299 11.7126C1.62271 11.2628 0.743103 10.3964 0.309587 9.33547C-0.176131 8.15083 -0.0862008 6.77725 0.550429 5.66194C0.882388 5.08179 1.11493 4.46582 1.24187 3.8308L1.36597 3.2084L1.68251 3.76353C1.83366 4.02824 1.94494 4.31476 2.01399 4.61574L2.02111 4.62285L2.02847 4.67107L2.03535 4.669C2.98353 3.45015 3.55158 1.93354 3.6344 0.397865L3.65575 0L4.00076 0.217643C5.4088 1.10544 6.38664 2.52976 6.6887 4.13017L6.69558 4.163L6.69914 4.16805L6.71457 4.14693C6.99053 3.79429 7.13622 3.37485 7.13622 2.93336V2.24967L7.56261 2.7947C8.55398 4.06153 9.06224 5.63301 8.99391 7.21988C8.90991 9.08776 7.85708 10.7272 6.17736 11.6154L5.45008 12L5.85726 11.3009Z" />
                            </svg>
                            5 {language === "en" ? "Min Read" : "min de lecture" }
                          </span>
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
        </div>
      </div>
      <Newslatter />
      <Footer />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const search = context.query.search ? context?.query?.search : "";
  const country = context.query.country ? context?.query?.country : "";

  return {
    props: {
      search: search,
      country: country,
    },
  };
};

export default BlogsMainpage;



{/* <div className="col-lg-4">
<div className="sidebar-area">
  <div className="single-widget mb-30">
    <h5 className="widget-title">
      {language === "en" ? "Search Here" : "Rechercher ici"}{" "}
    </h5>
    <form onSubmit={handleSearch}>
      <div className="search-box">
        <input
          placeholder="Search Here"
          // value={search}
          onChange={handleSearchInputChange}
          type="text"
        />

    
      </div>
    </form>

    <div className=" mt-4 !block">
      <div className="mb-3">
        <label className="form-label fs-6">
          {language === "en"
            ? "Select coutry"
            : "sélectionner un pays"}
        </label>
        <div className="filte-search-fo position-relativ focus:!border-none filter-borde bg-light">
          <Select
            onChange={(newValue) => {
              setCountry(newValue);
            }}
            className="form-inpu  !focus-ring-info filter-input-box !bg-gray-50  border-0"
            options={countries}
          />
        </div>
      </div>
    </div>

    <input
      onClick={handleSearch}
      type="submit"
      id="search"
      name="search"
      style={{ height: "48px" }}
      className="btn !bg-primary !text-white searchbtn w-100"
      value="Search"
    />

    <input
      onClick={handleReset}
      type="submit"
      id="search"
      name="search"
      style={{ height: "48px" }}
      className="btn !bg-primary my-3 !text-white searchbtn w-100"
      value="Reset"
    />
  </div>
</div>
</div> */}