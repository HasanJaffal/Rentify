import { Box } from "@mui/material";
import { Outlet } from "react-router";

export default function Body() {
    return (
        <Box sx={{
            minHeight: "calc(100vh - 132px)",
        }}>
            <Outlet />
        </Box>
    );
}
