import * as React from "react";

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { loadingTasksData } from "../api/apiRequests";

import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const headCells = [
  {
    id: "name",
    alignRight: false,
    label: "Name",
  },
  {
    id: "description",
    alignRight: true,
    label: "Description",
  },
  {
    id: "status",
    alignRight: true,
    label: "Status",
  },
];

function EnhancedTableHead(props) {
  const { expanded, orderBy, order, handleSorting } = props;

  return (
    <TableHead sx={{ backgroundColor: "lightgrey" }}>
      <TableRow>
        {expanded ? (
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.alignRight ? "right" : "left"}
              padding={"normal"}
            >
              <TableSortLabel
                id={headCell.id}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={handleSorting}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))
        ) : (
          <TableCell key={headCells[0].id} align={"center"} padding={"normal"}>
            <TableSortLabel
              id={headCells[0].id}
              active={orderBy === headCells[0].id}
              direction={orderBy === headCells[0].id ? order : "asc"}
              onClick={handleSorting}
            >
              {headCells[0].label}
            </TableSortLabel>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  handleSorting: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function EnhancedTable() {
  const authData = useAuthUser();
  const navigate = useNavigate();
  const [tasksData, setTasksData] = useState("");
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("");
  const [urlParams, setUrlParams] = useState({ author: authData.id });
  const [expanded, setExpanded] = useState(false);

  const getTasksData = useCallback(
    async (urlParams) => {
      const response = await loadingTasksData(urlParams);
      setTasksData(response.data);
    },
    [tasksData]
  );

  useEffect(() => {
    if (orderBy !== "") {
      setUrlParams({ author: authData.id, _sort: orderBy, _order: order });
    }
  }, [order, orderBy]);

  useEffect(() => {
    getTasksData(urlParams);
    const intervalGet = setInterval(() => {
      getTasksData(urlParams);
      console.log("new TasksData fetch");
    }, 300000);

    return () => clearInterval(intervalGet);
  }, [urlParams]);

  //   Функция для перехода на страницу отдельной задачи
  const handleClick = (path) => {
    return navigate(`/task/${path}`);
  };

  //   Функция обработки клика сортировки
  const handleSorting = (e) => {
    if (orderBy === e.currentTarget.id) {
      if (order === "desc") {
        setOrder("asc");
      } else {
        setOrder("desc");
      }
    } else {
      setOrderBy(e.currentTarget.id);
      setOrder("asc");
    }
  };

  const handleChangeExpanded = (event) => {
    setExpanded(event.target.checked);
  };

  const handleResetSorting = () => {
    setUrlParams({ author: authData.id });
    setOrderBy("");
  };

  if (tasksData) {
    return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 560 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                expanded={expanded}
                handleSorting={handleSorting}
              />
              <TableBody>
                {tasksData.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(row.id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: "pointer" }}
                    >
                      {expanded ? (
                        <>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            sx={{
                              width: "30%",
                            }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              width: "50%",
                            }}
                          >
                            {row.description}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              width: "20%",
                            }}
                          >
                            {row.status}
                          </TableCell>
                        </>
                      ) : (
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          align="center"
                        >
                          {row.name}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <FormControlLabel
          control={
            <Switch checked={expanded} onChange={handleChangeExpanded} />
          }
          label="Expanded Tasks"
        />
        <Button onClick={handleResetSorting} variant="outlined">
          Reset Sorting
        </Button>
      </Box>
    );
  } else {
    return (
      <Typography align="center" padding={20} fontSize={25}>
        Table is loading...
      </Typography>
    );
  }
}
