import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { getActive } from "../action/addActive";
function Auth({ children }) {
  const token = useMemo(() => {
    return Cookies.get("token");
  }, [Cookies.get("token")]);
 
  const location = useLocation();
  const user = useMemo(()=>{
    return JSON?.parse(sessionStorage?.getItem("user"))
  },[sessionStorage?.getItem("user")]);
  const activeUser = useMemo(()=>{
    return JSON?.parse(sessionStorage?.getItem("activeUser"))
   },[sessionStorage?.getItem("activeUser")]);


  useEffect(()=>{
    getActive()
    .then(({data})=>{sessionStorage.setItem("activeUser",JSON.stringify(data?.user));Cookies.set("token",data?.token)})
    .catch((error)=>console.log(error,"result"))
    
  },[])
  return (
    <>
      {(token!="undefined"&&token)||Boolean(activeUser)  ? (
        children
      ) :<Navigate to="/sign-in" />}
    </>
  );
}
export default Auth;
