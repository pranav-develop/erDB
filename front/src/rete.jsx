import React, { useState, useEffect, useRef } from "react";
import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";

import { NumComponent } from "./Editor/Components/NumComponent";
import { AddComponent } from "./Editor/Components/AddComponent";
import { MultiplyComponent } from "./Editor/Components/MultiplyComponent";
import { MultipleAdd } from "./Editor/Components/MultipleAdd";
import { AttributeComponent } from "./Editor/Components/AttributeComponent";

export async function createEditor(container) {
    var components = [new NumComponent(), new AddComponent(), new MultiplyComponent(), new MultipleAdd(), new AttributeComponent()];

    var editor = new Rete.NodeEditor("demo@0.1.0", container);
    editor.use(ConnectionPlugin);
    editor.use(ReactRenderPlugin);
    editor.use(ContextMenuPlugin);

    var engine = new Rete.Engine("demo@0.1.0");

    components.map((c) => {
        editor.register(c);
        engine.register(c);
    });

    var n1 = await components[0].createNode({ num: 2 });
    var n2 = await components[0].createNode({ num: 3 });
    var add = await components[3].createNode();

    n1.position = [80, 200];
    n2.position = [80, 400];
    add.position = [500, 240];

    editor.addNode(n1);
    editor.addNode(n2);
    editor.addNode(add);

    editor.connect(n1.outputs.get("num"), add.inputs.get("num1"));
    editor.connect(n2.outputs.get("num"), add.inputs.get("num2"));

    editor.on(
        "process nodecreated noderemoved connectioncreated connectionremoved",
        async () => {
            await engine.abort();
            await engine.process(editor.toJSON());
        }
    );

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
