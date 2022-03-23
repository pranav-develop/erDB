import React, { useState, useEffect, useCallback, useRef } from "react";
import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";

var numSocket = new Rete.Socket("Number value");

class NumControl extends Rete.Control {
    static component = ({ value, onChange }) => (
        <input
            type="number"
            value={value}
            ref={(ref) => {
                ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
            }}
            onChange={(e) => onChange(+e.target.value)}
        />
    );

    constructor(emitter, key, node, readonly = false) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = NumControl.component;

        const initial = node.data[key] || 0;

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            onChange: (v) => {
                this.setValue(v);
                this.emitter.trigger("process");
            }
        };
    }

    setValue(val) {
        this.props.value = val;
        this.putData(this.key, val);
        this.update();
    }
}



class InputControl extends Rete.Control {
    static component = ({ value, onChange, callback }) => (
        <>
            <button onClick={callback}>+</button>
        </>
    );

    constructor(emitter, key, node, callback) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = InputControl.component;

        const initial = node.data[key] || 0;

        node.data[key] = initial;
        this.props = {
            value: initial,
            callback: callback,
            onChange: (v) => {
                this.setValue(v);
                this.emitter.trigger("process");
            }
        };
    }

    setValue(val) {
        this.props.value = val;
        this.putData(this.key, val);
        this.update();
    }
}


class NumComponent extends Rete.Component {
    constructor() {
        super("Number");
    }

    builder(node) {
        var out1 = new Rete.Output("num", "Number", numSocket);
        var ctrl = new NumControl(this.editor, "num", node);

        return node.addControl(ctrl).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs["num"] = node.data.num;
    }
}

class AddComponent extends Rete.Component {
    constructor() {
        super("Add");
    }

    builder(node) {
        var inp1 = new Rete.Input("num1", "Number", numSocket);
        var inp2 = new Rete.Input("num2", "Number2", numSocket);
        var out = new Rete.Output("num", "Number", numSocket);

        inp1.addControl(new NumControl(this.editor, "num1", node));
        inp2.addControl(new NumControl(this.editor, "num2", node));

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new NumControl(this.editor, "preview", node, true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
        var n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;
        var sum = n1 + n2;
        this.editor.nodes
            .find((n) => n.id === node.id)
            .controls.get("preview")
            .setValue(sum);
        outputs["num"] = sum;
    }
}

class MultiplyComponent extends Rete.Component {
    constructor() {
        super("Multiply");
    }

    builder(node) {
        var inp1 = new Rete.Input("num1", "Number", numSocket);
        var inp2 = new Rete.Input("num2", "Number2", numSocket);
        var out = new Rete.Output("num", "Number", numSocket);

        inp1.addControl(new NumControl(this.editor, "num1", node));
        inp2.addControl(new NumControl(this.editor, "num2", node));

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new NumControl(this.editor, "preview", node, true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
        var n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;
        var mul = n1 * n2;
        this.editor.nodes
            .find((n) => n.id === node.id)
            .controls.get("preview")
            .setValue(mul);
        outputs["num"] = mul;
    }
}



class MultipleAdd extends Rete.Component {
    constructor() {
        super("MultipleAdd");
    }

    builder(node) {
        var out = new Rete.Output("num", "Number", numSocket);

        node.meta.letter = '`';

        var callback = async () => {
            // node.addInput(new Rete.Input("num3", "Number", numSocket))
            // await node.update();
            // setTimeout(() => { this.emitter.view.updateConnection({ node }) }, 10)

            // if (!n) { // del
            //     let o1 = this.emitter.nodes.find(n => n.id == node.id).outputs.get(node.meta.letter);
            //     let c1 = this.emitter.nodes.find(n => n.id == node.id).controls.get(node.meta.letter);
            //     if (c1 && o1) {
            //         node.removeControl(c1);
            //         node.removeOutput(o1);
            //         delete (node.data[node.meta.letter]);
            //         await node.update();
            //         node.meta.letter = node.meta.letter.substring(0, node.meta.letter.length - 1) + String.fromCharCode(node.meta.letter.charCodeAt(node.meta.letter.length - 1) - 1);
            //         setTimeout(() => { this.emitter.view.updateConnections({ node }); }, 10);

            //     }
            // } else { // add
            node.meta.letter = node.meta.letter.substring(0, node.meta.letter.length - 1) + String.fromCharCode(node.meta.letter.charCodeAt(node.meta.letter.length - 1) + 1);
            let input = new Rete.Input(node.meta.letter, 'Number ' + node.meta.letter, numSocket);
            input.addControl(new NumControl(this.editor, 'In ' + node.meta.letter, node, true));
            node.addInput(input);
            await node.update();
            // setTimeout(() => { this.emitter.view.updateConnections({ node }); }, 10);
        }

        return node
            .addControl(new InputControl(this.editor, "addInput", node, callback))
            .addControl(new NumControl(this.editor, "preview", node, true))
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        // var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
        // var n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;
        // var mul = n1 * n2;
        var mul = 0;
        for (let key in inputs) { mul += inputs[key][0]; }

        this.editor.nodes
            .find((n) => n.id === node.id)
            .controls.get("preview")
            .setValue(mul);
        outputs["num"] = mul;
    }
}

export async function createEditor(container) {
    var components = [new NumComponent(), new AddComponent(), new MultiplyComponent(), new MultipleAdd()];

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
