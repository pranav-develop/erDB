import Rete from "rete";
import { NumControl } from "../Controls/NumControl";
import { numSocket } from "../Sockets";

export class NumComponent extends Rete.Component {
    constructor() {
        super("Number");
    }

    builder(node) {
        var out1 = new Rete.Output("num1", "Number", numSocket);
        var ctrl = new NumControl(this.editor, "num1", node);

        return node.addControl(ctrl).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs["num1"] = node.data.num1;
    }
}