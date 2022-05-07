import Rete from "rete";

export class RelationControl extends Rete.Control {
    static component = ({ value, handleInputChange }) => (
        <>
            <div>
                <input
                    readOnly
                    class="form-control"
                    placeholder="Relation Name"
                    type="string"
                    name="relationDescription"
                    value={value.relationDescription}
                    ref={(ref) => {
                        ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
                    }}
                    onChange={(e) => handleInputChange(e)}
                />
            </div>
        </>
    );

    constructor(emitter, key, node, readonly = false) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = RelationControl.component;

        const initial = node.data[key] || { relationDescription: "" };

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

    updateData(data) {
        const { name, value } = data;
        this.props.value = { ...this.props.value, [name]: value };
        this.putData(this.key, this.props.value);
        this.update();
    }
}
