//jshint esversion: 9
import "./App.css";
import "./Responsive.css";
import { Route, Routes } from "react-router-dom";
import { RouteTypes } from "./constants/Routes";
import { useRete } from "./Editor/rete";
import EditorSchemaPanel from "./Components/EditorSchemaPanel";

// Database Editor Component and Panel
function Editor() {
    const [setContainer] = useRete();

    return (
        <div className="container-fluid">
            <div className="row">
                {/* div used by rete to display editor */}
                <div className="col-10 g-0 vh-100">
                    <div
                        ref={(ref) => ref && setContainer(ref)}
                    />
                </div>
                {/* UI panel to create and generate data */}
                <div className="col-2 border-left-black g-0" style={{ height: "100vh", minHeight: "1200px" }}>
                    <EditorSchemaPanel />
                </div>
            </div>
        </div >
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
