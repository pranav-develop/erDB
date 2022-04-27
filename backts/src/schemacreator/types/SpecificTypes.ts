export interface AttributeObject {
    id: string | number;
    name: string;
    dataType: string;
    isPrimaryKey: boolean;
}

export interface EntityObject {
    id: string | number;
    name: string;
    attributes: AttributeObject[];
}
