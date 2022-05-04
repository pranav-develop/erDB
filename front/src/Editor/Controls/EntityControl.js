import Rete from "rete";

/**
 * This Control adds a new atribute
 */
export class AddAttributeEntityControl extends Rete.Control {
    static component = ({ value, handleInputChange, addAttributeCallback }) => (
        <>
            <div class="input-group">
                <input
                    class="form-control"
                    type="string"
                    name="entityName"
                    placeholder="Entity Name"
                    value={value.entityName}
                    ref={(ref) => {
                        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
                    }}
                    onChange={(e) => handleInputChange(e)}
                />
            </div>
            <div>
                <button type="button" class="btn btn-light" onClick={addAttributeCallback}>Add Attribtue</button>
            </div>
        </>
    );

    constructor(emitter, key, node, addAttributeCallback) {
        super(key);
        this.emitter = emitter;
        this.component = AddAttributeEntityControl.component;

        const initial = node.data[key] || { entityName: "" };

        node.data[key] = initial;
        this.props = {
            value: initial,
            handleInputChange: (e) => {
                const { name, value } = e.target;
                this.props.value = { ...this.props.value, [name]: value };
                this.putData(this.key, this.props.value);
                this.update();
                this.emitter.trigger("process");
            },
            addAttributeCallback: addAttributeCallback,
        };
    }
}