import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Typography, useTheme } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";

import { tokens } from "../theme";

const EditTask = (id) => {
  const navigate = useNavigate();
  const editTaskFunc = useCallback(
    (id) => () => {
      navigate(`/assigned-task/${id}`);
    },
    [navigate]
  );
  return editTaskFunc(id);
};

const GetUser = (userId) => {
  const { users } = useSelector((state) => state.users);
  const user = users.find((user) => user.id === userId);
  if (users.length > 0) {
    return user.name;
  } else {
    return "";
  }
};

const GetAssignedToUsers = (usersArray) => {
  return usersArray.map((user) => user.name).join(", ");
};

export const AssignedTaskColumns = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return [
    {
      field: "task",
      headerName: "Task",
      flex: 2,
      cellClassName: "name-column--cell",
      minWidth: 200,
    },
    {
      field: "createdAt",
      headerName: "Creation Date",
      type: "date",
      headerAlign: "left",
      align: "left",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "user",
      headerName: "Created by",
      flex: 1,
      minWidth: 100,
      valueGetter: ({ value }) => GetUser(value),
    },
    {
      field: "users",
      headerName: "Assigned to",
      flex: 1,
      minWidth: 100,
      valueGetter: ({ value }) => GetAssignedToUsers(value),
    },
    {
      field: "deadline",
      headerName: "Deadline",
      type: "date",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="120px"
            m="0 auto"
            p="5px 10px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "In progress"
                ? colors.status.yellow
                : colors.status.green
            }
            color={"black"}
            borderRadius="4px"
          >
            {status === "In progress" && <PendingIcon />}
            {status === "Completed" && <CheckCircleIcon />}
            <Typography sx={{ ml: "5px", fontWeight: "600" }}>
              {status}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={EditTask(params.id)}
        />,
      ],
    },
  ];
};
