import {
  Box,
  Button,
  Container,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import imageLogin from "../assets/studenlogo.png";
import student from "../assets/student.png";
import { useMemo, useState } from "react";
import InputCustom from "../components/Input";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import useRequest from "../hooks/useRequest";
import axios from "axios";
import config from "../config"
import AutorenewIcon from '@mui/icons-material/Autorenew';
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});
function Login() {
  const navigate = useNavigate();
  let [ispending, setPending] = useState(false);
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  const BaseUrl = config.BASEURL;

  const token = useMemo(() => {
    let getCookies = document.cookie.split("; ");
    return getCookies.find((row) => row.startsWith("token="))?.split("=")[1];
  }, [document.cookie]);
  

  const onSubmit = async (e) => {
    e.preventDefault()
    setPending(true);
    const resultValidation = await validationSchema
      .validate(user, { abortEarly: false })
      .then((res) => res)
      .catch(({ errors }) => {
        errors?.map((ele) => toast?.error(ele));
      })
      .finally(() => {
        setPending(false);
      });
      setPending(true);
    if (Boolean(resultValidation)) {
      await axios
        .post(`${BaseUrl}/api/v1/user/login`, user)
        .then((result) => {
            Cookies.set("token",result.data.token)
        //   Cookies.set("token", token);
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          setPending(false);

          navigate("/profile",{user:result.data.user})
        })
        .catch((error) => error?.response?.data?.validateArr?.map((ele)=>toast.error(ele?.message))||toast.error(error?.response?.data?.message))
       
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          lg: "row-reverse",
          md: "row-reverse",
          sm: "column-reverse",
          xs: "column-reverse",
        },
        height: { lg: "100vh", md: "100vh", sm: "100%", xs: "100%" },
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: (theme) => theme.palette.primary.main,
          backgroundImage: `url(${imageLogin})`,
          color: (theme) => theme.palette.common.white,
          padding: "3rem",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "2rem",
          }}
        >
          <Typography variant={"h3"} sx={{ fontSize: "3rem" }}>
            Welcome to student portal
          </Typography>
          <Typography
            component={"p"}
            sx={{ fontSize: "1rem", alignSelf: "flex-start" }}
          >
            login to access your account
          </Typography>
          <Typography
            component={"img"}
            src={student}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Container>
      </Box>
      <Box
        sx={{
          flex: 1,
          backgroundColor: (theme) => theme.palette.common.black,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          color: (theme) => theme.palette.common.white,
          paddingY: { lg: "unset", md: "unset", sm: "2rem", xs: "2rem" },
        }}
      >
        <Box sx={{ padding: "2rem" }}>
          <Typography variant="h3" sx={{ fontSize: "2rem" }}>
            Login
          </Typography>
          <Typography component={"p"} sx={{ fontSize: "1rem" }}>
            enter your account detail
          </Typography>
          <InputCustom
            value={user.email}
            setValue={setUser}
            name={"email"}
            type="email"
          />
          <InputCustom
            value={user.password}
            setValue={setUser}
            name={"password"}
            type={"password"}
          />
           
          
          <Button variant="contained" onClick={onSubmit} >
          {Boolean(ispending)?<AutorenewIcon />:"Login"}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <Typography>Don't have an account?</Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "gray", marginX: "1rem" }}
            onClick={() => navigate("/register")}
          >
            sign up
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default Login;
