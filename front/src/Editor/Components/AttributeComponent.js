import Rete from "rete";
import { AttributeControl } from "../Controls/AttributeControl";
import { AttributeSocket } from "../Sockets";

export class AttributeComponent extends Rete.Component {
    constructor() {
        super("Attribute");
    }

    builder(node) {
        var out = new Rete.Output("attributeOutput", "Entity", AttributeSocket);
        var ctrl = new AttributeControl(this.editor, "attributeOutput", node);
        return node.addControl(ctrl).addOutput(out);
    }

    worker(node, inputs, outputs) {
        outputs["attributeOutput"] = node.data["attributeOutput"];
    }
}