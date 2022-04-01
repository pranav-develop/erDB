import Rete from "rete";
import { EntityControl, AddAttributeEntityControl } from "../Controls/EntityControl";
import { AttributeSocket } from "../Sockets";

export class EntityComponent extends Rete.Component {
    constructor() {
        super("Entity");
    }

    builder(node) {
        node.meta.letter = '`';

        // var entityInput = new Rete.Input("entityInput", "Attribute", AttributeSocket);
        var addEntityCallback = async () => {
            node.meta.letter = node.meta.letter.substring(0, node.meta.letter.length - 1) + String.fromCharCode(node.meta.letter.charCodeAt(node.meta.letter.length - 1) + 1);
            let entityInput = new Rete.Input(node.meta.letter, 'Number ' + node.meta.letter, AttributeSocket);
            entityInput.addControl(new EntityControl(this.editor, 'In ' + node.meta.letter, node));
            node.addInput(entityInput);
            await node.update();
            // setTimeout(() => { this.emitter.view.updateConnections({ node }); }, 10);
        }

        var addAttributeEntityControl = new AddAttributeEntityControl(this.editor, "entityInput", node, addEntityCallback);

        return node
            .addControl(addAttributeEntityControl)
        // .addInput(entityInput);
    }

    worker(node, inputs, outputs) {
        console.log(inputs, outputs);
        // outputs["attribute-to-entity"] = node.data["attribute-to-entity"];
    }
}