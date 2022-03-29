import Rete from "rete";

export class InputControl extends Rete.Control {
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
