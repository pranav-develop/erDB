import { Node, Edge } from "@xyflow/react";

export interface RawBuilderData {
  nodes: Node[];
  edges: Edge[];
}

export enum NODE_TYPE {
  ATTRIBUTE = "ATTRIBUTE",
  ENTITY = "ENTITY",
  RELATIONSHIP = "RELATIONSHIP",
}

export interface DragBuilderCanvasProps {
  id: string;
  nodeData: RawBuilderData;
  isEditable: boolean;
  config: {
    allowedNodes: {
      [key in NODE_TYPE]?: boolean;
    };
  };
}

export enum AttributeDataType {
  BOOLEAN = "BOOLEAN",
  CHAR = "CHAR",
  VARCHAR = "VARCHAR",
  INTEGER = "INTEGER",
  TINY_INT = "TINY_INT",
  ENUM = "ENUM",
  BLOB = "BLOB",
  MEDIUM_BLOB = "MEDIUM_BLOB",
  LONG_BLOB = "LONG_BLOB",
}
