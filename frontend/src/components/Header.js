import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  useTheme,
  AppBar,
  IconButton,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { tokens } from "../theme";

import { logout, reset } from "../features/auth/authSlice";
import { toggleColorMode } from "../features/colorMode/colorModeSlice";
import { fullReset } from "../features/tasks/taskSlice";

function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentTheme = theme.palette.mode;

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(fullReset());
    navigate("/login");
  };

  return (
    <AppBar position="static" elevation={0}>
      <Box
        display="flex"
        justifyContent="end"
        height="80px"
        backgroundColor={colors.primary[400]}
        sx={{
          p: { xs: "20px 20px", sm: "20px 40px" },
        }}
      >
        {user ? (
          <>
            <IconButton
              onClick={() => props.setIsToggled(!props.isToggled)}
              sx={{ marginRight: "20px", display: { xs: "block", sm: "none" } }}
            >
              <MenuOutlinedIcon />
            </IconButton>

            <FormGroup sx={{ marginLeft: "auto" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={currentTheme === "dark"}
                    onChange={() => dispatch(toggleColorMode())}
                    color="secondary"
                  />
                }
                label="Toggle Dark Theme"
                sx={{
                  color: colors.grey[100],
                }}
              />
            </FormGroup>
            <Button
              variant="contained"
              startIcon={<LogoutIcon />}
              color="secondary"
              sx={{
                fontWeight: 700,
                fontSize: 15,
              }}
              onClick={onLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={currentTheme === "dark"}
                    onChange={() => dispatch(toggleColorMode())}
                    color="secondary"
                  />
                }
                label="Toggle Dark Theme"
                sx={{
                  color: colors.grey[100],
                }}
              />
            </FormGroup>
          </>
        )}
      </Box>
    </AppBar>
  );
}

export default Header;
