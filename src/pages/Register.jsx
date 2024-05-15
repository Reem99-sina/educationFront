import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import imageLogin from "../assets/studenlogo.png";
import student from "../assets/student.png";
import { useState } from "react";
import InputCustom from "../components/Input";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import config from "../config";
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
  userName: Yup.string().required({ userName: "Required" }),
  role: Yup.string({ role: "role should be one of teacher or student" }),
});
function Register() {
  const navigate = useNavigate();
  let [ispending, setPending] = useState(false);
  let [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
    role: "student",
  });
  let [error, setError] = useState();
  const BaseUrl = config.BASEURL;

  const onSubmit = async () => {
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
    if (Boolean(resultValidation)) {
      await axios
        .post(`${BaseUrl}/api/v1/user/register`, user)
        .then((result) => {
          navigate("/sign-in");
        })
        .catch(
          (error) =>
            error?.response?.data?.validateArr?.map((ele) =>
              toast.error(ele?.message)
            ) || setError( error?.response?.data)
        )
        .finally(() => {
          setPending(false);
        });
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
        height: { lg: "100%", md: "100%", sm: "100%", xs: "100%" },
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
            register to access your account
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
        <Box sx={{ padding: "2rem",marginX:"auto" }}>
          <Typography variant="h3" sx={{ fontSize: "2rem" }}>
            Register
          </Typography>
          <Typography component={"p"} sx={{ fontSize: "1rem" }}>
            create your account detail
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
          <InputCustom
            value={user.userName}
            setValue={setUser}
            name={"userName"}
            type={"userName"}
            error={Boolean(error?.userName)}
            helperText={error?.userName}
          />
          <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }} >
            role
          </Typography>
          <TextField sx={{width:"0px",height:"0px"}} helperText={error?.role}error={Boolean(error?.role)}disabled={true}/>
          <RadioGroup
            defaultValue="teacher"
            value={user.role}
            onChange={(e) => {
              setUser((pre) => ({ ...pre, role: e.target.value }));
            }}
          >
            <FormControlLabel
              value="teacher"
              control={<Radio sx={{ color: "white" }} />}
              label="Teacher"
            />
            <FormControlLabel
              value="student"
              control={<Radio sx={{ color: "white" }} />}
              label="Student"
            />
          </RadioGroup>
          <Button variant="contained" onClick={onSubmit} disabled={ispending}>
            Register
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
          <Typography>l have already account?</Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "gray", marginX: "1rem" }}
            onClick={() => navigate("/sign-in")}
          >
            sign in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default Register;
