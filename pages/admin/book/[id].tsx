// ------------

import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/pages/404";
import { PageLayout } from "@/layouts";
import { Grid } from "@mui/material";
import { TextInput, SelectInput } from "@/components/inputs";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { message } from "antd";

import { MdDeleteForever } from "react-icons/md";

import { Form, Upload, Input, Select, Switch, InputNumber } from "antd";
import useProducts from "@/hooks/useProducts";
import useProductDetails from "@/hooks/useProductDetails";
// import TextList from "@/components/SiteComponents/form/textList";
// import MultiTextList from "@/components/SiteComponents/form/MultiTextList";

import { ImageEndpoint, defaultImage, uploadApi } from "@/utils/global";
import AdminMainLayout from "@/components/Site/dashboardLayout";
import useCountries from "@/hooks/useCountries";

import useCities from "@/hooks/useCities";
import useAreas from "@/hooks/useAreas";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const types = [
  { id: 1, label: "Villa", value: "villa" },
  { id: 2, label: "House", value: "house" },
];

const conditions = [
  { id: 1, label: "Ready", value: "ready" },
  { id: 2, label: "Construction", value: "construction" },
];

export default function BookUpdatePage() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const router = useRouter();
  const { id } = router.query;

  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [rootImages, setRootImages] = useState([]);
  const { mutate, data } = useProducts({});
  const { mutate: mutatesingle } = useProductDetails({ id });
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
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedArea, setSelectedArea] = useState({});
  const [selectedType, setSelectedType] = useState({});
  const [selectedCondition, setSelectedCondition] = useState({});

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/book/${id}`).then((res) => {
      const {
        data: { book },
      } = res;
      console.log("??>>", book);
      setPropertyDetails(book);
      setImage(book?.cover);
      setImages(book?.image);
      setRootImages(book?.image);

      setSelectedCountry({ label: book?.country, value: book?.country });
      setSelectedCity({ label: book?.city, value: book?.city });
      setSelectedArea({ label: book?.area, value: book?.area });

      setSelectedType({ label: book?.type, value: book?.type });
      setSelectedCondition({ label: book?.condition, value: book?.condition });
    });
  }, [id]);

  const { data: CountriesData, isLoading, error } = useCountries();

  const countries = CountriesData?.map((country) => ({
    label: country.title,
    value: country.title,
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

  const cities = CitiesData?.filter(
    (city) => city?.country === selectedCountry.value
  ).map((city) => ({
    label: city?.title,
    value: city?.title,
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
      message.success("image deleted success");
    } catch (error) {
      console.error("Error deleting files:", error);
    }
  };

  // ------------ SINGLE IMAGE ADD DELETE

  const handleDelete2 = async (fileToDelete) => {
    try {
      console.log("FILE TO DLEETe-->", fileToDelete);
      const res = await axios.delete(
        `${uploadApi}/file/delete?fileName=${fileToDelete}`
      );
      console.log("File deleted successfully", res);
      message.success("single image deleted success");
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
        : `${uploadApi}/file/upload?size=600&hieghtsize=800`;
      //?size=${(size = 1200)}&&hieghtsize=${(hieghtSize = 1000)}
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File Uplaoded successfully", response.data);
      message.success("single cover image uploaded success");
      return response?.data?.file;
    } catch (error) {
      console.error("Error deleting files:", error);
      return;
    }
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    let newimage: string | any = "";

    if (file && image) {
      // await deleteImage(image);
      await handleDelete2(image);
      message.success("file && image ");
      // newimage = await uploadImages(file, true, "book");

      newimage = await handleUploadImage2(file, false);
    }

    if (!file && image) {
      newimage = image;
    } else if (file && !image) {
      //   newimage = await uploadImages(file, true, "book");
      newimage = await handleUploadImage2(file, false);
      message.success("file && NOOOTTT image");
    }

    console.log("NEWIMAGE", newimage);

    let imagesData;
    const imagesToDelete = rootImages?.filter(
      (image) => !images.includes(image)
    );
    imagesToDelete?.length > 0 && (await handleDelete(imagesToDelete));
    //  const newImagesUploaded = await uploadImages(files);
    let newImagesUploaded: any = [];
    newImagesUploaded = files?.length > 0 && (await handleUploadImages(files));
    console.log("ITEREABLE", newImagesUploaded);
    imagesData =
      newImagesUploaded?.length > 0
        ? [...images, ...newImagesUploaded]
        : images;

    // if (form?.sizes?.length < 1) {
    //   message.error("اضف مقاس واحد على الاقل");
    // }

    const updatedDetails = {
      ...propertyDetails,
      cover: newimage,
      image: imagesData, // Include images in the submission
    };

    await axios
      .put(`/api/book/${id}/handler`, updatedDetails)

      //   await mutate()
      // Revalidate the products data

      .then((res) => {
        mutate();
        mutatesingle();
        message.success("Propert updated success");
        //    router.push(`/~/product/${id}`);
      })
      .catch((err) => message.error(err?.message));
  };
  if (user && user.role !== "admin") return <NotFound />;
  return (
    <div dir="ltr" className="cart-area !bg-whit about-area">
      <Head>
        <title>تعديل المنتج - Outlet Turkey</title>
      </Head>
      <AdminMainLayout>
        <PageLayout title="تعديل المنتج">
          <form className=" p-20 !bg-white" onSubmit={handleUpdate}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextInput
                  name="propertyId"
                  label="Property ID"
                  required
                  value={propertyDetails?.propertyId}
                  onChange={(value) => handleInputChange("propertyId", value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextInput
                  name="title"
                  label="Title"
                  required
                  value={propertyDetails?.title}
                  onChange={(value) => handleInputChange("title", value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextInput
                  name="titlefr"
                  label="Titlefr"
                  required
                  value={propertyDetails?.titlefr}
                  onChange={(value) => handleInputChange("titlefr", value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextInput
                  name="price"
                  label="Price"
                  required
                  type="number"
                  value={propertyDetails?.price}
                  onChange={(value) => handleInputChange("price", value)}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextInput
                  name="rating"
                  label="Rating"
                  type="number"
                  value={propertyDetails?.rating}
                  onChange={(value) => handleInputChange("rating", value)}
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
                  onChange={(value) =>
                    handleInputChange("constructionYear", value)
                  }
                />
              </Grid>

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
                  label="Number of rooms"
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
                <div className="flex gap-4 md:gap-12 w-full flex-wrap">
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
                  <div className="flex gap-4 md:gap-12 w-full flex-wrap">
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
                {" "}
                <SelectInput
                  placeholder="Select Country"
                  options={countries}
                  selected={selectedCountry}
                  setSelected={setSelectedCountry}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <SelectInput
                  placeholder="Select City"
                  options={cities}
                  selected={selectedCity}
                  setSelected={setSelectedCity}
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

              <Grid item xs={12} md={12}>
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
                    تحميل الصورة الرئيسية
                  </Upload>
                </div>

                {image && (
                  <div className="   w-28 h-28 rounded-full  relative">
                    <img
                      className=" w-28 h-28 rounded-lg  "
                      // firebase
                      // src={image}
                      src={`${ImageEndpoint}/${image}`}
                      alt=""
                    />

                    <p
                      onClick={() => setImage("")}
                      className="text-center -top-2 right-2 cursor-pointer absolute text-red-600"
                    >
                      <MdDeleteForever className=" w-8 h-8" />
                    </p>
                  </div>
                )}
              </Grid>

              <Grid item xs={12} md={12}>
                <div>
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
                    تحميل الصور الفرعية
                  </Upload>
                </div>

                <div className="flex flex-wrap gap-3 mt-2 ">
                  {images?.map((data, index) => (
                    <div key={index} className=" relative">
                      <img
                        // src={data}
                        src={`${ImageEndpoint}/${data}`}
                        className="w-28 h-28 rounded-full "
                      />
                      <h1
                        onClick={() => {
                          // prev all previous images
                          setImages((prev) => {
                            // all images put into new array
                            const temp = [...prev];
                            // delete  image with clicked index
                            temp.splice(index, 1);
                            // return this new array after delete clicked image
                            return temp;
                          });
                        }}
                        className="text-center -top-10 right-2 cursor-pointer absolute text-red-600"
                      >
                        <MdDeleteForever className=" w-8 h-8" />
                      </h1>
                    </div>
                  ))}
                </div>
              </Grid>

              <Grid item xs={12} md={12}>
                <Button type="submit" variant="contained" color="primary">
                  تعديل المنتج
                </Button>
              </Grid>
            </Grid>
          </form>
        </PageLayout>
      </AdminMainLayout>
    </div>
  );
}
