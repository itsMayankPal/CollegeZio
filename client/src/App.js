import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Layout from "./Layout.jsx";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Courses from "./Pages/Courses";
import Dashboard from "./Pages/Dashboard";
import MockTest from "./Pages/MockTest";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Reviews from "./Pages/Reviews";
import Profile from "./Pages/Profile";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00539C",
    },
    secondary: {
      main: "#F4B400",
    },
  },
  typography: {
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "courses", element: <Courses /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "reviews", element: <Reviews /> },
      { path: "mock-test", element: <MockTest /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
