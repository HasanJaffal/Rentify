import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect } from "react";
export default function App() {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("rIsLoggedIn") === null) {
            navigate("/welcome");
        }
    }, [navigate]);
    return (
        <Box>
            <Header />
            <Body />
            <Footer />
        </Box>
    );
}
