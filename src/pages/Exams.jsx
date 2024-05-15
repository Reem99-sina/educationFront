import { useMemo, useEffect, useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";

import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import config from "../config";

function Exams() {
  const token = Cookies.get("token");
  const [open, setOpen] = useState(false);
  const [newExams, setExams] = useState();
  const BaseUrl = config.BASEURL;

  const user = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("user"));
  }, [sessionStorage.getItem("user")]);
  const exams = useMemo(() => {
    return newExams ? newExams : user?.exams;
  }, [user, newExams]);

  const getuser = async () => {
    await axios
      .get(`${BaseUrl}/api/v1/exams/exams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => setExams(data.exams))
      .catch((error) => toast.error(error?.message));
  };
  useEffect(() => {
    getuser();
  }, []);
  return (
    <Box
      sx={{
        boxShadow: "2px 2px 10px #888888",
        borderRadius: "8px",
        padding: "2rem",
        margin: "1rem",
      }}
    >
      {exams.map((ele) => (
        <Box key={ele?.title} sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontWeight: "bold", textTransform: "capitalize" }}>
            {ele?.title}
          </Typography>
          <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
            {ele?.description}
          </Typography>
          <Button
            sx={{ color: (theme) => theme.palette.primary.main }}
            onClick={() => setOpen(true)}
          >
            see more
          </Button>
          <Modal
            open={Boolean(open)}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              "& .MuiBackdrop-root": { backgroundColor: "rgba(0,0,0,16%)" },
            }}
          >
            <Box>
              {ele &&
                ele?.questions &&
                ele?.questions?.map((question) => (
                  <Box
                    key={question}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                      width: 400,
                      maxWidth: "90%",
                    }}
                  >
                    <Typography
                      aria-labelledby="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      {question?.question}
                    </Typography>
                    <Typography
                      aria-describedby="modal-modal-description"
                      sx={{ mt: 2 }}
                    >
                      {question?.answer}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Modal>
        </Box>
      ))}
      {exams.length == 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GppMaybeIcon />
          <Typography>no exams yet added</Typography>
        </Box>
      )}
    </Box>
  );
}
export default Exams;
