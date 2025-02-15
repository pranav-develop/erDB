import { NODE_TYPE } from "@/types/DragBuilder";
import { ReactNode } from "react";

export const NODE_DESCRIPTIONS: {
  [key in NODE_TYPE]: {
    code: string; //unique code for each node type
    displayName: string;
    description: string;
    icon: ReactNode | string;
  };
} = {
  ATTRIBUTE: {
    code: "ATTRIBUTE",
    displayName: "Attribute",
    description: "An attribute of an entity",
    icon: "🔢",
  },
  ENTITY: {
    code: "ENTITY",
    displayName: "Entity",
    description: "An entity in the database",
    icon: "🏢",
  },
  RELATIONSHIP: {
    code: "RELATIONSHIP",
    displayName: "Relationship",
    description: "A relationship between two entities",
    icon: "🔗",
  },
};

