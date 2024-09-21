import { TextInput } from "@/components/inputs";
import { PageLayout } from "@/layouts";
import {
  Card,
  Grid,
  CardHeader,
  IconButton,
  Slide,
  Dialog,
} from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { NoData } from "@/components/empty";
import { map } from "lodash";
import NotFound from "@/pages/404";
import useAuth from "@/hooks/useAuth";
import { CircularLoading as Loading } from "@/components/loading";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import {
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import axios from "axios";
import { TransitionProps } from "@mui/material/transitions";
import { DeleteIcon, EditIcon } from "@/components/icons";
import { uploadImages, deleteImage } from "@/utils/getData";

import useCountries from "@/hooks/useCountries";

import {
  Form,
  Upload,
  Input,
  Select,
  Switch,
  InputNumber,
  message,
} from "antd";
import AdminMainLayout from "@/components/Site/dashboardLayout";
const uploadApi = "https://file-uploader-red.vercel.app";
import { ImageEndpoint } from "@/utils/global";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });



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

interface Category {
  _id: string | number;
  title: string;
  titlefr: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdminAllCountries() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });

  const { data, isLoading, error, mutate } = useCountries();

  const [categories, setCategories] = useState<Category[]>(data ? data : []);
  const [auxCategories, setAuxCategories] = useState<Category[]>();
  const [story, setStory] = useState("");
  const [storyfr, setStoryfr] = useState("");
  const [fetching, setFetching] = useState<boolean>(false);

  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category>() as any;

  const handleClickOpen = (category: Category) => {
    setOpen(true);
    console.log("category", category);

    setImage(category?.cover);
    setSelectedCategory(category);
    setStory(category?.story);
    setStoryfr(category?.storyfr);

    // setImage(category?.cover)
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(undefined);
    setStory("")
    setStoryfr("")
    setFile("");
    setImage("");
  };

  const handleUploadImage2 = async (file: any, logo: any) => {
    try {
      const formData = new FormData();

      formData.append("image", file);

      console.log("File Data", file);

      const endpoint = logo
        ? `${uploadApi}/file/upload?size=450&hieghtsize=450`
        : `${uploadApi}/file/upload?size=600&hieghtsize=800`;
      //?size=${(size = 1200)}&&hieghtsize=${(hieghtSize = 1000)}
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

  const handleDelete2 = async (fileToDelete) => {
    try {
      console.log("FILE TO DLEETe-->", fileToDelete);
      const res = await axios.delete(
        `${uploadApi}/file/delete?fileName=${fileToDelete}`
      );
      message.success("File Deleted successfully");
      console.log("File deleted successfully", res);
    } catch (error) {
      message.error("error deleting image file");
      console.error("Error deleting files:", error);
    }
  };

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handleDelete = async (id: string | number) => {
    if (!confirm("هل انت متأكد من حذف هذا التصنيف؟")) return;
    try {
      await axios.delete(`/api/city/handler/${id}`);
      //  await handleDelete2(image);
      message.success("Country deleted successfully");
      mutate();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let newimage: string | any = "";

      if (file && image) {
        // await deleteImage(image);
        await handleDelete2(image);
        message.success("file && image delete old ");
        // newimage = await uploadImages(file, true, "book");

        newimage = await handleUploadImage2(file, false);
      }

      if (file && !image) {
        message.success("file ONLYYYY ");
        // newimage = await uploadImages(file, true, "book");

        newimage = await handleUploadImage2(file, false);
      }

      console.log("NEWW image", newimage, file);

      await axios.put(
        `/api/country/handler/${selectedCategory._id}`,
        {
          title: selectedCategory.title,
          titlefr: selectedCategory.titlefr,
          story:story,
          storyfr:storyfr,
          cover: newimage ? newimage : selectedCategory?.cover,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleClose();

      message.success("City updated successfully");

      mutate();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      setCategories(data);
    } else {
      const filteredCategories = data?.filter((country: any) => {
        return country.title.toLowerCase().includes(value.toLowerCase());
      });
      setCategories(filteredCategories);
    }
  };

  if (user && user.role !== "admin") return <NotFound />;
  if (!categories) return <Loading />;
  return (
    <>
      <Head>
        <title>Outlet Turkey</title>
      </Head>
      <AdminMainLayout>
        <PageLayout title="الاقسام">
          <div className=" !min-h-[70vh]">
            <Grid className="!p-20" container spacing={2}>
              <Grid item xs={12} md={9}>
                <TextInput
                  type="search"
                  label="Search.."
                  onChange={handleSearch}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Link href="/admin/city/create">
                  <Button
                    style={{
                      height: 55,
                    }}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Add Country
                  </Button>
                </Link>
              </Grid>
              {!isLoading && categories?.length > 0 ? (
                map(categories, (category, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card className="bg-paper">
                      <CardHeader
                        title={
                          <Link
                            className="color-primary"
                            href={`category/${category._id}`}
                          >
                            {category?.title}
                          </Link>
                        }
                        // subheader={category.description}
                        action={
                          <React.Fragment>
                            <IconButton
                              className="btn-spacing"
                              onClick={() => handleClickOpen(category)}
                            >
                              <EditIcon size={20} fill="#c45e4c" />
                            </IconButton>
                            <IconButton
                              className="btn-spacing"
                              onClick={() => handleDelete(category._id)}
                            >
                              <DeleteIcon size={20} fill="#575757" />
                            </IconButton>
                          </React.Fragment>
                        }
                      />
                    </Card>
                  </Grid>
                ))
              ) : (
                <NoData description="لا توجد تصنيفات" />
              )}
            </Grid>
          </div>
        </PageLayout>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
        >
          <DialogTitle>{"تعديل التصنيف"}</DialogTitle>
          <form onSubmit={handleUpdate}>
            <DialogContent>
              <TextInput
                label="Country title"
                value={selectedCategory?.title}
                // focused
                onChange={(e) => {
                  setSelectedCategory({
                    ...selectedCategory,
                    title: e,
                  });
                }}
              />

              <TextInput
                label="Country french title"
                value={selectedCategory?.titlefr}
                // focused
                onChange={(e) => {
                  setSelectedCategory({
                    ...selectedCategory,
                    titlefr: e,
                  });
                }}
              />

              <Grid item xs={12} md={12}>
                English Description
                <ReactQuill
                  modules={modules}
                  value={story}
                  onChange={(value) => setStory(value)}
                  className="mt-1"
                />
              </Grid>

              <Grid item xs={12} md={12}>
                French Description
                <ReactQuill
                  modules={modules}
                  value={storyfr}
                  onChange={(value) => setStoryfr(value)}
                  className="mt-1"
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

                {image}

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
            </DialogContent>
            <DialogActions>
              <Button
                type="reset"
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </AdminMainLayout>
    </>
  );
}
