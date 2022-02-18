//jshint esversion: 9
import "./App.css";
import "./Responsive.css";
import { Route, Routes } from "react-router-dom";
import { RouteTypes } from "./constants/Routes";
import Home from "./pages/Home";

function App() {
    return (
        <Routes>
            <Route path={RouteTypes.HOME_ROUTE} element={Home} />
        </Routes>
    );
}

export default App;
