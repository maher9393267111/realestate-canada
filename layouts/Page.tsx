import { Box, Typography, Divider, Paper, Container } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { motion } from "framer-motion";

const useStyles: any = makeStyles((theme: any) => ({
  title: {
     padding: theme?.spacing(2),
    marginBottom: "1rem",
  },
}));

export default function Page({ children, title ,dir }: any) {
  const classes: any = useStyles();
  return (
//     <Container
//     className=" !min--[100vh] !bg-white"
//       sx={{
    
//         width:"100%",
        
       
//       }}
//     >
//       <Paper
//       className=" !h-full "
//         sx={{
//            padding: "0px",
//            paddingTop:"0px",
//           alignItems: "center",
//           justifyContent: "center",
//           display: "flex",
//           flexDirection: "column",
//            height: "100%",
//            minHeight:"100%",
//           width: "100%",
//         }}
//       >
  
//         <motion.section
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 2 }}
//         >
//           <div dir={dir} className="!min-h-scree">

//                     {children}
// </div>


//         </motion.section>
//       </Paper>


//     </Container>



    <div className=" bg-white p-3 m:px-8 mi--[100vh]">
           <motion.section
           initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}    >
          {children}
        </motion.section>
    </div>
  

  );
}
