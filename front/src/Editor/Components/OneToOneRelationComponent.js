import Rete from "rete";
import { RelationControl } from "../Controls/RelationControl";
import { EntitySocket } from "../Sockets";

export class OneToOneRelationComponent extends Rete.Component {
    constructor() {
        super("One To One Relation");
    }

    builder(node) {
        var relationInput1 = new Rete.Input("relationInput1", "One Relation Entity", EntitySocket);
        var relationInput2 = new Rete.Input("relationInput2", "One Relation Entity", EntitySocket);
        var ctrl = new RelationControl(this.editor, "relationDescription", node);
        node.addInput(relationInput1);
        node.addInput(relationInput2);
        return node.addControl(ctrl)
    }

    worker(node, inputs, outputs) {
        var relationDescription = inputs.relationInput1[0] + " (One) To " + inputs.relationInput2[0] + " (One)";
        this.editor.nodes
            .find((n) => n.id === node.id)
            .controls.get("relationDescription").updateData({ "name": "relationDescription", "value": relationDescription });
    }


}