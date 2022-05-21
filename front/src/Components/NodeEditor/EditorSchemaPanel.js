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
                            console.log(editorJson);
                            const res = await fetch("http://localhost:8626/generate-schema", {
                                method: 'POST',
                                mode: 'cors',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(editorJson)
                            });
                            console.log(await res.text());
                        }}>Generate Schema</button>
                        <button className="btn btn-success" type="button" onClick={async () => {
                            console.log(editorJson);
                            const res = await fetch("http://localhost:8626/generate-database-old");
                            console.log(await res.text());
                        }}>Generate Database</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditorSchemaPanel;