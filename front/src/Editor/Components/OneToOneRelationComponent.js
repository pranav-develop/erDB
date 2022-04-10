import Rete from "rete";
import { RelationControl } from "../Controls/RelationControl";
import { EntitySocket } from "../Sockets";

export class OneToOneRelationComponent extends Rete.Component {
    constructor() {
        super("One To One Relation");
    }

    builder(node) {
        var oneToOneEntityInput1 = new Rete.Input("oneToOneEntityInput1", "One Relation Entity", EntitySocket);
        var oneToOneEntityInput2 = new Rete.Input("oneToOneEntityInput2", "One Relation Entity", EntitySocket);
        var ctrl = new RelationControl(this.editor, "relationDescription", node);
        node.addInput(oneToOneEntityInput1);
        node.addInput(oneToOneEntityInput2);
        return node.addControl(ctrl)
    }

    worker(node, inputs, outputs) {
        var relationDescription = inputs.oneToOneEntityInput1[0] + " (One) To " + inputs.oneToOneEntityInput2[0] + " (One)";
        this.editor.nodes
            .find((n) => n.id === node.id)
            .controls.get("relationDescription").updateData({ "name": "relationDescription", "value": relationDescription });
    }


}