import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { UserService } from "../services/UserService";
import { CheckLoginDto } from "../interfaces/CheckLoginDto";
import { useState } from "react";

export default function Login() {
    const userService = new UserService();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: CheckLoginDto = {
            email: (formData.get("email") as string) || "",
            password: (formData.get("password") as string) || "",
        };

        try {
            // Send email and password directly as payload
            const login = await userService.login(data);
            if (login == null) {
                setError("Invalid email or password");
            } else {
                setError(null); // Clear error if email is successful
                localStorage.setItem("rIsLoggedIn", "true");
                localStorage.setItem("rProfile", JSON.stringify(login));
                console.log("Logged in as", localStorage.getItem("rProfile"));
                // Redirect to home page
                window.location.href = "/";
            }
        } catch {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "400px", // Full viewport height
                width: "400px", // Full viewport width
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: "16px",
                boxShadow: 8,
            }}
        >
            <Typography
                variant="h4"
                sx={{ marginBottom: 2, color: "primary.main" }}
            >
                Login
            </Typography>
            <TextField
                required
                label="Email"
                type="email"
                placeholder="Email"
                name="email"
                sx={{ marginBottom: 2, width: "300px" }}
            />
            <TextField
                required
                label="Password"
                type="password"
                placeholder="Password"
                name="password" // Corrected name here
                sx={{ marginBottom: 2, width: "300px" }}
            />
            {error && (
                <Typography color="error" sx={{ marginBottom: 2 }}>
                    {error}
                </Typography>
            )}
            <Button variant="contained" sx={{ marginBottom: 2 }} type="submit">
                Submit
            </Button>
            <Typography>
                Don't have an account?{" "}
                <Typography color="primary" component={Link} to="/register">
                    Register
                </Typography>
            </Typography>
        </Box>
    );
}
