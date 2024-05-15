import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Auth from "./components/Auth";
import { Slider, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Exams from "./pages/Exams";
import Courses from "./pages/Courses";

import SlideBar from "./components/SlideBar";
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <Auth>
                  <SlideBar>
                    <Home />
                      
                    
                  </SlideBar>
                </Auth>
              }
            >
              <Route path="profile" element={<Profile />} />
              <Route path="exams" element={<Exams />} />
              <Route path="courses" element={<Courses />} />
            </Route>

            {/* <Route path="/sign-up" element={<Register />} />
            <Route
              path="/home"
              element={
                <Auth>
                  <Home />
                </Auth>
              }
            /> */}
          </Routes>
        </BrowserRouter>
        {/* <Toaster /> */}
      </ThemeProvider>
    </>
  );
}

export default App;
