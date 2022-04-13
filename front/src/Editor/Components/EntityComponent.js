import Rete from "rete";
import { AddAttributeEntityControl } from "../Controls/EntityControl";
import { AttributeSocket, EntitySocket } from "../Sockets";

// TODO: Find a way to assign dynamic attributes names and let it persist between sesions

var attributeInputSocketCount = 0;

export class EntityComponent extends Rete.Component {
    constructor() {
        super("Entity");
    }

    builder(node) {
        var addEntityCallback = async () => {
            attributeInputSocketCount += 1;
            var key = "attribute" + attributeInputSocketCount;
            let entityInput = new Rete.Input(key, 'Attribute ' + attributeInputSocketCount, AttributeSocket);
            node.addInput(entityInput);
            await node.update();
        }

        var addAttributeEntityControl = new AddAttributeEntityControl(this.editor, "entityController", node, addEntityCallback);
        var entityOutput = new Rete.Output("entityOutput", "Relation", EntitySocket);
        return node
            .addControl(addAttributeEntityControl)
            .addOutput(entityOutput);
    }

    worker(node, inputs, outputs) {
        outputs["entityOutput"] = node.data.entityController.entityName;
    }
}