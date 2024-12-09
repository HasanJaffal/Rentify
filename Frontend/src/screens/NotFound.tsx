import { Box, Typography } from "@mui/material";

function NotFound() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            padding: "16px",
            marginTop: "27vh",
            marginBottom: "27vh",
        }}>
            <Typography variant="h1">404 Not Found</Typography>
            <Typography variant="h4">
                The page you are looking for does not exist!
            </Typography>
        </Box>
    );
}
export default NotFound;
