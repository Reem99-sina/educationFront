import axios from "axios";
import Cookies from "js-cookie";
import config from "../config"
import toast from "react-hot-toast";

const token = Cookies.get("token");
const BaseUrl = config.BASEURL;
export const getActive=async()=>{
return await axios.get("http://localhost:12400/api/v1/user/getactiveUser")
}