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

import { useDispatch } from 'react-redux'
import { updateEditorJson } from './editorSlice'

import { cloneDeep } from 'lodash';

export async function createEditor(container, dispatch) {
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
        /*
            Using deep copy of the editor object, else
            immer used in redux toolkit is causing immutability warnings
            https://stackoverflow.com/questions/53420055/error-while-sorting-array-of-objects-cannot-assign-to-read-only-property-2-of
        */
        const editorDeepCopy = cloneDeep(editor);
        dispatch(updateEditorJson(editorDeepCopy.toJSON()));
    });


    editor.view.resize();
    editor.trigger("process");
    AreaPlugin.zoomAt(editor, editor.nodes);
    return editor;
}

export function useRete() {
    const [container, setContainer] = useState(null);
    const editorRef = useRef();
    const dispatch = useDispatch()

    useEffect(() => {
        if (container) {
            createEditor(container, dispatch).then((value) => {
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
