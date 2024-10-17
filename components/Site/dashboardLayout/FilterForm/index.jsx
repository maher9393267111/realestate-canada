import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/router";

// import { Empty, Select, Slider } from 'antd';
import Select from "react-select";
import useCountries from "@/hooks/useCountries";
import useCities from "@/hooks/useCities";

import { useLanguageContext } from "@/context/languageContext";

export default function FilterForm({ home = false , isProjectsPage = false }) {
  const router = useRouter();
  const { data, isLoading, error } = useCountries();

  const countries = data?.map((country) => ({
    label: country.title,
    value: country.title,
  }));

  const { data: citiesData } = useCities();
  const { language } = useLanguageContext();

  const categories = [
    { value: "house", label: language === "en" ? "Houses" : "Maisons" },
    {
      value: "apartment",
      label: language === "en" ? "Apartment" : "Appartement",
    },
    { value: "office", label: language === "en" ? "Offices" : "Bureaux" },
    {
      value: "town",
      label: language === "en" ? "Townhome" : "Maison de ville",
    },
    { value: "villa", label: language === "en" ? "Villa" : "Villa" },
  ];

  const rooms = [
    { value: 1, label: language === "en" ? "+1 Room" : "+1 Chambre" },
    { value: 2, label: language === "en" ? "+2 Room" : "+2 Chambre" },
    { value: 3, label: language === "en" ? "+3 Room" : "+3 Chambre" },
    { value: 4, label: language === "en" ? "+4 Room" : "+4 Chambre" },
    { value: 5, label: language === "en" ? "+5 Room" : "+5 Chambre" },
    { value: 6, label: language === "en" ? "+6 Room" : "+6 Chambre" },
    { value: 7, label: language === "en" ? "+7 Room" : "+7 Chambre" },
  ];

  const baths = [
    { value: 1, label: language === "en" ? "+1 Bathroom" : "+1 salle de bain" },
    { value: 2, label: language === "en" ? "+2 Bathroom" : "+2 salle de bain" },
    { value: 3, label: language === "en" ? "+3 Bathroom" : "+3 salle de bain" },
    { value: 4, label: language === "en" ? "+4 Bathroom" : "+4 salle de bain" },
    { value: 5, label: language === "en" ? "+5 Bathroom" : "+5 salle de bain" },
    { value: 6, label: language === "en" ? "+6 Bathroom" : "+6 salle de bain" },
    { value: 7, label: language === "en" ? "+7 Bathroom" : "+7 salle de bain" },
  ];

  const beds = [
    { value: 1, label: language === "en" ? "+1 Beds" : "+1 Lits" },
    { value: 2, label: language === "en" ? "+2 Beds" : "+2 Lits" },
    { value: 3, label: language === "en" ? "+3 Beds" : "+3 Lits" },
    { value: 4, label: language === "en" ? "+4 Beds" : "+4 Lits" },
    { value: 5, label: language === "en" ? "+5 Beds" : "+5 Lits" },
    { value: 6, label: language === "en" ? "+6 Beds" : "+6 Lits" },
    { value: 7, label: language === "en" ? "+7 Beds" : "+7 Lits" },
  ];

  const price = [
    { value: "300000", label: "$300,000" },
    { value: "600000", label: "$600,000" },
    { value: "900000", label: "$900,000" },
    { value: "1200000", label: "$1,200,000" },
    { value: "2000000", label: "$2,000,000" },
    { value: "3000000", label: "$3,000,000" },
    { value: "5000000", label: "$5,000,000" },
  ];

  const conditions = [
    { value: "ready", label: "Ready" },
    { value: "construction", label: "Under construction" },
  ];

  const initialState = {
    type: { value: "", label: "1" },
    baths: { value: 0, label: "1" },
    beds: { value: 0, label: "1" },
    rooms: { value: 0, label: "1" },
    country: { value: "", label: "" },
    city: { value: "", label: "" },
    minPrice: { value: 0, label: "" },
    maxPrice: { value: 10000000, label: "" },
    condition: { value: "", label: "" },
    Furnished: null,
    roomservice: null,
    lockoff: null,
    resale: null,
  };

  const [formData, setFormData] = useState(initialState);

  const handleCheckboxChange = (event) => {
    const chechboxName = event.target.name;
    const chechboxValue = event.target.checked;
    setFormData({ ...formData, [chechboxName]: chechboxValue });
    console.log(formData);
  };

  const handleReset = useCallback(() => {
    setFormData(initialState);
    router.push(
      `/projects/?country=${initialState.country.value}&condition=${formData?.condition?.value}&city=${initialState.city.value}&baths=${initialState.baths.value}&beds=${initialState.beds.value}&minPrice=${initialState.minPrice.value}&maxPrice=${initialState.maxPrice.value}&type=${initialState.type.value}&rooms=${initialState.rooms.value}&beds=${initialState.beds.value}&resale=${formData.resale}&lockoff=${formData.lockoff}`
    );
    console.log("Form", formData);
  }, [initialState, router]);

  const cities = citiesData
    ?.filter((city) => city.country === formData.country.value)
    .map((city) => ({
      label: city.title,
      value: city.title,
    }));

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(
      `/projects/?country=${formData?.country?.value}&city=${
        formData.city.value
      }&baths=${formData.baths?.value}&beds=${formData.beds?.value}&minPrice=${
        formData.minPrice?.value
      }&maxPrice=${formData.maxPrice?.value}&type=${
        formData.type?.value
      }&rooms=${formData.rooms.value}&beds=${
        formData.beds.value
      }&page=${1}&condition=${formData?.condition?.value}&resale=${
        formData.resale !== null ? formData.resale : ""
      }&lockoff=${formData.lockoff !== null ? formData.lockoff : ""}`
    );
  };

  return (
    <div className={` ${isProjectsPage ? "mb-24 md:mb-4 -mt-20 !font-rubik" : "mb-24 mt-44 md:mb-4 !font-rubik"} `}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 mt-sm-0 pt-sm-0">
            <div className="features-absolute">
              {/* <ul
                className="nav nav-pills bg-white shadow border-bottom p-3 flex-row d-md-inline-flex nav-justified mb-0 rounded-top-3 position-relative overflow-hidden"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item m-1">
                  <div
                    className={`${"active"} nav-link py-2 px-4 !bg-primary  rounded-3 fw-medium`}
                    to="#"
                    // onClick={() => setActiveIndex(0)}
                  >
                    Filter
                  </div>
                </li>

           
              </ul> */}

              <div className="tab-content bg-white 1rounded-bottom-3 1rounded-end-3  rounded-lg sm-rounded-0 shadow mt-32 sm:mt-80">
                <div className="card border-0 active">
                  <form
                    onSubmit={handleSearch}
                    className="card-body text-start"
                  >
                    <div className="registration-form text-dark text-start">
                      <div className="row g-lg-0">
                        {home !== true && (
                          <div className="col-lg-3 col-md-6 col-12 ">
                            <div className="mb-3">
                              <label className="form-label fs-6 sm:mx-3 ">
                                {language === "en" ? "Search:" : "Recherche:"}
                              </label>
                              <div className="filter-search-form position-relative filter-border1 sm:mx-3">
                                <input
                                  name="name"
                                  type="text"
                                  id="job-keyword"
                                  className="form-control filter-input-box1 bg-light border-0  px-1"
                                  placeholder={
                                    language === "en"
                                      ? "Search your keywords"
                                      : "Recherchez vos mots-clés"
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3 w-full">
                            <label className="form-label fs-6 sm:!mx-3 ">
                              {language === "en"
                                ? "Select Country:"
                                : "Sélectionnez le pays:"}
                            </label>
                            <div className="filter-search-form w-ful position-relative filter-border1 bg-light sm:mx-3 cursor-pointer ">
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    country: newValue,
                                  }));
                                }}
                                className="form-input  hover:!border-none !w-full filter-input-box1 bg-gray-50 dark:bg-slate-800 border-0"
                                options={countries}
                                placeholder={
                                  language === "en" ? "Select" : "Sélectionner"
                                }
                              />
                            </div>
                          </div>
                        </div>

                        {home !== true && (
                          <div className="col-lg-3 col-md-6 col-12 ">
                            <div className="mb-3">
                              <label className="form-label fs-6 sm:mx-3">
                                {language === "en"
                                  ? "Select City:"
                                  : "Sélectionnez la ville:"}
                              </label>
                              <div className="filter-search-form position-relative filter-border1 bg-light sm:mx-3 cursor-pointer">
                                <Select
                                  onChange={(newValue) => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      city: newValue,
                                    }));
                                  }}
                                  className="form-input filter-input-box1 bg-gray-50 dark:bg-slate-800 border-0"
                                  options={cities}
                                  placeholder={
                                    language === "en"
                                      ? "Select"
                                      : "Sélectionner"
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="col-lg-3 col-md-6 col-12 ">
                          <div className="mb-3 ">
                            <label className="form-label fs-6 sm:mx-3 ">
                              {language === "en"
                                ? "Select Type:"
                                : "Sélectionnez le type:"}
                            </label>
                            <div className="filter-search-form position-relative filter-border1 bg-light sm:mx-3  ">
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    type: newValue,
                                  }));
                                }}
                                className="form-input filter-input-box1 bg-gray-50 dark:bg-slate-800 border-0"
                                options={categories}
                                placeholder={
                                  language === "en" ? "Select" : "Sélectionner"
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3">
                            <label className="form-label fs-6 sm:mx-3">
                              {language === "en"
                                ? "Select status:"
                                : "sélectionner le statut:"}
                            </label>
                            <div className="filter-search-form position-relative filter-border1 bg-light sm:mx-3">
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    condition: newValue,
                                  }));
                                }}
                                className="form-input filter-input-box1 bg-gray-50 dark:bg-slate-800 border-0"
                                options={conditions}
                                placeholder={
                                  language === "en" ? "Select" : "Sélectionner"
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3">
                            <label className="form-label fs-6 sm:mx-3">
                              {language === "en"
                                ? "Min Price:"
                                : "Prix ​​minimum:"}
                            </label>
                            <div className="filter-search-form position-relative filter-border1 bg-light sm:mx-3">
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    minPrice: newValue,
                                  }));
                                }}
                                className="form-input filter-input-box1 bg-gray-50 dark:bg-slate-800 border-0"
                                options={price}
                                placeholder={
                                  language === "en" ? "Select" : "Sélectionner"
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3">
                            <label className="form-label fs-6 sm:mx-3">
                              {language === "en"
                                ? "Max Price:"
                                : "Prix maximum:"}
                            </label>
                            <div className="filter-search-form position-relative filter-border1 bg-light sm:mx-3">
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    maxPrice: newValue,
                                  }));
                                }}
                                className="form-input filter-input-box1 bg-gray-50 dark:bg-slate-800 border-0"
                                options={price}
                                placeholder={
                                  language === "en" ? "Select" : "Sélectionner"
                                }
                              />
                            </div>
                          </div>
                        </div>

                        {home !== true && (
                          <div className="col-lg-3 col-md-6 col-12">
                            <div className="mb-3">
                              <label className="form-label fs-6 sm:mx-3">
                                {" "}
                                {language === "en"
                                  ? "Rooms:"
                                  : "Chambres:"}{" "}
                              </label>
                              <div className="filter-search-form position-relative filter-border1 bg-light sm:mx-3">
                                <Select
                                  onChange={(newValue) => {
                                    setFormData((prev) => ({
                                      ...prev,
                                      rooms: newValue,
                                    }));
                                  }}
                                  className="form-input filter-input-box1 bg-gray-50 dark:bg-slate-800 border-0"
                                  options={rooms}
                                  placeholder={
                                    language === "en"
                                      ? "Select"
                                      : "Sélectionner"
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="col-lg-3 col-md-6 col-12">
                          <div>
                            
                              <label className="form-label fs-6 sm:mx-3">
                                
                                {language === "en"
                                  ? "Bathrooms:"
                                  : "Salles de bains:"}
                              </label>
                           
                            <div className="filter-search-form position-relative filter-border1 bg-light sm:mx-3">
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    baths: newValue,
                                  }));
                                }}
                                className="form-input filter-input-box1 bg-gray-50 dark:bg-slate-800 border-0"
                                options={baths}
                                placeholder={
                                  language === "en" ? "Select" : "Sélectionner"
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3">
                            <label className="form-label fs-6 sm:mx-3">
                              {language === "en" ? "Beds:" : "Lits:"}{" "}
                            </label>
                            <div className="filter-search-form position-relative filter-border11 bg-light sm:mx-3">
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    beds: newValue,
                                  }));
                                }}
                                className="form-input filter-input-box1 bg-gray-50 dark:bg-slate-800 border-0"
                                options={beds}
                                placeholder={
                                  language === "en" ? "Select" : "Sélectionner"
                                }
                              />
                            </div>
                          </div>
                        </div>

                        {/* CHECKBOXES */}

                        {home !== true && (
                          <div className="flex gap-4 pb-3 mt-3 ml-4">
                            <div className="custom-control custom-radio custom-control-inline">
                              {/* <div className="form-check mb-0">
                                                <input
                                               
                                                   type="checkbox" name="Furnished" id="" checked={formData.Furnished} onChange={handleCheckboxChange}
                                                
                                                className="form-check-input border-primary"  />
                                                <label className="form-check-label" htmlFor="rent">Furnitured</label>
                                                

                                            </div> */}

                              <div className="form-check mb-0 mr-4 ">
                                <input
                                  type="checkbox"
                                  name="resale"
                                  id=""
                                  checked={formData.resale}
                                  onChange={handleCheckboxChange}
                                  className="form-check-input border-primary text-xl  cursor-pointer"
                                />
                                <label
                                  className="form-check-labe form-label fs-6 mt-1"
                                  htmlFor="rent"
                                >
                                  
                                  {language === "en" ? "For Sale" : "À vendre"}
                                
                                </label>
                              </div>
                            </div>

                            <div className="custom-control custom-radio custom-control-inline">
                              <div className="form-check mb-0">
                                <input
                                  type="checkbox"
                                  name="lockoff"
                                  id=""
                                  checked={formData.lockoff}
                                  onChange={handleCheckboxChange}
                                  className="form-check-input border-primary  text-xl cursor-pointer"
                                />
                                <label
                                  className="form-check-label form-label fs-6 mt-1 "
                                  htmlFor="rent"
                                >
                                    {language === "en" ? "Lockoff" : "Verrouillage"}
                                </label>
                              </div>
                            </div>

                            {/* <div className="custom-control custom-radio custom-control-inline">
                                            <div className="form-check mb-0">
                                                <input
                                                   type="checkbox" name="Furnished" id="" checked={formData.Furnished} onChange={handleCheckboxChange}
                                                
                                                className="form-check-input"  />
                                                <label className="form-check-label" htmlFor="rent">Furnitured</label>
                                                

                                            </div>
                                        </div>

                                        <div className="custom-control custom-radio custom-control-inline">
                                            <div className="form-check mb-0">
                                                <input
                                                   type="checkbox" name="Furnished" id="" checked={formData.Furnished} onChange={handleCheckboxChange}
                                                
                                                className="form-check-input"  />
                                                <label className="form-check-label" htmlFor="rent">Furnitured</label>
                                                

                                            </div>
                                        </div> */}
                          </div>
                        )}

                        <div className="col-lg-12 col-md-6 col-12 flex gap-2">
                          <input
                            type="submit"
                            id="search"
                            name="search"
                            style={{ height: "48px" }}
                            className="btn !bg-primary !text-white searchbtn w-100 hover:text-primary hover:bg-white"
                            value={language === "en" ? "Search" : "Recherche"}
                          />

                          <input
                            onClick={handleReset}
                            type="submit"
                            id="search"
                            name="search"
                            style={{ height: "48px" }}
                            className="btn !bg-primary !text-white searchbtn w-100 hover:text-primary hover:bg-white"
                            value={
                              language === "en" ? "Reset" : "Réinitialiser"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
