import Rete from "rete";

export class AddAttributeEntityControl extends Rete.Control {
    static component = ({ addEntityCallback }) => (
        <>
            <div>
                <button onClick={addEntityCallback}>Add Attribtue</button>
            </div>
        </>
    );

    constructor(emitter, key, node, addEntityCallback) {
        super(key);
        this.emitter = emitter;
        this.component = AddAttributeEntityControl.component;
        this.props = {
            addEntityCallback: addEntityCallback,
        };
    }
}



export class EntityControl extends Rete.Control {
    static component = ({ value, handleInputChange }) => (
        <>
            <div>
                <input
                    type="string"
                    name="entityName"
                    value={value.entityName}
                    ref={(ref) => {
                        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
                    }}
                    onChange={(e) => handleInputChange(e)}
                />
            </div>
        </>
    );

    constructor(emitter, key, node) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = EntityControl.component;

        const initial = node.data[key] || { entityName: "" };

        node.data[key] = initial;
        this.props = {
            value: initial,
            handleInputChange: (e) => {
                const { name, value } = e.target;
                this.props.value = { ...this.props.value, [name]: value };
                this.putData(this.key, this.props.value);
                this.update();
                console.log(this.props.value);
            }
        };
    }
}
