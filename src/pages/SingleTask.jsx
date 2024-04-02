import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { loadSingleTask } from "../api/requests";

import { Paper, Card, Typography, Button } from "@mui/material";

const SingleTask = () => {
  const navigate = useNavigate();
  const authData = useAuthUser();
  const { id } = useParams();
  const [singleTaskData, setSingleTaskData] = useState(null);

  const getTaskData = useCallback(async () => {
    const response = await loadSingleTask(authData.id, id);
    setSingleTaskData(response.data[0]);
    console.log(response.data[0]);
  }, [singleTaskData]);

  const handleClick = () => {
    return navigate("/tasks");
  };

  useEffect(() => {
    getTaskData();
    const intervalGet = setInterval(() => {
      getTaskData();
      console.log("new singleTaskData fethch");
    }, 300000);

    return () => clearInterval(intervalGet);
  }, []);

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
            width: "50%",
            maxWidth: 1440,
            height: "fit-content",
            padding: "30px",
          }}
        >
          {singleTaskData ? (
            <>
              <Typography
                sx={{
                  fontSize: "25px",
                  color: "#0047AB",
                  marginBottom: "15px",
                }}
              >
                Task name: {singleTaskData.name}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>
                Status: {singleTaskData.status}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>
                Priority: {singleTaskData.priority}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>
                Description: {singleTaskData.description}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>
                Task Date : {singleTaskData.date}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>
                Expected Time : {singleTaskData.expectedTime}
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>
                Time Spend: {singleTaskData.spentedTime}
              </Typography>
              <Button
                variant="outlined"
                sx={{ marginTop: "20px" }}
                onClick={handleClick}
              >
                Back to task list
              </Button>
            </>
          ) : (
            <Typography align="center" padding={20} fontSize={25}>
              Task is not found
            </Typography>
          )}
        </Card>
      </Paper>
    </>
  );
};

export default SingleTask;
