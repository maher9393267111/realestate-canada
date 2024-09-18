import { TextInput ,SelectInput  } from "@/components/inputs";
import { PageLayout } from "@/layouts";
import { Button } from "@material-ui/core";
import { Grid } from "@mui/material";
import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/pages/404";
import { useState } from "react";
import axios from "axios";
import { message, Upload } from "antd";
import { uploadImages, deleteImage } from "@/utils/getData";
import AdminMainLayout from "@/components/Site/dashboardLayout";
import useCountries from "@/hooks/useCountries";
const uploadApi = "https://file-uploader-red.vercel.app";



export default function CreateCountry() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const [title, setTitle] = useState("");
  const [titlefr, setTitlefr] = useState("");
  const [description, setDescription] = useState("");

  
  const [file, setFile] = useState("");

  const handleUploadImage2 = async (file: any, logo: any) => {
    try {
      const formData = new FormData();

      formData.append("image", file);

      console.log("File Data", file);

      const endpoint = logo
        ? `${uploadApi}/file/upload?size=650&&hieghtsize=800`
        : `${uploadApi}/file/upload`;
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




  const {mutate} = useCountries()





  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();


    let image: string | any = "";

    if (!file) {
      return message.error("يجب اختيار الصورة ");
    }

    if (file) {
      //  image = await uploadImages(file, true, "book");
      image = await handleUploadImage2(file, false);
      message.success("تم تحميل الصورة بنجاح");
    }
    await axios
      .post("/api/country", {
        title,
        titlefr,
        cover:image
      })
      .then((res) => {
        mutate()
        message.success("Category added successfully")
        //       window.location.href = `/admin/category`;
      })
      .catch((err) => {
        message.error(err?.message);
      });
  };

  const handleTitle = (value: string) => {
    setTitle(value);
  };

  const handleTitleFr = (value: string) => {
    setTitlefr(value);
  };

  if (user && user.role !== "admin") return <NotFound />;
  return (
    <div className="cart-area !bg-white">
      <Head>
        <title>Add country</title>
      </Head>
      <AdminMainLayout>
        <PageLayout title="اضافة قسم جديد">
          <form className="  !p-20" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextInput
                  name="name"
                  label="Country title"
                  required
                  value={title}
                  onChange={handleTitle}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextInput
                  name="name"
                  label="Country title french"
                  required
                  value={titlefr}
                  onChange={handleTitleFr}
                />
                
              </Grid>


             
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

            






              <Grid item xs={12} md={12}>
                <Button type="submit" variant="contained" color="primary">
                  إنشاء التصنيف
                </Button>
              </Grid>
            </Grid>
          </form>
        </PageLayout>
      </AdminMainLayout>
    </div>
  );
}
