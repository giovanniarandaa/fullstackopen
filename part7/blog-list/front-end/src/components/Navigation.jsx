import { Link } from "react-router-dom";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";

const pages = [
  {
    name: "Blogs",
    path: "/",
  },
  {
    name: "Users",
    path: "/users",
  },
];

export const Navigation = ({ user, onLogout }) => {
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user !== null && (
              <>
                {user.name} logged in{" "}
                <Button color="inherit" onClick={onLogout}>
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
