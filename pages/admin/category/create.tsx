import { TextInput } from "@/components/inputs";
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

export default function CreateCategory() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const [name, setName] = useState("");
  const [nametr, setNametr] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let image: string | any = "";

    if (!file) {
      return message.error("يجب اختيار الصورة ");
    }

    if (file) {
      image = await uploadImages(file, true, "category");
      message.success("تم تحميل الصورة بنجاح");
    }

    await axios
      .post("/api/category/", {
        name,
        nametr,
        description,
        cover: image,
      })
      .then((res) => {
        //       window.location.href = `/admin/category`;
      })
      .catch((err) => {
        message.error("حدث خطأ أثناء إنشاء التصنيف");
      });
  };

  if (user && user.role !== "admin") return <NotFound />;
  return (
    <div className="cart-area !bg-white">
      <Head>
        <title>إنشاء تصنيف - Sand n Sea</title>
      </Head>
      <PageLayout title="اضافة قسم جديد">
        <form className="  !p-20" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextInput
                name="name"
                label="اسم التصنيف"
                required
                value={name}
                onChange={setName}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextInput
                name="name"
                label="اسم التصنيف باللغة الانكليزية"
                required
                value={nametr}
                onChange={setNametr}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextInput
                name="description"
                label="وصف التصنيف"
                required
                multiline
                rows={4}
                value={description}
                onChange={setDescription}
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
            </Grid>
            <Grid item xs={12} md={12}>
              <Button type="submit" variant="contained" color="primary">
                إنشاء التصنيف
              </Button>
            </Grid>
          </Grid>
        </form>
      </PageLayout>
    </div>
  );
}
