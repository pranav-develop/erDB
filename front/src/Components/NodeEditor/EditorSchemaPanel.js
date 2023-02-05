import React from 'react';
import { useSelector } from 'react-redux'

const EditorSchemaPanel = () => {
    const editorJson = useSelector((state) => state.editor.editorJson);
    return (
        <div className="container-fluid">
            <div className="row g-0">
                <div className="col" style={{ maxHeight: "90vh", height: "1200px", backgroundColor: "darkslategray", color: "white" }}>Placeholder for generated schema and database details!</div>
            </div>
            <div className="row g-0">
                <div className="col" style={{ height: "10vh" }}>
                    <div className="d-grid gap-2 h-100">
                        <button className="btn btn-success" type="button" onClick={async () => {
                            console.log(process.env.REACT_APP_BACKEND_URL);
                            const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/generate-schema", {
                                method: 'POST',
                                mode: 'cors',
                                headers: { 'Content-type': 'application/json' },
                                body: { "nodes": 1 },
                            });
                            console.log(editorJson);
                            console.log(await res.text());
                        }}>Generate Schema</button>
                        <button className="btn btn-success" type="button">Generate Database</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditorSchemaPanel;