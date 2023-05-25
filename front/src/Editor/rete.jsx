import React, { useState, useEffect, useRef } from "react";
import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";

import { AttributeComponent } from "./Components/AttributeComponent";
import { EntityComponent } from "./Components/EntityComponent";
import { OneToOneRelationComponent } from "./Components/OneToOneRelationComponent";
import { OneToManyRelationComponent } from "./Components/OneToManyRelationComponent";
import { ManyToManyRelationComponent } from "./Components/ManyToManyRelationComponent";

export async function createEditor(container) {
	var components = [
		new AttributeComponent(),
		new EntityComponent(),
		new OneToOneRelationComponent(),
		new OneToManyRelationComponent(),
		new ManyToManyRelationComponent(),
	];

	var editor = new Rete.NodeEditor("demo@0.1.0", container);
	editor.use(ConnectionPlugin);
	editor.use(ReactRenderPlugin);
	editor.use(ContextMenuPlugin);

	var engine = new Rete.Engine("demo@0.1.0");

	components.map((c) => {
		editor.register(c);
		engine.register(c);
	});

	editor.on("process nodecreated noderemoved connectioncreated connectionremoved", async () => {
		await engine.abort();
		await engine.process(editor.toJSON());
		localStorage.setItem("schema", JSON.stringify(editor.nodes));
		console.log(editor.toJSON());
	});

	editor.view.resize();
	editor.trigger("process");
	AreaPlugin.zoomAt(editor, editor.nodes);
	return editor;
}

export function useRete() {
	const [container, setContainer] = useState(null);
	const editorRef = useRef();

	useEffect(() => {
		if (container) {
			createEditor(container).then((value) => {
				editorRef.current = value;
			});
		}
	}, [container]);

	useEffect(() => {
		return () => {
			if (editorRef.current) {
				editorRef.current.destroy();
			}
		};
	}, []);

	return [setContainer];
}
