import React from "react";
import { useEffect, useState, useCallback } from "react";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { Paper, Card } from "@mui/material";

import Typography from "@mui/material/Typography";

import EnhancedTable from "../components/DataTable";

import { loadTasks } from "../api/requests";

const Tasks = () => {
  const authData = useAuthUser();
  const [tasksData, setTasksData] = useState("");

  const getTasksData = useCallback(async () => {
    const response = await loadTasks(authData.id);
    setTasksData(response.data);
  }, [tasksData]);

  useEffect(() => {
    getTasksData();
    const intervalGet = setInterval(() => {
      getTasksData();
      console.log("new TasksData fethch");
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
            maxWidth: 1440,
            height: "fit-content",
            padding: "30px",
          }}
        >
          <Typography
            sx={{ textAlign: `center`, fontSize: `24px`, color: `#0047AB` }}
          >
            Tasks for user: {authData.email}
          </Typography>
          {tasksData ? (
            <EnhancedTable data={tasksData} />
          ) : (
            <Typography align="center" padding={20} fontSize={15}>
              Table is loading...
            </Typography>
          )}
        </Card>
      </Paper>
    </>
  );
};

export default Tasks;
