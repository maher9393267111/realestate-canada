import Head from "next/head";
import { AuthLayout } from "@/layouts";
// import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { PasswordInput, TextInput } from "@/components/inputs";
import { useState ,useMemo } from "react";
import useAuth, { login } from "@/hooks/useAuth";
import { Box } from "@mui/material";
import { Alert } from "@material-ui/lab";
import styled from "styled-components";
import { GoogleAuthButton } from "@/components/button";
import { useTranslation } from "@/context/useTranslation";
import { AnyKindOfDictionary } from "lodash";
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';

import React from 'react'


export const Formstyle = styled.form`
  align-items: center;
`;



const useStyles: any = makeStyles((theme: any) => ({
  form: {
    marginTop: theme.spacing(3),
    minWidth: "70%",
  },
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const INITIAL_USER = {

  email: '',
  password: ''
};


export default function Login() {
  const router = useRouter();
  const classes = useStyles();
  const {mutate} =useAuth()

  const { translation } = useTranslation();

  const t = useMemo(() => translation.login_page ?? {}, [translation]);
  const troot = useMemo(() => translation ?? {}, [translation]);
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);



  const [user, setUser] = React.useState(INITIAL_USER);
const [disabled, setDisabled] = React.useState(true);
// const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState('');

React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true)
}, [user]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
}




  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await login(user);
      localStorage.setItem("user", JSON.stringify(res.data));
      mutate()
      router.push("/");
    } catch (e) {
      setHasError(true);
      setError(e?.message)
      setLoading(false);
    }
  };
  return (
//     <>
//       <Head>
//         <title>Outlet Turkey</title>
    
//         <meta name="description" content="شركة العطور بلاك بيرفوم " />
//         <meta
//             name="keywords"
//             content="Outlet Turkey"
   
//           />



//         <link rel="icon"      href="/logoOutlet.png" />
//       </Head>
//       <AuthLayout dir={troot.dir}>
//         <Typography component={"span"} variant="h5">
//           {/* <FormattedMessage id={"title.login"} /> */}
// {t.title}
//         </Typography>
//         {hasError && (
//           <Box marginTop={3}>
//             <Alert severity="error">
//               <FormattedMessage id={"error.login"} />
//             </Alert>
//           </Box>
//         )}
//         <Form className={classes.form} onSubmit={onSubmit}>
//           <TextInput
//             name="email"
//             required
//             label={t.email}
//             type="email"
//             autoComplete="email"
//             onChange={setEmail}
//           />

//           <PasswordInput
//             name="password"
//             label={t.pass}
//             required={true}
//             autoComplete="password"
//             onChange={setPassword}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading}
//           >
//             {t.send}
//             {/* <FormattedMessage id={"btn.continue"} /> */}
//           </Button>
//           <GoogleAuthButton text={t.google} />
//           <Box marginTop={2}>
//             <NoAccount text={t.no_account} />
//           </Box>
//           <Box marginTop={2}>
//             <ForgerPassword text={t.forget} />
//           </Box>
//         </Form>
//       </AuthLayout>
//     </>

<div dir={troot.dir === 'rtl' ? 'rtl' : 'ltr'} className="signup-area">
<Message
    attached
    icon="settings"
    header={troot.dir === 'rtl' ? 'ابدأ الان' : 'Get starter now'}
    content={troot.dir === 'rtl' ?  'حساب جديد' : 'Create a new account'}  
    color="green"
/>
<Form error={Boolean(error)} loading={loading} onSubmit={onSubmit} >
    <Message 
        error
        header="Oops!"
        content={error}
    />
    <Segment>
    
        <Form.Input 
            fluid
            icon="envelope"
            iconPosition="left"
           
            label={t.email}
            // placeholder={t.email}
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
        />
        <Form.Input 
        className="   !font-estedad"
            fluid
            icon="lock"
            iconPosition="left"
            label={t.pass}
            // placeholder={t.password}
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
        />
        <Button 
        className=" !font-estedad  !bg-primary"
            // icon="signup"
            type="submit"
            content=  {t.send}
            color="green"
            disabled={disabled || loading}
        />
        <button type="submit"> login</button>
    </Segment>
</Form>
<Message attached="bottom" warning>
    <Icon name="help" />
    {t.no_account}
    {/* Existing user? */}
    <Link legacyBehavior href="/auth/register">
        <a>Register</a>
    </Link>
</Message>
</div>


  );
}

function NoAccount({text}:any) {
  return (
    <Link href="/auth/register" >
      <Typography
        component={"span"}
        align="center"
        color={"primary"}
        variant="body2"
      >
        {text}
      </Typography>
    </Link>
  );
}

function ForgerPassword({text}:any) {
  return (
    <Link href="/auth/forget" >
      <Typography
        component={"span"}
        align="center"
        color={"primary"}
        variant="body2"
      >
        {text}
      </Typography>
    </Link>
  );
}
