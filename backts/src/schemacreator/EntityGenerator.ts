import { EntityObject } from "./types/SpecificTypes";
import { generalAttrubuteSchema, primarykeySchema, primaryKeySchemaDefault } from "./utils/helper";
import fs from "fs";

export const entityGenerator = (entities: EntityObject[]): void => {
    // TODO: delete all the files the existing schema before generating new
    entities.forEach((entity) => {
        const schema = generateEntitySchema(entity);
        fs.writeFileSync(`./${entity.name.trim().toLowerCase()}.ts`, schema);
    });
};

const generateEntitySchema = (entity: EntityObject): string => {
    let hasPrimaryKey = false;

    //generating schema for attributes
    const attributesSchema: string[] = [];
    entity.attributes.forEach((attribute) => {
        if (attribute.isPrimaryKey) {
            hasPrimaryKey = true;
            attributesSchema.push(primarykeySchema(attribute));
        } else {
            attributesSchema.push(generalAttrubuteSchema(attribute));
        }
    });

    //generating schema for entities
    const entitySchema: string = `
        import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

        @Entity("${entity.name}")
        class ${entity.name.toUpperCase()} {
        
            ${!hasPrimaryKey ? primaryKeySchemaDefault() : ""}
            
            ${attributesSchema.join("\n")}
            
        }
    `;

    return entitySchema;
};
