import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import loginIcon from '../imgs/login.png'
import bgImg from '../imgs/bgImg.jpg'
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import SERVER_URL from '../utils/Server_Url';
const defaultTheme = createTheme();

export default function SignInSide() {
  const handleUserLogin= async (email,password)=>{
    const resp=await fetch(`${SERVER_URL}/auth/signin`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({email,password })
    })
    const data = await resp.json();
    console.log(data)
    localStorage.setItem("userData", JSON.stringify(data.user));
    localStorage.setItem("userToken", JSON.stringify(data.token));
    if (resp.status === 200) {
      navigate(`/${data.user.username}-${data.user.id}`);
      toast("You are successfully Logged In!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
        theme: "colored",
      });
    }

    else if(resp.status===404 || resp.status===401){
      toast("Invalid Email or Password!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
    }
   
    else{
      toast("Network Issue!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
  }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email=data.get('email');
    let password=data.get('password');
    if(!email || !password){
      toast('All fields are Mandatory!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type:'error'
        });
    return;
      }
    handleUserLogin(email,password);
  };
  const navigate=useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* <LockOutlinedIcon /> */}
              <img src={loginIcon} alt="loginIcon" style={{width:'60%',height:'60%'}}></img>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid style={{display:'flex',justifyContent:'center'}} container>
                <Grid item>
                  <Link href="#" onClick={()=>navigate('/signup')} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}