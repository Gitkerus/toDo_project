import React from "react";
import { useEffect, useState, useCallback } from "react";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { Paper, Card } from "@mui/material";

import Typography from "@mui/material/Typography";

import EnhancedTable from "../components/DataTable";

const Tasks = () => {
  const authData = useAuthUser();

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
            minWidth: "20%",
            maxWidth: 1440,
            height: "fit-content",
            padding: "30px",
          }}
        >
          <Typography
            sx={{
              textAlign: `center`,
              fontSize: `24px`,
              color: `#0047AB`,
              marginBottom: `20px`,
            }}
          >
            Tasks for user: {authData.email}
          </Typography>
          <EnhancedTable />
        </Card>
      </Paper>
    </>
  );
};

export default Tasks;
