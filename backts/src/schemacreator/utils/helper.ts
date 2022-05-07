import { AttributeObject } from "../types/SpecificTypes";

export const primaryKeySchemaDefault = (): string => {
    return `
        @PrimaryGeneratedColumn()
        pk: number;
    `;
};

export const primarykeySchema = (attribute: AttributeObject): string => {
    return `
        @PrimaryColumn()
        ${attribute.name.trim().toLowerCase()}: ${attribute.dataType};
    `;
};

export const generalAttrubuteSchema = (attribute: AttributeObject): string => {
    return `
        @Column()
        ${attribute.name.trim().toLowerCase()}: ${attribute.dataType};
    `;
};
