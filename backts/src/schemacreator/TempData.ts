const nodes = {
    2: {
        id: 2,
        data: { entityController: { entityName: "Test" } },
        inputs: {
            attribute1: { connections: [{ node: 3, output: "attributeOutput", data: {} }] },
            attribute2: { connections: [{ node: 4, output: "attributeOutput", data: {} }] },
            attribute3: { connections: [{ node: 5, output: "attributeOutput", data: {} }] },
        },
        outputs: { entityOutput: { connections: [] } },
        position: [-422.18447590880714, -381.63433732206784],
        name: "Entity",
    },
    3: {
        id: 3,
        data: { attributeOutput: { attributeName: "abc", datatype: "number", primaryKey: 0 } },
        inputs: {},
        outputs: { attributeOutput: { connections: [{ node: 2, input: "attribute1", data: {} }] } },
        position: [-851.5, -439.5],
        name: "Attribute",
    },
    4: {
        id: 4,
        data: { attributeOutput: { attributeName: "def", datatype: "number", primaryKey: 0 } },
        inputs: {},
        outputs: { attributeOutput: { connections: [{ node: 2, input: "attribute2", data: {} }] } },
        position: [-843.5, -254.5],
        name: "Attribute",
    },
    5: {
        id: 5,
        data: { attributeOutput: { attributeName: "ijk", datatype: "number", primaryKey: 0 } },
        inputs: {},
        outputs: { attributeOutput: { connections: [{ node: 2, input: "attribute3", data: {} }] } },
        position: [-855.5, -46.5],
        name: "Attribute",
    },
};

export default nodes;
