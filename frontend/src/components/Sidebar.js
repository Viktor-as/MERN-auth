import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { tokens } from "../theme";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddTaskIcon from "@mui/icons-material/AddTask";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  colors,
  setIsToggled,
}) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title);
        setIsToggled(false);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

function Sidebar(props) {
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Tasks");
  const isNonMobile = useMediaQuery("(min-width:600px)");

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
        <ProSidebar
          collapsed={isCollapsed}
          breakPoint="sm"
          toggled={props.isToggled}
        >
          <Menu iconShape="square">
            {/* Collapsed menu icon */}
            {isCollapsed && (
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0 20px 0",
                }}
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
            {/* Not collapsed sidebar top */}
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                m="10px 0 20px 0"
                p="0 20px"
                width="100%"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Navigation
                </Typography>
                {isNonMobile ? (
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => props.setIsToggled(false)}>
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>
            )}

            {/* Sidebar content */}
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
                setIsToggled={props.setIsToggled}
              />
              <Item
                title="Add Task"
                to="/add-task"
                icon={<AddTaskIcon />}
                selected={selected}
                setSelected={setSelected}
                colors={colors}
                setIsToggled={props.setIsToggled}
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
                setIsToggled={props.setIsToggled}
              />
              <Item
                title="Add User"
                to="/add-user"
                icon={<PersonAddAltIcon />}
                selected={selected}
                setSelected={setSelected}
                colors={colors}
                setIsToggled={props.setIsToggled}
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
                setIsToggled={props.setIsToggled}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    )
  );
}

export default Sidebar;
