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
