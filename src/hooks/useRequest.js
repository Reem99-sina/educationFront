import axios from "axios";
import Cookies from "js-cookie";

const useRequest = ({ path, method, params }) => {
  const token = Cookies.get("token");
 const request= axios({
    baseURL: "",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params:params,
    method:method,
    url: path,
  }).then((res)=>({data:res.data,status:res.status})).catch((err)=>({err}))
  return request
};
export default useRequest;
