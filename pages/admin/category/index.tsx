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
import {
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import axios from "axios";
import { TransitionProps } from "@mui/material/transitions";
import { DeleteIcon, EditIcon } from "@/components/icons";
import { uploadImages ,deleteImage } from "@/utils/getData";

import useCategories from "@/hooks/useCities";

import { Form, Upload, Input, Select, Switch, InputNumber ,message } from "antd";


interface Category {
  _id: string | number;
  name: string;
  description: string;
  cover:string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdminCategory() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });

  const {
    data,
    isLoading,
    error,
    mutate,
  } = useCategories();


  const [categories, setCategories] = useState<Category[]>(data ? data : []);
  const [auxCategories, setAuxCategories] = useState<Category[]>();
  const [fetching, setFetching] = useState<boolean>(false);

  const [file, setFile] = useState("");
  const [image, setImage] = useState("");




  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category>() as any;

  const handleClickOpen = (category: Category) => {
    setOpen(true);
    console.log("category" ,category)
    setSelectedCategory(category);
    setImage(category?.cover)
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(undefined);
    setFile('')
    setImage('')
  };

  // useEffect(() => {
  //   axios
  //     .get("/api/category/handler")
  //     .then((res) => {
  //       const { data } = res;
  //       setCategories(data);
  //       setAuxCategories(data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, [fetching]);



  useEffect(() => {
    if(data) {
     setCategories(data)
    }
     }, [data]);
   


  const handleDelete = async (id: string | number) => {
    if (!confirm("هل انت متأكد من حذف هذا التصنيف؟")) return;
    try {
      await axios.delete(`/api/category/handler/${id}`);
      setFetching(!fetching);
      mutate()
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {


      let newimage: string | any = "";

      if (file && image) {
        await deleteImage(image);
        message.success("file && image Deleted upload new image ");
        newimage = await uploadImages(file, true, "category");
      }
  
      if (!file && image) {
        newimage = image;
      } else if (file && !image) {
        newimage = await uploadImages(file, true, "category");
        message.success("file && NOOOTTT image");
      }


      await axios.put(
        `/api/category/handler/${selectedCategory._id}`,
        {
          name: selectedCategory.name,
          description: selectedCategory.description,
          nametr:selectedCategory.nametr,
          cover:newimage
          
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleClose();
      setFile("")
      setFetching(!fetching);
      mutate()
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      setCategories(data);
    } else {
      const filteredCategories = data?.filter((category:any) => {
        return category.name.toLowerCase().includes(value.toLowerCase());
      });
      setCategories(filteredCategories);
    }
  };

  if (user && user.role !== "admin") return <NotFound />;
  if (!categories) return <Loading />;
  return (
    <>
      <Head>
        <title>Sand n Sea</title>
      </Head>
      <PageLayout title="الاقسام">
        <div className=" !min-h-[70vh]">

       
        <Grid className="!p-20" container spacing={2}>
          <Grid item xs={12} md={9}>
            <TextInput
              type="search"
              label="البحث عن تصنيف"
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Link href="/admin/category/create">
              <Button
                style={{
                  height: 55,
                }}
                variant="contained"
                color="primary"
                fullWidth
              >
                اضافة تصنيف
              </Button>
            </Link>
          </Grid>
          {!isLoading && categories.length > 0 ? (
            map(categories, (category, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="bg-paper">
                  <CardHeader
                    title={
                      <Link
                        className="color-primary"
                        href={`category/${category._id}`}
                      >
                        {category.name}
                      </Link>
                    }
                    subheader={category.description}
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
              label="اسم التصنيف"
              value={selectedCategory?.name}
              focused
              onChange={(e) => {
                setSelectedCategory({
                  ...selectedCategory,
                  name: e,
                });
              }}
            />



<TextInput
              label="اسم التصنيف"
              value={selectedCategory?.nametr}
              focused
              onChange={(e) => {
                setSelectedCategory({
                  ...selectedCategory,
                  nametr: e,
                });
              }}
            />

            <TextInput
              label="وصف التصنيف"
              focused
              value={selectedCategory?.description}
              onChange={(e) => {
                setSelectedCategory({
                  ...selectedCategory,
                  description: e,
                });
              }}
            />


<div>
                <Upload
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
                  Upload Image
                </Upload>
              </div>



              {image && (
              <div className="  w-24 md:w-24 relative">
                <img className=" w-24 h-24  rounded-lg" src={image} alt="" />

                <p
                  onClick={() => setImage("")}
                  className="  !text-red-500 cursor-pointer  font-semibold text-center"
                >
                  Remove
                </p>
              </div>
            )}






          </DialogContent>
          <DialogActions>
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              onClick={handleClose}
            >
              اغلاق
            </Button>
            <Button type="submit" variant="contained" color="primary">
              حفظ التعديلات
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
