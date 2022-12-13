import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SettingsIcon from "@mui/icons-material/Settings";

const Item = ({ title, to, icon, selected, setSelected, colors }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Tasks");

  return (
    user && (
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
            height: "max(100%, 100vh)",
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    Navigation
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../../assets/mrbean.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h5"
                    color={colors.greenAccent[500]}
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Welcome,
                  </Typography>
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                  >
                    {user.name}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Tasks
              </Typography>
              <Item
                title="Tasks"
                to="/"
                icon={<TaskAltIcon />}
                selected={selected}
                setSelected={setSelected}
                colors={colors}
              />
              <Item
                title="Add Task"
                to="/add-task"
                icon={<AddTaskIcon />}
                selected={selected}
                setSelected={setSelected}
                colors={colors}
              />
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Users
              </Typography>
              <Item
                title="User List"
                to="/user-list"
                icon={<PersonOutlineIcon />}
                selected={selected}
                setSelected={setSelected}
                colors={colors}
              />
              <Item
                title="Add User"
                to="/add-user"
                icon={<PersonAddAltIcon />}
                selected={selected}
                setSelected={setSelected}
                colors={colors}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Other
              </Typography>
              <Item
                title="Profile"
                to="/profile"
                icon={<SettingsIcon />}
                selected={selected}
                setSelected={setSelected}
                colors={colors}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    )
  );
}

export default Sidebar;
