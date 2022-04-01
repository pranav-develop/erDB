import Rete from "rete";
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export class AttributeControl extends Rete.Control {
    static component = ({ value, onChangeNumber, onChangeType }) => (
        <>
            <input
                type="number"
                value={value.Number}
                ref={(ref) => {
                    ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
                }}
                onChange={(e) => onChangeNumber(+e.target.value)}
            />
            <select value={value.Type} onChange={e => onChangeType(e.target.value)}>
                {options.map((option) => (<option value={option.value}>{option.label}</option>))}
            </select>
        </>
    );

    constructor(emitter, key, node, readonly = false) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = AttributeControl.component;

        const initial = node.data[key] || {};

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            onChangeNumber: (v) => {
                console.log("called",v)
                this.setNumberValue(v);
                this.emitter.trigger("process");
            },
            onChangeType: (v) => {
                this.setTypeValue(v);
                this.emitter.trigger("process");
            }
        };
    }

    setNumberValue(val) {
        this.props.value = { ...this.props.value, "Number": val };
        this.putData(this.key, this.props.value);
        this.update();
    }
    setTypeValue(val) {

        this.props.value = { ...this.props.value, "Type": val };
        this.putData(this.key, this.props.value);
        this.update();
    }
}
