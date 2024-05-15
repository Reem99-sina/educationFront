import { IconButton, InputAdornment } from "@mui/material";

function Password() {
    
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
        InputProps={{
            ...InputProps,
            endAdornment: (
              <InputAdornment position="end" sx={{ margin: 0 }}>
                <IconButton onClick={() => setVisible((old) => !old)}>
                  {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
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
  )
}
export default Password