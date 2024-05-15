import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
function Auth({ children }) {
  const token = useMemo(() => {
    return Cookies.get("token");
  }, [Cookies.get("token")]);
 
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("user"));
  useEffect(()=>{
    if(user?.role != "student"){
        toast.error("student can enter home page not teacher")

    }
  },[user?.role])
  return (
    <>
      {token!="undefined"&&token && user.role == "student" ? (
        children
      ) :<Navigate to="/sign-in" />}
    </>
  );
}
export default Auth;
