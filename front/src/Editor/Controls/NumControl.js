import Rete from "rete";

export class NumControl extends Rete.Control {
    static component = ({ value, onChange }) => (
        <input
            type="number"
            value={value}
            ref={(ref) => {
                ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
            }}
            onChange={(e) => onChange(+e.target.value)}
        />
    );

    constructor(emitter, key, node, readonly = false) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = NumControl.component;

        const initial = node.data[key] || 0;

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            onChange: (v) => {
                this.setData(v);
                this.emitter.trigger("process");
            }
        };
    }

    setData(val) {
        this.props.value = val;
        this.putData(this.key, val);
        this.update();
    }
}