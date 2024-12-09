import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: "#333",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "80%",
                paddingTop: "16px",
                paddingBottom: "16px",
                bottom: 0,
                width: 1,
                height: "32px",
            }}
        >
            <Typography>Rentify - 2024</Typography>
        </Box>
    );
}
