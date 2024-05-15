import axios from "axios";
import Cookies from "js-cookie";
import config from "../config"
import toast from "react-hot-toast";

const token = Cookies.get("token");
const BaseUrl = config.BASEURL;

export const getuserCourserSearch = async (search) => {
  return await axios
      .get(`${BaseUrl}/api/v1/course/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => (data.courses.filter((ele)=>ele.title.includes(search))))
      .catch((error) => toast.error(error?.message));
  };