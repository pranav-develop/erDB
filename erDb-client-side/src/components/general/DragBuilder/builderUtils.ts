import { EAttributeProperties, NODE_TYPE } from "@/types/DragBuilder";
import { ReactNode } from "react";

export const NODE_DESCRIPTIONS: {
  [key in NODE_TYPE]: {
    code: string; //unique code for each node type
    displayName: string;
    description: string;
    icon: ReactNode | string;
    defaultData: {
      [key: string]: unknown;
    };
  };
} = {
  ATTRIBUTE: {
    code: "ATTRIBUTE",
    displayName: "Attribute",
    description: "An attribute of an entity",
    icon: "🔢",
    defaultData: {
      name: "Untitled",
      attributeType: "VARCHAR",
      properties: {
        [EAttributeProperties.PRIMARY_KEY]: {
          checked: false,
          disabled: false,
        },
        [EAttributeProperties.FOREIGN_KEY]: {
          checked: false,
          disabled: false,
        },
        [EAttributeProperties.UNIQUE]: {
          checked: false,
          disabled: false,
        },
        [EAttributeProperties.NOT_NULL]: {
          checked: false,
          disabled: false,
        },
        [EAttributeProperties.DEFAULT]: {
          checked: false,
          disabled: false,
        },
        [EAttributeProperties.INDEX]: {
          checked: false,
          disabled: false,
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
    },
  },
  RELATIONSHIP: {
    code: "RELATIONSHIP",
    displayName: "Relationship",
    description: "A relationship between two entities",
    icon: "🔗",
    defaultData: {
      name: "Untitled",
    },
  },
};
