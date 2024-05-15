import { Box } from "@mui/material"

function CardInstructor({ children}) {
  return (
    <Box sx={{boxShadow:"2px 2px 10px #888888",borderRadius:"8px",padding:"2rem",display:"flex",alignItem:"center",justifyContent:"space-around"}}>
        {children}
    </Box>
  )
}
export default CardInstructor