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

import { db } from "@/utils/firebaseConfig";
import { uploadImages, deleteImages, deleteImage } from "@/utils/getData";

import { MdDeleteForever } from "react-icons/md";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Form, Upload, Input, Select, Switch, InputNumber } from "antd";
import useProducts from "@/hooks/useProducts";
import useProductDetails from "@/hooks/useProductDetails";
// import TextList from "@/components/SiteComponents/form/textList";
// import MultiTextList from "@/components/SiteComponents/form/MultiTextList";

import { ImageEndpoint, defaultImage, uploadApi } from "@/utils/global";
import AdminMainLayout from "@/components/Site/dashboardLayout";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });





const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ direction: "rtl" }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};


export default function BookUpdatePage() {


  const countries = [
    { value: "", label: "All countries" },
  
    { value: "Mexico", label: language === 'en' ? 'Mexico' :"Mexique" },
    { value: "North Cyprus", label: language === 'en' ? "North Cyprus" :"Chypre du Nord"   },
    { value: "Spain", label: language === 'en' ? "Spain" : "Espagne" },
    { value: "Republic Dominica", label:language === 'en' ? "Republic Dominica"  : "République Dominique"},
  
  // { value: "Portugal", label: language === 'en' ? " Portugal" : "Portugal"},
  
  // { value: "Canada", label: language === 'en' ? "Canada" : "Canada"},
  
    { value: "United Arab Emirates", label: language === 'en' ? "United Arab Emirates" : ""},
  ];
  


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
  const { mutate, data } = useProducts({ page: 1 });
  const { mutate: mutatesingle } = useProductDetails({ id });
  const [form, setForm] = useState({
    sizes: [],
    features: [],
  });

  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    titlefr: "",
    category: "",
    story: "",
    storyfr: "",

    image: [],
    sizes: [],
    featuresPlus: [],
    author: "admin",
  });

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/blog/${id}`).then((res) => {
      const {
        data: { book },
      } = res;
      console.log("??>>", book);
      setPropertyDetails(book);

      setImages(book?.image);
      setRootImages(book?.image);
    });
  }, [id]);

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

  const handleUploadImages = async (filesarray: any) => {
    try {
      const formData = new FormData();
      filesarray.forEach((image: any) => {
        formData.append("images", image);
      });

      //?size=${(size = 1200)}&&hieghtsize=${(hieghtSize = 1000)}
      const response = await axios.post(`${uploadApi}/file/uploads?size=600&hieghtsize=800`, formData, {
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

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    let newimage: string | any = "";

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

      image: imagesData, // Include images in the submission
    };

    await axios
      .put(`/api/blog/${id}/handler`, updatedDetails)

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
                  name="title"
                  label="Title"
                  required
                  value={propertyDetails?.title}
                  onChange={(value) => handleInputChange("title", value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextInput
                  name="category"
                  label="Category"
                  // required
                  value={propertyDetails.category}
                  onChange={(value) => handleInputChange("category", value)}
                />
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

              <Grid item xs={12} md={12}>
                <TextInput
                  name="storyfr"
                  label="Storyfr"
                  required
                  multiline
                  rows={4}
                  value={propertyDetails?.storyfr}
                  onChange={(value) => handleInputChange("storyfr", value)}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <div>
                  <Upload
                    className=" !font-estedad"
                    accept="image/*"
                    // multiple
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
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </PageLayout>
      </AdminMainLayout>
    </div>
  );
}
