import Head from "next/head";
import NotFound from "@/pages/404";
import { PageLayout } from "@/layouts";
import { Grid } from "@mui/material";
import { TextInput, SelectInput } from "@/components/inputs";
import { Button } from "@material-ui/core";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AdminMainLayout from "@/components/Site/dashboardLayout";


import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { message } from "antd";
import { useRouter } from "next/router";

import { useMemo } from "react";

import useProducts from "@/hooks/useProducts";

import { Upload } from "antd";
import { useTranslation } from "@/context/useTranslation";

import useCountries from "@/hooks/useCountries";

import useCities from "@/hooks/useCities";
import useAreas from "@/hooks/useAreas";


import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });



const uploadApi = "https://file-uploader-red.vercel.app";

const types = [
  { id: 1, label: "Villa", value: "villa" },
  { id: 2, label: "House", value: "house" },
];

const conditions = [
  { id: 1, label: "Ready", value: "ready" },
  { id: 2, label: "Construction", value: "construction" },
];

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, false] }], // Add heading levels
    [{ 'font': ['sans-serif', 'serif', 'monospace', 'roboto'] }], // Add more fonts
    [{ 'size': ['small', false, 'large', 'huge'] }], // Add font sizes
    ['bold', 'italic', 'underline'], // Text formatting options
    [{ 'color': [] }, { 'background': [] }], // Text color and background
    [{ 'align': [] }], // Text alignment
    ['link', 'image', 'video'], // Media options
    ['clean'] // Remove formatting button
  ]
};




export default function BookCreatePage() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });

  const { mutate } = useProducts({});

  const { data, isLoading, error } = useCountries();

  const countries = data?.map((country) => ({
    label: country?.title,
    value: country?.title,
  }));

  const {
    data: CitiesData,
    isLoading: loadCities,
    error: errorCities,
  } = useCities();

  const {
    data: areasData,
    isLoading: loadAreas,
    error: errorAreas,
  } = useAreas();

  const router = useRouter();
  const { translation } = useTranslation();

  const t = useMemo(() => translation ?? {}, [translation]);

  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);

  const [form, setForm] = useState({
    sizes: [],
    features: [],
  });

  const [propertyDetails, setPropertyDetails] = useState({
    propertyId: "",
    title: "",
    titlefr: "",
    story: "",
    storyfr: "",
    country: "",
    city: "",
    cityFr: "",
    area: "",
    type: "",
    price: "",
    rating: 0,
    reference: 0,
    constructionYear: "",
    condition: "",
    category: "",

    cover: "",
    image: [],
    sizes: [],
    featuresPlus: [],
    author: "",
    details: {
      areaSqM: 0,
      beds: 0,
      baths: 0,
      rooms: 0,
      parkings: 0,
    },
    features: {
      ac: false,
      balcony: false,
      tv: false,
      internet: false,
      pet: false,
      bathtub: false,
    },
    services: {
      isfeatrued:false,
      lockoff:false,
      resale:false,
      security: false,
      cctv: false,
      elevator: false,
      pool: false,
      gym: false,
      parking: false,
      garden: false,
      Furnished: false,
      airBn: false,
      balcon: false,
      golf: false,
      malls: false,
      roomservice: false,
      gezepo: false,
      animalsallow: false,
      aircondition: false,
      beachaccess: false,
      cock: false,
      electric: false,
    },
    coordinate: {
      lat: "",
      lng: "",
    },
    address: "",
    addBy: "Admin",
  });

   const [selectedCountry, setSelectedCountry] = useState({});
  // const [selectedCity, setSelectedCity] = useState({});
  const [selectedCity, setSelectedCity] = useState({ value: "", label: "", titlefr: "" });
  const [selectedArea, setSelectedArea] = useState({});
  const [selectedType, setSelectedType] = useState({});
  const [selectedCondition, setSelectedCondition] = useState({});

  // console.log("CITIES" , CitiesData)
  const cities = CitiesData?.filter(
    (city) => city?.country === selectedCountry.value
  ).map((city) => ({
    label: city?.title,
    value: city?.title,
    titlefr: city?.titlefr,
  }));

  // console.log("CITIES" , CitiesData)
  const areas = areasData
    ?.filter((area) => area.city === selectedCity.value)
    .map((area) => ({
      label: area?.title,
      value: area?.title,
    }));

  // Handle input changes for the form
  const handleInputChange = (name, value) => {
    // Handle nested properties
    const parsedValue = name.includes("details.") ? parseInt(value, 10) : value;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setPropertyDetails((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: parsedValue,
        },
      }));
    } else {
      setPropertyDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (name) => {
    const [parent, child] = name.split(".");

    // Log the checkbox name and current state
    console.log("Checkbox name:", name);
    console.log("Current parent state:", propertyDetails[parent]);

    // Update the state
    setPropertyDetails((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: !prev[parent]?.[child], // Use optional chaining to avoid errors
      },
    }));
  };

  useEffect(() => {
    if (selectedCountry.value) {
      setPropertyDetails((prev) => ({
        ...prev,
        country: selectedCountry.value,
        city: selectedCity.value,
        cityFr: selectedCity.titlefr,
        area: selectedArea?.value,
      }));
    }
  }, [selectedCountry, selectedCity, selectedArea]);

  useEffect(() => {
    if (selectedType.value) {
      setPropertyDetails((prev) => ({
        ...prev,
        type: selectedType.value,
      }));
    }
  }, [selectedType]);

  useEffect(() => {
    if (selectedCondition.value) {
      setPropertyDetails((prev) => ({
        ...prev,
        condition: selectedCondition.value,
      }));
    }
  }, [selectedCondition]);

  const handleUploadImages = async (filesarray: any) => {
    try {
      const formData = new FormData();
      filesarray.forEach((image: any) => {
        formData.append("images", image);
      });

      //?size=${(size = 1200)}&&hieghtsize=${(hieghtSize = 1000)}
      const response = await axios.post(`${uploadApi}/file/uploads?size=600&hieghtsize=600`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Files Uplaoded successfully", response.data);

      return response?.data?.files;
    } catch (error) {
      console.error("Error deleting files:", error);
    }
  };

  // In your front-end code ARRAY IMAGES ADD DELETE
  const handleDelete = async (filesToDelete: any) => {
    try {
      const res = await axios.post(`${uploadApi}/file/delets`, {
        filesToDelete,
      });
      console.log("Files deleted successfully", res);
    } catch (error) {
      console.error("Error deleting files:", error);
    }
  };

  const handleUploadImage2 = async (file: any, logo: any) => {
    try {
      const formData = new FormData();

      formData.append("image", file);

      console.log("File Data", file);

      const endpoint = logo
        ? `${uploadApi}/file/upload?size=450&&hieghtsize=450`
        : `${uploadApi}/file/upload?size=650&hieghtsize=423`;
        // 650 * 423
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File Uplaoded successfully", response.data);

      return response?.data?.file;
    } catch (error) {
      console.error("Error deleting files:", error);
      return;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      message.loading("جاري إضافة المنتج");

      const uuid = uuidv4();

      let image: string | any = "";

      if (!file) {
        return message.error("يجب اختيار الصورة ");
      }

      if (file) {
        //  image = await uploadImages(file, true, "book");
        image = await handleUploadImage2(file, false);
        message.success("تم تحميل الصورة بنجاح");
      }

      let images: any = [];

      if (files?.length > 0) {
        //  images = await uploadImages(files);
        images = await handleUploadImages(files);
      }

      // if (form?.sizes?.length < 1) {
      //   message.error("اضف مقاس واحد على الاقل");
      // }

      // await uploadFile(image, `books/cover/${uuid}${".png"}`);

      console.log("upload response", image);

      const updatedDetails = {
        ...propertyDetails,
        cover: image,
        image, // Include images in the submission
      };

      await axios
        .post("/api/book", updatedDetails)

        .then((res) => {
          console.log(res);
          mutate();
          message.success("تم إضافة المنتج بنجاح");
          const { data } = res;
          //     router.push(`/~/book/${data}`);
        })
        .catch((err) => {
          message.error(err?.message);
        });
    } catch (error) {
      message.error(error?.message);
    }
  };

  if (user && user.role !== "admin") return <NotFound />;
  return (
    <div dir="ltr" className="cart-are !bg-[#ffff]  product-area">
      <Head>
        <title>إضافة منتج جديد - Sand n Sea</title>
      </Head>
      <AdminMainLayout>
        <PageLayout title="header.addBook">
          <form className=" p-20" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextInput
                  name="propertyId"
                  label="Property ID"
                  required
                  value={propertyDetails.propertyId}
                  onChange={(value) => handleInputChange("propertyId", value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextInput
                  name="title"
                  label="Title"
                  required
                  value={propertyDetails.title}
                  onChange={(value) => handleInputChange("title", value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextInput
                  name="titlefr"
                  label="Titlefr"
                  required
                  value={propertyDetails.titlefr}
                  onChange={(value) => handleInputChange("titlefr", value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextInput
                  name="reference"
                  label="Reference"
                  // required
                  type="number"
                  value={propertyDetails.reference}
                  onChange={(value) => handleInputChange("reference", value)}
                />
              </Grid>


              <Grid item xs={12} md={6}>
                <TextInput
                  name="constructionYear"
                  label="ConstructionYear"
                  // required
                  
                  value={propertyDetails.constructionYear}
                  onChange={(value) => handleInputChange("constructionYear", value)}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextInput
                  name="rating"
                  label="Rating"
                  type="number"
                  value={propertyDetails.rating}
                  onChange={(value) => handleInputChange("rating", value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextInput
                  name="price"
                  label="Price"
                  required
                  type="number"
                  value={propertyDetails.price}
                  onChange={(value) => handleInputChange("price", value)}
                />
              </Grid>

              {/* <Grid item xs={12} md={4}>
                <TextInput
                  name="area"
                  label="Area"
                  required
                  value={propertyDetails.area}
                  onChange={(value) => handleInputChange("area", value)}
                />
              </Grid> */}

              <Grid item xs={12} md={4}>
                <TextInput
                  name="address"
                  label="Address"
                  required
                  value={propertyDetails.address}
                  onChange={(value) => handleInputChange("address", value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextInput
                  name="details.beds"
                  label="Number of Beds"
                  required
                  type="number"
                  value={propertyDetails.details.beds}
                  onChange={(value) => handleInputChange("details.beds", value)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextInput
                  name="details.rooms"
                  label="Number of Rooms"
                  required
                  type="number"
                  value={propertyDetails.details.rooms}
                  onChange={(value) =>
                    handleInputChange("details.rooms", value)
                  }
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextInput
                  name="details.baths"
                  label="Number of Baths"
                  required
                  type="number"
                  value={propertyDetails.details.baths}
                  onChange={(value) =>
                    handleInputChange("details.baths", value)
                  }
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <h3>Features</h3>
                <div className=" flex gap-4 md:gap-12 w-full flex-wrap">
                  {Object.keys(propertyDetails?.features).map((feature) => (
                    <label
                      className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base"
                      key={feature}
                    >
                      {/* {feature === 'true' ? 'checked' : 'NOOT'} */}
                      <input
                        className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                        type="checkbox"
                        checked={propertyDetails.features[feature]}
                        onChange={(e) =>
                          handleCheckboxChange(`features.${feature}`)
                        }
                      />
                      {feature.charAt(0).toUpperCase() + feature.slice(1)}
                    </label>
                  ))}
                </div>

                <Grid className="!mt-6" item xs={12} md={12}>
                  <h3>Services</h3>
                  <div className=" flex gap-4 md:gap-12 w-full flex-wrap">
                    {Object.keys(propertyDetails.services).map((service) => (
                      <label className="" key={service}>
                        <input
                          className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                          type="checkbox"
                          checked={propertyDetails.services[service]}
                          onChange={() =>
                            handleInputChange(
                              `services.${service}`,
                              !propertyDetails.services[service]
                            )
                          }
                        />
                        {service.charAt(0).toUpperCase() + service.slice(1)}
                      </label>
                    ))}
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={12} md={12}>
                English Description
                <ReactQuill
                  modules={modules}
                  value={propertyDetails.story}
                  onChange={(value) =>
                    setPropertyDetails((prevState) => ({
                      ...prevState,
                      story: value,
                    }))
                  }
                  className="mt-1"
                />
              </Grid>

              <Grid item xs={12} md={12}>
                French Description
                <ReactQuill
                  modules={modules}
                  value={propertyDetails.storyfr}
                  onChange={(value) =>
                    setPropertyDetails((prevState) => ({
                      ...prevState,
                      storyfr: value,
                    }))
                  }
                  className="mt-1"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SelectInput
                  placeholder="Select Country"
                  options={countries}
                  selected={selectedCountry}
                  setSelected={setSelectedCountry}
                />
              </Grid>

              <Grid item xs={12} md={6}>
{/*                 
                <SelectInput
                  placeholder="Select City"
                  options={cities}
                  selected={selectedCity}
                  setSelected={setSelectedCity}
                /> */}

<SelectInput
            placeholder="Select City"
            options={cities}
            selected={selectedCity}
            setSelected={(city) => {
              setSelectedCity(city);
              setPropertyDetails(prev => ({
                ...prev,
                city: city.value,
                cityFr: city.titlefr
              }));
            }}
          />

          


              </Grid>

              <Grid item xs={12} md={6}>
                <SelectInput
                  placeholder="Select Area"
                  options={areas}
                  selected={selectedArea}
                  setSelected={setSelectedArea}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SelectInput
                  placeholder="Select Type"
                  options={types}
                  selected={selectedType}
                  setSelected={setSelectedType}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SelectInput
                  placeholder="Select Condition"
                  options={conditions}
                  selected={selectedCondition}
                  setSelected={setSelectedCondition}
                />
              </Grid>

              <Grid item xs={6} md={12}>
                <div>
                  <Upload
                    className=" !font-estedad"
                    accept="image/*"
                    maxCount={1}
                    // file is data of image will be uploaded to firebase/storage
                    beforeUpload={(file: any) => {
                      setFile(file);
                      // setFiles((prev) => [...prev, file]);
                      return false;
                    }}
                    listType="picture-card"
                    onRemove={() => setFile("")}
                  >
                    Add cover image
                  </Upload>
                </div>

                <div className=" my-6">
                  <Upload
                    className=" !font-estedad"
                    accept="image/*"
                    multiple
                    // files is data of images will be uploaded to firebase/storage
                    beforeUpload={(file) => {
                      setFiles((prev) => [...prev, file]);
                      return false;
                    }}
                    listType="picture-card"
                    onRemove={(file) => {
                      console.log("fileDATA", file);
                      setFiles((prev) => {
                        const index = prev.indexOf(file);
                        const newFileList = prev.slice();
                        newFileList.splice(index, 1);
                        return newFileList;
                      });

                      console.log("files", files);
                    }}
                  >
                    Add images
                  </Upload>
                </div>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button type="submit" variant="contained" color="primary">
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </PageLayout>
      </AdminMainLayout>
    </div>
  );
}
