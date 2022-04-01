import Rete from "rete";
import { AttributeControl } from "../Controls/AttributeControl";
import { numSocket } from "../Sockets";

export class AttributeComponent extends Rete.Component {
    constructor() {
        super("Attribute");
    }

    builder(node) {
        var out1 = new Rete.Output("num", "Number", numSocket);
        var ctrl = new AttributeControl(this.editor, "num", node);
        return node.addControl(ctrl).addOutput(out1);
    }

    worker(node, inputs, outputs) {
        outputs["num"] = node.data.num;
    }
}