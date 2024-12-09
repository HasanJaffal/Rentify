import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    IconButton,
    TextField,
    Snackbar,
    Alert,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

function AboutAndContact() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim()) {
            setOpenSnackbar(true);
            setMessage(""); // Clear the input
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            sx={{
                padding: "2rem",
                backgroundColor: "#f5f5f5",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2rem",
            }}
        >
            {/* About Section */}
            <Card
                sx={{
                    width: "100%",
                    maxWidth: "800px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        textAlign="center"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                        }}
                    >
                        About Us
                    </Typography>
                    <Typography
                        variant="body1"
                        textAlign="center"
                        sx={{
                            lineHeight: 1.6,
                            color: "text.secondary",
                        }}
                    >
                        Welcome to Rentify! We are passionate about connecting
                        renters and property owners through a seamless and
                        user-friendly platform. Our mission is to make renting
                        easier, faster, and hassle-free. Whether you're looking
                        for your dream home or need to list your property, we've
                        got you covered.
                    </Typography>
                </CardContent>
            </Card>

            {/* Contact Section */}
            <Card
                sx={{
                    width: "100%",
                    maxWidth: "800px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        textAlign="center"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                        }}
                    >
                        Contact Us
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            flexWrap: "wrap",
                            gap: "1rem",
                            marginTop: "1rem",
                        }}
                    >
                        <Box sx={{ textAlign: "center" }}>
                            <IconButton color="primary" size="large">
                                <EmailRoundedIcon />
                            </IconButton>
                            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                support@rentify.com
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <IconButton color="primary" size="large">
                                <PhoneRoundedIcon />
                            </IconButton>
                            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                +961 71 104 458
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <IconButton color="primary" size="large">
                                <LocationOnRoundedIcon />
                            </IconButton>
                            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                                Beirut, Lebanon
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Send a Message Section */}
            <Card
                sx={{
                    width: "100%",
                    maxWidth: "800px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        textAlign="center"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            color: "primary.main",
                        }}
                    >
                        Send a Message
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            marginTop: "1rem",
                        }}
                    >
                        <TextField
                            label="Your Message"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleSendMessage}
                        >
                            Send Message
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
                    Your message has been sent successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default AboutAndContact;
