import { Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import HomeappBar from "../Navbar/Home";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <Stack spacing={10}>
      <HomeappBar />
      <Stack>
        <Container>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Welcome To Project Management System
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Enjoy Our Services.
          </Typography>
          <Button
            variant="contained"
            sx={{ width: { lg: "25%" } }}
            onClick={() => navigate("/login")}
          >
            Login Now
          </Button>
        </Container>
      </Stack>
    </Stack>
  );
};

export default Homepage;
