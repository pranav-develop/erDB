import { EAttributeProperties, NODE_TYPE, NodeData } from "@/types/DragBuilder";
import { ReactNode } from "react";

export const NODE_DESCRIPTIONS: {
  [key in NODE_TYPE]: {
    code: string; //unique code for each node type
    displayName: string;
    description: string;
    icon: ReactNode | string;
    defaultData: NodeData;
  };
} = {
  ATTRIBUTE: {
    code: "ATTRIBUTE",
    displayName: "Attribute",
    description: "An attribute of an entity",
    icon: "🔢",
    defaultData: {
      name: "Untitled",
      type: NODE_TYPE.ATTRIBUTE,
      attributeType: "VARCHAR",
      properties: {
        [EAttributeProperties.PRIMARY_KEY]: {
          checked: false,
        },
        [EAttributeProperties.FOREIGN_KEY]: {
          checked: false,
        },
        [EAttributeProperties.UNIQUE]: {
          checked: false,
        },
        [EAttributeProperties.NOT_NULL]: {
          checked: false,
        },
        [EAttributeProperties.DEFAULT]: {
          checked: false,
        },
        [EAttributeProperties.INDEX]: {
          checked: false,
        },
      },
    },
  },
  ENTITY: {
    code: "ENTITY",
    displayName: "Entity",
    description: "An entity in the database",
    icon: "🏢",
    defaultData: {
      name: "Untitled",
      type: NODE_TYPE.ENTITY,
    },
  },
  RELATIONSHIP: {
    code: "RELATIONSHIP",
    displayName: "Relationship",
    description: "A relationship between two entities",
    icon: "🔗",
    defaultData: {
      name: "Untitled",
      type: NODE_TYPE.RELATIONSHIP,
    },
  },
};
