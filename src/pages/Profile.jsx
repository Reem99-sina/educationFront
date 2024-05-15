import { Box, Typography } from "@mui/material";
import back from "../assets/Backpack.png";
import scholar from "../assets/Scholarcap scroll.png";
import college from "../assets/5. College Student.png";
import instructor from "../assets/instructor.webp"
import { useMemo, useEffect, useState } from "react";
import axios from "axios";
import CardInstructor from "../components/CardInstructor";
import toast from "react-hot-toast";
import config from "../config";
// import { Outlet } from "react-router-dom";
function Profile() {
  let [teacher, setTeacher] = useState();
  const BaseUrl = config.BASEURL;
  const user = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("user"))||JSON.parse(sessionStorage.getItem("activeUser"));
  }, [sessionStorage.getItem("user"),sessionStorage.getItem("activeUser")]);
  async function getTeacher() {
    await axios
      .get(`${BaseUrl}/api/v1/user/getAllTeacher`)
      .then(({ data }) => setTeacher(data.findAllStudent))
      .catch((error) => toast.error(error.message));
  }
  useEffect(() => {
    getTeacher();
  }, []);
  return (
    <>
      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(#925FE2, #DFCFF7)",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "center",
          alignItem: "center",
          flexDirection:{lg:"row",md:"row",sm:"column",xs:"column"},
          margin:"1rem"
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            
          }}
        >
          <Typography component="img" src={back} sx={{ width: "20%" }} />
          <Typography component="img" src={college} sx={{ width: "20%" }} />

          <Typography component="img" src={scholar} sx={{ width: "20%" }} />
        </Box>
        <Box sx={{ flex: 1, color: "white", margin: "1rem" }}>
          <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
            welcome back, {user?.userName}
          </Typography>
          <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
            Always stay updated in your student portal
          </Typography>
          <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
            {user?.email}
          </Typography>
          <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
            {user?.role}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginY: "2rem", marginX:"1rem" }}>
        <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
          courses instructor
        </Typography>
        <Box sx={{display:"flex",marginY:"2rem",gap:"2rem",flexDirection:{lg:"row",md:"row",sm:"column",xs:"column"}}}>
          {teacher?.map((ele) => (
            <CardInstructor>
              <Typography
                sx={{ fontWeight: "bold", textTransform: "capitalize" }}
              >
                {ele?.userName}
              </Typography>
              <Typography component="img" src={instructor} sx={{ width: "50%",borderRadius:"50%" }} />

            </CardInstructor>
          ))}
        </Box>
      </Box>
      {/* <Outlet/> */}
    </>
  );
}
export default Profile;
