import React, { useEffect, useMemo, useRef, useState ,useCallback } from "react";
import { useRouter } from "next/router";

// import { Empty, Select, Slider } from 'antd';
import Select from "react-select";
import useCountries from "@/hooks/useCountries";
import useCities from "@/hooks/useCities";

export default function FilterForm({home=false}) {
  const router = useRouter();
  const { data, isLoading, error } = useCountries();

  const countries = data?.map((country) => ({
    label: country.title,
    value: country.title,
  }));

  const { data: citiesData } = useCities();

  const categories = [
    { value: "house", label: "Houses" },
    { value: "apartment", label: "Apartment" },
    { value: "office", label: "Offices" },
    { value: "town", label: "Townhome" },
    { value: "villa", label: "Villa" },
  ];

  const rooms = [
    { value: 1, label: "+1 Room" },
    { value: 2, label: "+2 Room" },
    { value: 3, label: "+3 Room" },
    { value: 4, label: "+4 Room" },
    { value: 5, label: "+5 Room" },
    { value: 6, label: "+6 Room" },
    { value: 7, label: "+7 Room" },
  ];

  const baths = [
    { value: 1, label: "+1 Bathroom" },
    { value: 2, label: "+2 Bathroom" },
    { value: 3, label: "+3 Bathroom" },
    { value: 4, label: "+4 Bathroom" },
    { value: 5, label: "+5 Bathroom" },
    { value: 6, label: "+6 Bathroom" },
    { value: 7, label: "+7 Bathroom" },
  ];

  const beds = [
    { value: 1, label: "+1 Beds" },
    { value: 2, label: "+2 Beds" },
    { value: 3, label: "+3 Beds" },
    { value: 4, label: "+4 Beds" },
    { value: 5, label: "+5 Beds" },
    { value: 6, label: "+6 Beds" },
    { value: 7, label: "+7 Beds" },
  ];

  const price = [
    { value: "50000", label: "50000" },
    { value: "10000", label: "10000" },
    { value: "20000", label: "20000" },
    { value: "30000", label: "30000" },
    { value: "40000", label: "40000" },
    { value: "50000", label: "50000" },
    { value: "60000", label: "60000" },
    { value: "70000", label: "70000" },
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
    Furnished : null,
    roomservice:null,

  };
  
  const [formData, setFormData] = useState(initialState);


  const handleCheckboxChange = event => {
    const chechboxName = event.target.name
    const chechboxValue = event.target.checked
    setFormData({ ...formData, [chechboxName]: chechboxValue })
    console.log(formData)
  }


  const handleReset = useCallback(() => {
    setFormData(initialState);
    router.push(
      `/projects/?country=${initialState.country.value}&city=${initialState.city.value}&baths=${initialState.baths.value}&beds=${initialState.beds.value}&minPrice=${initialState.minPrice.value}&maxPrice=${initialState.maxPrice.value}&type=${initialState.type.value}&rooms=${initialState.rooms.value}&beds=${initialState.beds.value}`
    );
    console.log("Form" , formData)
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
      `/projects/?country=${formData?.country?.value}&city=${formData.city.value}&baths=${formData.baths?.value}&beds=${formData.beds?.value}&minPrice=${formData.minPrice?.value}&maxPrice=${formData.maxPrice?.value}&type=${formData.type?.value}&rooms=${formData.rooms.value}&beds=${formData.beds.value}&page=${1}`
    );
  };

  return (
    <div className=" mb-24 mt-20 md:mb-4">
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

              <div className="tab-content bg-white 1rounded-bottom-3 1rounded-end-3  rounded-lg sm-rounded-0 shadow">
                <div className="card border-0 active">
                  <form
                    onSubmit={handleSearch}
                    className="card-body text-start"
                  >
                    <div className="registration-form text-dark text-start">
                      <div className="row g-lg-0">
                      {home !== true &&
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3">
                            <label className="form-label fs-6">Search :</label>
                            <div className="filter-search-form position-relative filter-border">
                              
                              <input
                                name="name"
                                type="text"
                                id="job-keyword"
                                className="form-control filter-input-box bg-light border-0"
                                placeholder="Search your keaywords"
                              />
                            </div>
                          </div>
                        </div>
}

                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3 w-full">
                            <label className="form-label fs-6">
                              Select Country :
                            </label>
                            <div className="filter-search-form w-full position-relative filter-border bg-light">
                              
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    country: newValue,
                                  }));
                                }}
                                className="form-input     hover:!border-none !w-full filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                options={countries}
                              />
                            </div>
                          </div>
                        </div>



{home !== true &&
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3">
                            <label className="form-label fs-6">
                              Select City :
                            </label>
                            <div className="filter-search-form position-relative filter-border bg-light">
                              
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    city: newValue,
                                  }));
                                }}
                                className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                options={cities}
                              />
                            </div>
                          </div>
                        </div>
}

                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3">
                            <label className="form-label fs-6">
                              Select Type :
                            </label>
                            <div className="filter-search-form position-relative filter-border bg-light">
                            
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    type: newValue,
                                  }));
                                }}
                                className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                options={categories}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3">
                            <label className="form-label fs-6">
                              Min Price :
                            </label>
                            <div className="filter-search-form position-relative filter-border bg-light">
                              
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    minPrice: newValue,
                                  }));
                                }}
                                className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                options={price}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3">
                            <label className="form-label fs-6">
                              Max Price :
                            </label>
                            <div className="filter-search-form position-relative filter-border bg-light">
                           
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    maxPrice: newValue,
                                  }));
                                }}
                                className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                options={price}
                              />
                            </div>
                          </div>
                        </div>






                        {home !== true &&
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3">
                            <label className="form-label fs-6">Rooms :</label>
                            <div className="filter-search-form position-relative filter-border bg-light">
                              
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    rooms: newValue,
                                  }));
                                }}
                                className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                options={rooms}
                              />
                            </div>
                          </div>
                        </div>
}

                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3">
                            <label className="form-label fs-6">
                              Bathrooms :
                            </label>
                            <div className="filter-search-form position-relative filter-border bg-light">
                              
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    baths: newValue,
                                  }));
                                }}
                                className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                options={baths}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="mb-3">
                            <label className="form-label fs-6">Beds :</label>
                            <div className="filter-search-form position-relative filter-border bg-light">
                              
                              <Select
                                onChange={(newValue) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    beds: newValue,
                                  }));
                                }}
                                className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                options={beds}
                              />
                            </div>
                          </div>
                        </div>




{/* CHECKBOXES */}

{/* {home  !== true && 

<div className="flex gap-4 pb-3">


<div className="custom-control custom-radio custom-control-inline">
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
                                        </div>

                                        <div className="custom-control custom-radio custom-control-inline">
                                            <div className="form-check mb-0">
                                                <input
                                                   type="checkbox" name="Furnished" id="" checked={formData.Furnished} onChange={handleCheckboxChange}
                                                
                                                className="form-check-input"  />
                                                <label className="form-check-label" htmlFor="rent">Furnitured</label>
                                                

                                            </div>
                                        </div>


                                




</div>


} */}








                        <div className="col-lg-12 col-md-6 col-12 flex gap-2">
                          <input
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
                            className="btn !bg-primary !text-white searchbtn w-100"
                            value="Reset"
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
