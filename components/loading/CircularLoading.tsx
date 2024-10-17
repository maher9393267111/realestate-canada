import { Box } from "@mui/material";
import { CircularProgress } from "@material-ui/core";
import Head from "next/head";
export function CircularLoading() {
  return (
    <div className=" min-h-[100vh]">
      <Head>
        <title> اهلا بك في - Sand n Sea</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5rem",
        }}
      >
        <CircularProgress />
      </Box>
    </div>
  );
}
