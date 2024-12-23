import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Avatar,
  Badge,
  MenuItem,
  Menu,
  Tooltip,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  PersonAdd,
  Settings,
  Logout,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../actions/authActions";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  border: "1px solid #ccc", // Light border for visibility
  //   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.common.white, 1),
  //   },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#444952", // Darker text color for better contrast
  backgroundColor: "#F4F4F5", // Slightly off-white background for the input
  borderRadius: theme.shape.borderRadius, // Rounded corners
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
  "&::placeholder": {
    color: "#F4F4F5", // Placeholder text color
    opacity: 1, // Ensure full visibility of the placeholder
  },
  "&:focus-within": {
    border: "1px solid #999", // Highlight border on focus
    // backgroundColor: "#ffffff", // Change background color on focus
  },
}));

const Navbar = ({ toggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { user, error, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogoutFunc = () => {
    dispatch(logoutAction())
      .unwrap()
      .then(() => {
        toast.success("Logout successful!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err || "Logout failed. Please try again.");
      });
  };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Avatar
          sx={{
            mr: 1,
            width: 28,
            height: 28,
            color: "grey",
            "&:hover": {
              color: "#444952",
            },
          }}
        />
        Profile
      </MenuItem>
      <MenuItem>
        <Avatar
          sx={{
            mr: 1,
            width: 28,
            height: 28,
            color: "grey",
            "&:hover": {
              color: "#444952",
            },
          }}
        />{" "}
        My account
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={LogoutFunc}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#ffffff",
          color: "#444952",
          boxShadow: "none",
          borderBottom: "1px solid #808080",
        }}
      >
        <Toolbar>
          <IconButton
            onClick={toggle}
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 800,
              fontFamily: "inherit",
              display: { xs: "none", sm: "block" },
            }}
          >
            Abdul Rafay Tech
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            // variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 4,
              fontWeight: 600,
              color: "grey",
              "&:hover": {
                color: "#444952",
              },
              fontFamily: "inherit",
              display: { xs: "none", sm: "block" },
            }}
          >
            Customers area
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={4} color="error">
                <MailIcon
                  sx={{
                    color: "grey",
                    "&:hover": {
                      color: "#444952",
                    },
                  }}
                />
              </Badge>
            </IconButton>
            <IconButton
              sx={{ mr: 2 }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon
                  sx={{
                    color: "grey",
                    "&:hover": {
                      color: "#444952",
                    },
                  }}
                />
              </Badge>
            </IconButton>
            <Tooltip title="Account settings">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {/* <AccountCircle
                  sx={{
                    color: "grey",
                    "&:hover": {
                      color: "#444952",
                    },
                  }}
                /> */}
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    color: "grey",
                    "&:hover": {
                      color: "#444952",
                    },
                  }}
                >
                  {user.username.substring(0, 1)}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
