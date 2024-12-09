import { useState } from "react";
import {
    Box,
    Button,
    Snackbar,
    TextField,
    Typography,
    Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { CreateUserDto } from "../interfaces/CreateUserDto";
import { UserService } from "../services/UserService";
import { UserDto } from "../interfaces/UserDto";

export default function Register() {
    const userService = new UserService();
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        "success" | "error"
    >("success");
    const navigate = useNavigate();

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const user: CreateUserDto = {
            name: (formData.get("name") as string) || "",
            phoneNumber: (formData.get("phoneNumber") as string) || "",
            email: (formData.get("email") as string) || "",
            password: (formData.get("password") as string) || "",
        };

        try {
            const userDto: UserDto = await userService.createUser(user);
            console.log("User created successfully:", userDto);
            setSnackbarMessage(
                "Registration successful! Redirecting to login..."
            );
            setSnackbarSeverity("success");
            setSnackbarOpen(true);

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error during registration:", error);
                setSnackbarMessage(
                    "Registration failed. This email is already in use."
                );
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        } finally {
            setIsLoading(false);
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
                height: "500px",
                width: "400px",
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
                Register
            </Typography>
            <TextField
                required
                label="Name"
                type="text"
                placeholder="Name"
                name="name"
                sx={{ marginBottom: 2, width: "300px" }}
            />
            <TextField
                required
                label="Phone Number"
                type="phone"
                placeholder="Phone Number"
                name="phoneNumber"
                sx={{ marginBottom: 2, width: "300px" }}
            />
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
                name="password"
                sx={{ marginBottom: 2, width: "300px" }}
            />
            <Button
                variant="contained"
                sx={{ marginBottom: 2 }}
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? "Submitting..." : "Submit"}
            </Button>
            <Typography>
                Already Registered?{" "}
                <Typography color="primary" component={Link} to="/login">
                    Login
                </Typography>
            </Typography>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
