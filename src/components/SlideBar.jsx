import { Box, Typography } from "@mui/material";
import student from "../assets/Graduation.png";
import {useRoutes } from "../routes";
import RouteElement from "./RouteElement";
import InputCustom from "./Input";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import config from "../config";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { getuserCourserSearch } from "../action/getCourse";
import { useNavigate } from "react-router-dom";

function SlideBar({ children }) {
    const routes =useRoutes()
    const navigate=useNavigate()
    const BaseUrl = config.BASEURL;
    let [searchCourses,setSearchCourses]=useState({
      course:""
    })
    let [course,setCourses]=useState()
    const getuserCoursers = async () => {
      await axios
        .get(`${BaseUrl}/api/v1/course/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => setCourses(data.courses))
        .catch((error) => toast.error(error?.message));
    };
    useEffect(() => {
      getuserCoursers();
    }, []);
    const token = useMemo(() => {
      return Cookies.get("token");
    }, [Cookies.get("token")]);
    async function search(){
     const result= await getuserCourserSearch(searchCourses.course)
    if(result.length>0){
      navigate("/courses",{state:{result}})
    }
    }
    
  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: (theme) => theme.palette.common.white,
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: "91.5vh",
            backgroundColor: (theme) => theme.palette.primary.main,
            borderRadius: "8px",
            margin: "2rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              component={"img"}
              src={student}
              sx={{ width: "50%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          {routes.map((route) => (
           <RouteElement key={route.key} {...route}/>
          ))}
        </Box>
        <Box sx={{ flex: 5,marginY:"2rem" }} onChange={()=>search()}>
          <InputCustom sx={{backgroundColor:"white",width:"95%"}} value={searchCourses.course}setValue={setSearchCourses}name={"course"}/>
          {children}
          </Box>
      </Box>
    </>
  );
}
export default SlideBar;
