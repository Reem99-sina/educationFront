import { useMemo, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import Cookies from "js-cookie";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import LoopIcon from "@mui/icons-material/Loop";
import toast from "react-hot-toast";
import config from "../config";
import { useLocation } from "react-router-dom";
function Courses() {
  const token = Cookies.get("token");
  const [PreferCourse, setPreferCourses] = useState([]);
  const location = useLocation();
  const { state } = location;
  const [newCourse, setCourses] = useState();
  let [ispending, setPending] = useState(false);
  const user = useMemo(() => {
    return (
      JSON.parse(sessionStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("activeUser"))
    );
  }, [sessionStorage.getItem("user")]);
  const courses = useMemo(() => {
    return newCourse ? newCourse : user?.courses;
  }, [user, newCourse]);
  const idPreferCourse = useMemo(() => {
    return PreferCourse?.map((ele) => ele);
  }, [PreferCourse, newCourse]);
  const BaseUrl = config.BASEURL;
  const patchCursesPrefer = async (id) => {
    setPending(true);
    await axios
      .patch(
        `${BaseUrl}/api/v1/course/postPeferCourse/${id?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => setPreferCourses(data.user.preferCourses))
      .catch((error) => toast.error(error?.message))
      .finally(() => setPending(false));
  };

  const getuserCoursers = async () => {
    await axios
      .get(`${BaseUrl}/api/v1/course/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setCourses(data.courses);
      })
      .catch((error) => toast.error(error?.message));
  };
  useEffect(() => {
    getuser();
    getuserCoursers();
  }, []);
  const getuser = async () => {
    await axios
      .get(`${BaseUrl}/api/v1/user/${user?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) =>
        setPreferCourses(data.user.preferCourses.map((ele) => ele?._id))
      )
      .catch((error) => toast.error(error?.message));
  };
  useEffect(() => {
    if (state?.result) {
      getuserCoursers();
    }
  }, [state?.result]);
  useEffect(() => {
    setCourses(state?.result);
  }, [state?.result]);
  return (
    <Box
      sx={{
        boxShadow: "2px 2px 10px #888888",
        borderRadius: "8px",
        padding: "2rem",
        margin: "1rem",
      }}
    >
      {courses?.map((ele) => (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
            {ele?.title}
          </Typography>
          <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
            {ele?.description}
          </Typography>
          {user?.role=="student"&&<Button
            sx={{ color: (theme) => theme.palette.primary.main }}
            onClick={() => patchCursesPrefer(ele)}
            disabled={ispending}
          >
            {idPreferCourse?.includes(ele?._id) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </Button>}
          
        </Box>
      ))}
      {courses?.length == 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoopIcon
            sx={{
              animation: "spin 2s linear infinite",
              "@keyframes spin": {
                "0%": {
                  transform: "rotate(360deg)",
                },
                "100%": {
                  transform: "rotate(0deg)",
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
export default Courses;
