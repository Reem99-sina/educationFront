import {Navigate, Outlet } from "react-router-dom"

function Home() {
  return (
    <div>
      {/* <Navigate to="/profile"/> */}
      <Outlet/>

      </div>
  )
}
export default Home