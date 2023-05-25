import React from "react";

const EditorSchemaPanel = () => {
	const handleGenerateDatabases = async () => {
		const response = await fetch("http://localhost:8090/generate-database-old");
		const data = await response.json();
		if (data) {
			console.log(data);
			alert("Generate database completed");
		}
	};

	const handleGenerateSchema = async () => {
		const response = await fetch("http://localhost:8090/generate-schema", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json",
			},
			body: localStorage.getItem("schema"),
		});
		const data = await response.json();
		if (data) {
			console.log(data);
			alert("Schema generation completed");
		}
	};

	return (
		<div className="container-fluid">
			<div className="row g-0">
				<div
					className="col"
					style={{ maxHeight: "90vh", height: "1200px", backgroundColor: "darkslategray", color: "white" }}
				>
					Placeholder for generated schema and database details!
				</div>
			</div>
			<div className="row g-0">
				<div className="col" style={{ height: "10vh" }}>
					<div className="d-grid gap-2 h-100">
						<button className="btn btn-success" type="button" onClick={handleGenerateSchema}>
							Generate Schema
						</button>
						<button onClick={handleGenerateDatabases} className="btn btn-success" type="button">
							Generate Database
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditorSchemaPanel;
