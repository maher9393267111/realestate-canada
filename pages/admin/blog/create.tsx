import Head from "next/head";
import NotFound from "@/pages/404";
import { PageLayout } from "@/layouts";
import { Grid } from "@mui/material";
import { TextInput, SelectInput } from "@/components/inputs";
import { Button } from "@material-ui/core";
import { DropDownCategories } from "@/components/category";
import { ImageInput } from "@/components/inputs/ImageInput";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AdminMainLayout from "@/components/Site/dashboardLayout";

import { MdDeleteForever } from "react-icons/md";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { message } from "antd";
import { useRouter } from "next/router";
import { db } from "@/utils/firebaseConfig";
import { useMemo } from "react";
import { uploadImages, deleteImages, deleteImage } from "@/utils/getData";
import useBlogs from "@/hooks/useBlogs";

import { Form, Upload, Input, Select, Switch, InputNumber } from "antd";
import { useTranslation } from "@/context/useTranslation";

// import TextList from "@/components/SiteComponents/form/textList";
// import MultiTextList from "@/components/SiteComponents/form/MultiTextList";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const uploadApi = "https://file-uploader-red.vercel.app";

const colorList = [
  "#001f3f",
  "#0074D9",
  "#7FDBFF",
  "#39CCCC",
  "#3D9970",
  "#2ECC40",
  "#01FF70",
  "#FFDC00",
  "#FF851B",
  "#FF4136",
  "#85144b",
  "#F012BE",
  "#B10DC9",
  "#111111",
  "#AAAAAA",
  "#DDDDDD",
  "#FFFFFF",
  "#1C00ff00",
];

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ direction: "rtl" }],
    [{ color: [...colorList] }, { background: [...colorList] }],
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

export default function BookCreatePage() {
  const countries = [
    { value: "", label: "All countries" },

    { value: "Mexico", label: "Mexico" },
    { value: "North Cyprus", label: "North Cyprus" },
    { value: "Spain", label: "Spain" },
    { value: "Republic Dominica", label: "Republic Dominica" },

    { value: "Portugal", label: "Portugal" },

    { value: "Canada", label: "Canada" },

    { value: "United Arab Emirates", label: "United Arab Emirates" },
  ];

  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });

  const { mutate } = useBlogs();

  const router = useRouter();
  const { translation } = useTranslation();

  const t = useMemo(() => translation ?? {}, [translation]);

  const [files, setFiles] = useState([]);

  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    titlefr: "",
    story: "",
    storyfr: "",
    category: "",

    image: [],

    addBy: "Admin",
  });

  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    if (selectedCountry?.value) {
      setPropertyDetails((prev) => ({
        ...prev,
        category: selectedCountry?.value,
      }));
    }
  }, [selectedCountry]);

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
      const response = await axios.post(
        `${uploadApi}/file/uploads?size=600&hieghtsize=800`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Files Uplaoded successfully", response.data);

      return response?.data?.files;
    } catch (error) {
      console.error("Error deleting files:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      message.loading("جاري إضافة المنتج");

      const uuid = uuidv4();

      let image: string | any = "";

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

        image: images,
      };

      await axios
        .post("/api/blog", updatedDetails)

        .then((res) => {
          console.log(res);
          mutate();
          message.success("Blog added successfully");
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
        <title>إضافة منتج جديد - Outlet Turkey</title>
      </Head>
      <AdminMainLayout>
        <PageLayout title="header.addBook">
          <div className="text-center md:text-2xl"> Add Blog</div>
          <form className=" p-20" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
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
                  name="category"
                  label="Category"
                  // required
                  value={propertyDetails.category}
                  onChange={(value) => handleInputChange("category", value)}
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

              <div className=" my-6">
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
                  Add images
                </Upload>
              </div>

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
