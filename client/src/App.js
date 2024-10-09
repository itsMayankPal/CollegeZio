import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Layout and Pages imports
import Layout from "./Layout.jsx";
import Home from "./Pages/Home";
import Privacy from "./Pages/Privacy";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Courses from "./Pages/Courses";
import Dashboard from "./Pages/Dashboard";
import MockTest from "./Pages/MockTest";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Insights from "./Pages/Insights";
import NotFound from "./Components/NotFound.jsx";
import PrivateRoute from "./Services/PrivateRoute"; // Import PrivateRoute
import Resources from "./Pages/Resources";

// Define a Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#00539C", // Main primary color
    },
    secondary: {
      main: "#F4B400", // Main secondary color
    },
  },
  typography: {
    h6: {
      fontWeight: 700, // Bold h6 typography
    },
    button: {
      textTransform: "none", // No uppercase transformation for buttons
      fontWeight: 600, // Bold button text
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // Rounded corners for buttons
        },
      },
    },
  },
});

// Define the routes for the application
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "courses", element: <Courses /> },
      { path: "dashboard", element: <PrivateRoute element={<Dashboard />} /> }, // Protected route
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "resources", element: <Resources /> },
      { path: "mock-test", element: <MockTest /> },
      { path: "insights", element: <Insights /> },
      { path: "privacy", element: <Privacy /> },
      { path: "*", element: <NotFound /> }, // Fallback for 404
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
