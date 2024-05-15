import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import Exams from "./pages/Exams";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom"
import Cookies from 'js-cookie';

export const useRoutes =()=>{
    const navigate=useNavigate()
    return [
  {
    name: "profile",
    key: "profile",
    route: `/profile`,
    icon: <PersonOutlineIcon size="12px" />,
    component: <Profile />,
  },
  {
    name: "exams",
    key: "exams",
    route: `/exams`,
    icon: <MarkunreadMailboxIcon size="12px" />,
    component: <Exams />,
  },
  {
    name: "courses",
    key: "courses",
    route: `/courses`,
    icon: <GolfCourseIcon size="12px" />,
    component: <Courses />,
  },
  {
    name: "logout",
    key: "logout",
    
    icon: <LogoutIcon size="12px" />,
    component: function(){
       
        Cookies.remove("token")
        sessionStorage.removeItem("user")
        navigate("/sign-in")
    },
  },
];}
