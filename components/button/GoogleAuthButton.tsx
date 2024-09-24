import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

export const GoogleButton = styled(Button)`
  background-color: #fff !important;
  color: #575757 !important;
  border: 1px solid #575757 !important;
  &:hover {
    background-color: #575757 !important;
    color: #fff !important;
  }

  &:focus {
    background-color: #575757 !important;
    color: #fff !important;
  }
`;

const useStyles: any = makeStyles((theme: any) => ({
  button: {
   // marginBottom: theme?.spacing(2),
  //  marginTop: theme?.spacing(2),
  },
}));
export default function GoogleAuthButton({text}:any) {
  const classes = useStyles();
  return (
    <Link href="/api/google" >
      <GoogleButton
        variant="outlined"
        color="secondary"
        className={classes.button}
        fullWidth
      >
      
      {text} 
      </GoogleButton>
    </Link>
  );
}
