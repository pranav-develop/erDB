import Rete from "rete";

const options = [
    { value: 'int', label: 'int' },
    { value: 'date', label: 'date' },
    { value: 'string', label: 'string' }
]

export class AttributeControl extends Rete.Control {
    static component = ({ value, handleInputChange }) => (
        <>
            <div>
                    <input
                        type="string"
                        name="attributeName"
                        value={value.attributeName}
                        ref={(ref) => {
                            ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
                        }}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <select name="datatype" value={value.datatype} onChange={e => handleInputChange(e)}>
                        {options.map((option) => (<option value={option.value}>{option.label}</option>))}
                    </select>
            </div>
            <div>
                <label for="primaryKey">Primary Key</label>
                <select name="primaryKey" value={value.datatype} onChange={e => handleInputChange(e)}>
                    <option value={"1"}>{"Yes"}</option>
                    <option value={"0"} selected>{"No"}</option>
                </select>
            </div>
        </>
    );

    constructor(emitter, key, node, readonly = false) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = AttributeControl.component;

        const initial = node.data[key] || {attributeName: "", datatype: ""};

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            handleInputChange: (e) => {
                const {name, value} = e.target;
                this.props.value = { ...this.props.value, [name]: value };
                this.putData(this.key, this.props.value);
                this.update();
                console.log(this.props.value);
            }
        };
    }
}
