import { EntityObject } from "./types/SpecificTypes";
import { generalAttrubuteSchema, primarykeySchema, primaryKeySchemaDefault } from "./utils/helper";
import fs from "fs";

//Generate schema files for list of enitities given.
export const entityGenerator = (entities: EntityObject[]): void => {
    entities.forEach((entity) => {
        const schema = generateEntitySchema(entity);
        fs.writeFileSync(`${__dirname}/DBConfig/entity/${entity.name.trim().toLowerCase()}.ts`, schema);
    });
};

//Generates actual entity schema for the given entity object
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

        @Entity()
        export class ${entity.name.toLowerCase()} {
        
            ${!hasPrimaryKey ? primaryKeySchemaDefault() : ""}
            
            ${attributesSchema.join("\n")}
            
        }
    `;

    return entitySchema;
};
