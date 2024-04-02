import React from "react";

import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

const Error = () => {
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card
          sx={{
            minWidth: 360,
            maxWidth: 720,
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <Box
            sx={{
              display: `flex`,
              flexDirection: `column`,
              alignContent: `center`,
              padding: `20px`,
            }}
          >
            <Typography
              sx={{ textAlign: `center`, fontSize: `24px`, color: `#0047AB` }}
            >
              404 PAGE NOT FOUND
            </Typography>
          </Box>
        </Card>
      </Paper>
    </>
  );
};

export default Error;
