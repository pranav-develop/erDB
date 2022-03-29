import Rete from "rete";
import { NumControl } from "../Controls/NumControl";
import { numSocket } from "../Sockets";

export class MultiplyComponent extends Rete.Component {
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

