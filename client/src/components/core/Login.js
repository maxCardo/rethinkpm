// == [ src/components/core/Login.js ] ==
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, loadUser } from "../../actions/auth";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { FaLock } from "react-icons/fa";

const Login = ({ login, loadUser, isAuthenticated }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  if (isAuthenticated) {
    return <Navigate to="/dash" replace />;
  }

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        elevation={8}
        sx={{
          padding: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1e3a8a", width: 56, height: 56 }}>
              <FaLock size={30} color="white" />
            </Avatar>
            <Typography
              component="h1"
              variant="h4"
              sx={{ fontWeight: "bold", color: "#1e3a8a", mb: 1 }}
            >
              Sign In
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              Welcome back! Please sign into your account
            </Typography>
          </Box>

          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={onChange}
              sx={{
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "#1e3a8a",
                },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#1e3a8a",
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#1e3a8a" },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputProps={{ minLength: 6 }}
              value={password}
              onChange={onChange}
              sx={{
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "#1e3a8a",
                },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#1e3a8a",
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#1e3a8a" },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                backgroundColor: "#1e3a8a",
                "&:hover": {
                  backgroundColor: "#1e40af",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(30, 58, 138, 0.4)",
                },
                "&:disabled": {
                  backgroundColor: "#94a3b8",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              {loading && (
                <CircularProgress size={24} sx={{ color: "white", mr: 1 }} />
              )}
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, loadUser })(Login);
