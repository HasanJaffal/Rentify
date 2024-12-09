import { RouteObject } from "react-router-dom";
import Home from "../screens/home/Home";
import About from "../screens/AboutAndContact";
import NotFound from "../screens/NotFound";
import NewPost from "../screens/NewPost";
import Login from "../security/Login";
import App from "../app/App";
import Register from "../security/Register";
import Welcome from "../screens/Welcome";
import ListingDetailsPage from "../screens/ListingDetailsPage";

const routes: RouteObject[] = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/welcome",
        element: <Welcome />,
    },
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "about-and-contact",
                element: <About />,
            },
            {
                path: "new-post",
                element: <NewPost />,
            },
            {
                path: "listing-details/:id",
                element: <ListingDetailsPage />
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
];

export default routes;
