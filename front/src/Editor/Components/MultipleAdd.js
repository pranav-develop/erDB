import Rete from "rete";
import { InputControl } from "../Controls/InputControl";
import { NumControl } from "../Controls/NumControl";
import { numSocket } from "../Sockets";

export class MultipleAdd extends Rete.Component {
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
            .addOutput(out)
    }

    worker(node, inputs, outputs) {
        // var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
        // var n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;
        // var mul = n1 * n2;
        var mul = 0;
        console.log(inputs, outputs);
        for (let key in inputs) { mul += inputs[key][0]; }

        this.editor.nodes
            .find((n) => n.id === node.id)
            .controls.get("preview")
            .setValue(mul);
        outputs["num"] = mul;
        outputs["num1"] = mul;
    }
}