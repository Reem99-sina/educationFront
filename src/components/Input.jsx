import { Box, TextField, Typography } from "@mui/material";

function InputCustom({ value, setValue, name,type="text" ,sx,helperText,error}) {
  return (
    <>
      <Box sx={{ alignSelf: "flex-start", marginX: "auto", marginY: "20px" }}>
        <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
          {name}
        </Typography>
        <TextField
          variant="outlined" 
          helperText={helperText}
          error={error}
          
          value={value}
          placeholder={name}
          onChange={(event) => {
            setValue((pre) => ({ ...pre, [name]: event.target.value }));
          }}
          type={type}

          sx={{
            backgroundColor: "black",
            borderRadius: "8px",

            border: "2px solid gray !important",

            "& .MuiInputBase-input": {
              color: "gray",
            },
            ...sx
          }}
        />
      </Box>
    </>
  );
}
export default InputCustom;
