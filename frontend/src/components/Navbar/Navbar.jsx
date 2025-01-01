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
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  CssBaseline,
  Drawer,
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
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../../actions/authActions";
import Loader from "../loader/Loader";

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

// For User
const drawerWidth = 240;
const navItems = [
  {
    path: "/clients/tickets",
    name: "Support",
  },
  {
    path: "/clients/projects",
    name: "Projects",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = ({ window, toggle }) => {
  const { user, loading } = useSelector((state) => state.user);
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

  // For Admin
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

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

  // For User

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        onClick={() => navigate("/dashboard")}
        variant="h6"
        sx={{ my: 2 }}
      >
        Abdul Rafay Tech
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {user.role === "admin" || user?.role === "manager" ? (
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
                      {user?.username?.substring(0, 1)}
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
      ) : (
        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid ##444952",
            boxShadow: "1px 2px 3px #F3F4F6",
          }}
        >
          <CssBaseline />
          <AppBar
            position="static"
            sx={{
              boxShadow: "none",
              backgroundColor: "#ffffff",
              color: "#444952",
              paddingY: "12px",
              width: "100%",
              maxWidth: "1280px",
              marginX: "auto",
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                onClick={() => navigate("/dashboard")}
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontWeight: 800,
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                Abdul Rafay Tech
              </Typography>
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  gap: "15px",
                  marginRight: "20px",
                }}
              >
                {navItems.map((item) => (
                  <Link
                    to={item.path}
                    key={item.name}
                    sx={{
                      fontFamily: "inherit",
                      color: "#444952",
                      padding: "8px 16px", // Add padding for better UX
                      transition: "all 0.3s ease", // Smooth hover effect
                      "&:hover": {
                        color: "#000000",
                        backgroundColor: "#cccccc",
                        borderRadius: "8px", // Add rounded corners
                      },
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.username?.substring(0, 1)}
                      src="/asset/avatar.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu(); // Menu close karna
                        if (setting === "Logout") {
                          LogoutFunc(); // Logout function call karna
                        }
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          <nav>
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </nav>
        </Box>
      )}
    </>
  );
};

export default Navbar;
