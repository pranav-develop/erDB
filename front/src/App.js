//jshint esversion: 9
import "./App.css";
import "./Responsive.css";
import { Route, Routes } from "react-router-dom";
import { RouteTypes } from "./constants/Routes";
import Home from "./pages/Home";
import { useRete } from "./rete";
import Signup from "./pages/SignupPage/Signup";



function Editor() {
    const [setContainer] = useRete();

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh"
            }}
            ref={(ref) => ref && setContainer(ref)}
        />
    );
}

function App() {
    return (
        <Routes>
            <Route path={RouteTypes.HOME_ROUTE} element={<Editor />} />
            <Route path={RouteTypes.AUTH_ROUTE} element={<Signup />} />
        </Routes>
    );
}

export default App;
