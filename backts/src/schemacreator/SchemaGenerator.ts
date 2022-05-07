import { ATTRIBUTE, ENTITY } from "./constants/NamingConstants";
import { entityGenerator } from "./EntityGenerator";
import { AttributeObject, EntityObject } from "./types/SpecificTypes";

// filters the relevent data from the nodeData passed to it
// nodeData comes from the reteJs via request.
const generateSchemaArray = (nodeData: any): EntityObject[] => {
    const idMapping: any = {};
    const entities: EntityObject[] = [];

    //mapping all the entities
    for (let i in nodeData) {
        if (nodeData[i].name === ENTITY) {
            const entityName: string = nodeData[i].data.entityController.entityName;
            const entity: EntityObject = { id: nodeData[i].id, name: entityName, attributes: [] };
            idMapping[2] = entities.length;
            entities.push(entity);
        }
    }

    //mapping all the attributes
    for (let i in nodeData) {
        if (nodeData[i].name === ATTRIBUTE) {
            const attributeName = nodeData[i].data.attributeOutput.attributeName.trim().toLowerCase();
            const dataType = nodeData[i].data.attributeOutput.datatype.trim().toLowerCase();
            const isPrimaryKey = nodeData[i].data.attributeOutput.primaryKey === 1 ? true : false;
            const attribute: AttributeObject = {
                id: nodeData[i].id,
                name: attributeName,
                dataType: dataType,
                isPrimaryKey: isPrimaryKey,
            };
            nodeData[i].outputs.attributeOutput.connections.forEach((connection: any) => {
                entities[idMapping[connection.node]].attributes.push(attribute);
            });
        }
    }

    console.log(entities);
    entities.forEach((entity: EntityObject) => {
        console.log(entity);
    });

    return entities;
};

//Responsible for genertating schema for the given nodeData.
const schemaGenerator = (nodeData: any): void => {
    const entityArray: EntityObject[] = generateSchemaArray(nodeData);
    entityGenerator(entityArray);
};
export default schemaGenerator;
