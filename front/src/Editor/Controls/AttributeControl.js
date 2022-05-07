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
                    class="form-control"
                    type="string"
                    name="attributeName"
                    placeholder="Attribute Name"
                    value={value.attributeName}
                    ref={(ref) => {
                        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
                    }}
                    onChange={(e) => handleInputChange(e)}
                />
                <div className="form-floating">
                    <select class="form-select" name="datatype" value={value.datatype} onChange={e => handleInputChange(e)}>
                        {options.map((option) => (<option value={option.value}>{option.label}</option>))}
                    </select>
                    <label htmlFor="datatype">Datatype</label>
                </div>
            </div>
            <div class="form-floating">
                <select class="form-select" name="primaryKey" value={value.primaryKey} onChange={e => handleInputChange(e)}>
                    <option value={"1"}>{"Yes"}</option>
                    <option value={"0"} selected>{"No"}</option>
                </select>
                <label htmlFor="primaryKey">Primary Key</label>
            </div>
        </>
    );

    constructor(emitter, key, node, readonly = false) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = AttributeControl.component;

        const initial = node.data[key] || { attributeName: "", datatype: "int", primaryKey: 0 };

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            handleInputChange: (e) => {
                const { name, value } = e.target;
                this.props.value = { ...this.props.value, [name]: value };
                this.putData(this.key, this.props.value);
                this.update();
                this.emitter.trigger("process");

            }
        };
    }
}
