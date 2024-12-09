
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, useTheme, Container } from "@mui/material";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";

export default function Welcome() {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                color: theme.palette.primary.contrastText,
                transition: "background 1s ease-in-out", // Transition effect for background
                "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.dark} 90%)`,
                },
            }}
        >
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                        gap: 1,
                        animation: "fadeIn 1.5s ease-in-out", // Smooth animation
                    }}
                >
                    <HomeWorkRoundedIcon
                        sx={{
                            fontSize: "3rem",
                            color: theme.palette.primary.contrastText,
                            transition: "transform 0.5s ease",
                            "&:hover": {
                                transform: "scale(1.2)", // Grow on hover
                            },
                        }}
                    />
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                        }}
                    >
                        Rentify
                    </Typography>
                </Box>
                <Typography
                    variant="body1"
                    sx={{
                        mb: 4,
                        lineHeight: 1.5,
                        color: theme.palette.primary.contrastText,
                    }}
                >
                    Rentify makes renting easier, faster, and hassle-free.
                    Explore a wide range of rental options, connect with
                    property owners, and simplify your rental journey today!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/login")}
                    sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: "bold",
                        boxShadow: `0 4px 6px ${theme.palette.primary.dark}`,
                        transition: "all 0.3s ease-in-out", // Smooth button transitions
                        "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                            transform: "translateY(-5px)", // Float effect on hover
                        },
                    }}
                >
                    Go to Login
                </Button>
            </Container>
        </Box>
    );
}
