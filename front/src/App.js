//jshint esversion: 9
import "./App.css";
import "./Responsive.css";
import { Route, Routes } from "react-router-dom";
import { RouteTypes } from "./constants/Routes";
import { useRete } from "./rete";



function Editor() {
    const [setContainer] = useRete();

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-9 g-0">
                    <div
                        ref={(ref) => ref && setContainer(ref)}
                    />
                </div>
                <div className="col-3 border-left-black" style={{ height: "100vh" }}>

                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path={RouteTypes.HOME_ROUTE} element={<Editor />} />
        </Routes>
    );
}

export default App;
