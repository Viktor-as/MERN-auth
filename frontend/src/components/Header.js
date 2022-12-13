import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { toggleColorMode } from "../features/colorMode/colorModeSlice";
import {
  Paper,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const currentTheme = useSelector((state) => state.colorMode.mode);
  const colors = tokens(currentTheme);
  const theme = useTheme();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="end"
      p="20px 40px"
      backgroundColor={colors.primary[400]}
    >
      {user ? (
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
  );
}

export default Header;
