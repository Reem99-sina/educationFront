import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function RouteElement(route) {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  return (
    <Box
      sx={{
        display: "flex",

        justifyContent: "flex-start",
        cursor: "pointer",
        backgroundColor: pathname == route.route ? "white" : "transparent",
        padding: "20px",
      }}
      onClick={() => Boolean(route.route)?navigate(route.route):route.component()}
    >
      {route.icon}
      <Typography
        component={"p"}
        sx={{
          fontSize: "1rem",
          alignSelf: "flex-start",
          marginX: "1rem",
          textTransform: "capitalize",
          display: { lg: "block", md: "block", sm: "none", xs: "none" },
        }}
      >
        {route.name}
      </Typography>
    </Box>
  );
}
export default RouteElement;
