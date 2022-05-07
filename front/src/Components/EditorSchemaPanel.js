import React from 'react';


const EditorSchemaPanel = () => {
    return (
        <div className="container-fluid">
            <div className="row g-0">
                <div className="col" style={{ maxHeight: "90vh", height: "1200px", backgroundColor: "darkslategray", color: "white" }}>Placeholder for generated schema and database details!</div>
            </div>
            <div className="row g-0">
                <div className="col" style={{ height: "10vh" }}>
                    <div class="d-grid gap-2 h-100">
                        <button class="btn btn-success" type="button">Generate Schema</button>
                        <button class="btn btn-success" type="button">Generate Database</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditorSchemaPanel;