import Rete from "rete";

export class AddAttributeEntityControl extends Rete.Control {
    static component = ({ value, handleInputChange, addAttributeCallback }) => (
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
                /></div>
            <div>
                <button onClick={addAttributeCallback}>Add Attribtue</button>
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
                console.log(this.props.value);
            },
            addAttributeCallback: addAttributeCallback,
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

        // No control for output socket so far
        // const initial = node.data[key] || { entityName: "" };

        // node.data[key] = initial;
        // this.props = {
        //     value: initial,
        //     handleInputChange: (e) => {
        //         const { name, value } = e.target;
        //         this.props.value = { ...this.props.value, [name]: value };
        //         this.putData(this.key, this.props.value);
        //         this.update();
        //         console.log(this.props.value);
        //     }
        // };
    }
}
