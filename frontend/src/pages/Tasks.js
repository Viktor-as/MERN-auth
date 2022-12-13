import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../components/Spinner";
import { Columns } from "../components/TaskTableColumns";
import { AssignedTaskColumns } from "../components/AssignedTaskTableColumns";
import PageHeading from "../components/PageHeading";
import TabPanel from "../components/TabPanel";

import { Box, useTheme, Tabs, Tab } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";

import { getTasks, getAssignedTasks, reset } from "../features/tasks/taskSlice";
import { getUsers } from "../features/users/usersSlice";

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

function Tasks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, assignedTasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );
  const { users } = useSelector((state) => state.users);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (user && tasks.length === 0) {
      dispatch(getTasks());
    }
    if (user && assignedTasks.length === 0) {
      dispatch(getAssignedTasks());
    }
    if (user && users.length === 0) {
      dispatch(getUsers());
    }
    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Box m="40px">
        <PageHeading title="TASKS" subtitle="Your tasks list" />
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="Tasks tabs"
          >
            <Tab label="Tasks assigned to you" {...a11yProps(0)} />
            <Tab label="Tasks created by you" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Box
          m="40px 0 0 0"
          height="60vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <>
            <TabPanel value={tabValue} index={0} sx={{ height: "100%" }}>
              <DataGrid
                rows={assignedTasks}
                columns={AssignedTaskColumns()}
                getRowId={(row) => row._id}
                disableSelectionOnClick
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1} sx={{ height: "100%" }}>
              <DataGrid
                rows={tasks}
                columns={Columns()}
                getRowId={(row) => row._id}
                disableSelectionOnClick
              />
            </TabPanel>
          </>
        </Box>
      </Box>
    </>
  );
}

export default Tasks;
