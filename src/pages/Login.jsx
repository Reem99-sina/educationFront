import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import imageLogin from "../assets/studenlogo.png";
import student from "../assets/student.png";
import { useEffect, useMemo, useState } from "react";
import InputCustom from "../components/Input";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import useRequest from "../hooks/useRequest";
import axios from "axios";
import config from "../config"
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { addActive } from "../action/addActive";
const validationSchema = Yup.object().shape({
  email: Yup.string()
  .email({ email: "Invalid email" })
  .required({ email: "Required" }),
password: Yup.string()
  .required()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must be at least 8 characters and has uppercase letter and lowercase letter and special character"
  ),
});
function Login() {
  const navigate = useNavigate();
  let [error, setError] = useState();

  let [ispending, setPending] = useState(false);
  let [user, setUser] = useState({
    email: "",
    password: "",
    active:false
  });
  const BaseUrl = config.BASEURL;

  const token = useMemo(() => {
    
    return Cookies.get("token")
  }, [Cookies.get("token")]);


  const onSubmit = async (e) => {
    e.preventDefault()
    setPending(true);
    const resultValidation = await validationSchema
      .validate(user, { abortEarly: false })
      .then((res) => {
        setError({})
       return res
      })
      .catch(({ errors }) => {
        errors?.map((ele) =>
          typeof ele == "string"
            ? setError((pref) => ({  ...pref,"password": ele }))
            : setError((pref) => ({  ...pref,...ele }))
        );
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
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          setPending(false);

          navigate("/profile",{user:result.data.user})
        })
        .catch((error) =>
          error?.response?.data?.validateArr?.map((ele) =>
            toast.error(ele?.message)
          ) || setError( error?.response?.data)).finally(()=>setPending(false))
       
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
            error={Boolean(error?.email)}
            helperText={error?.email}
          />
          <InputCustom
            value={user.password}
            setValue={setUser}
            name={"password"}
            type={"password"}
            error={Boolean(error?.password)}
            helperText={error?.password}
          />
           
           <FormControlLabel control={<Checkbox  checked={user.active} onChange={(e)=>setUser({...user,active:e.target.checked})}/>} label="Remember me" />
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
