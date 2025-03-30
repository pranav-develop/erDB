import { Node, Edge } from "@xyflow/react";

export interface RawBuilderData {
  nodes: Node<NodeData, NODE_TYPE>[];
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

export enum EAttributeDataType {
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

export enum EAttributeProperties {
  PRIMARY_KEY = "PRIMARY_KEY",
  FOREIGN_KEY = "FOREIGN_KEY",
  UNIQUE = "UNIQUE",
  NOT_NULL = "NOT_NULL",
  DEFAULT = "DEFAULT",
  INDEX = "INDEX",
}

/** Node Data Types */

// export interface GenericNodeData extends Record<string, unknown> {
//   id: string;
//   name: string;
//   type: NODE_TYPE;
// }

// export interface AttributeData extends GenericNodeData {
//   type: NODE_TYPE.ATTRIBUTE;
//   attributeType: string;
//   properties: Record<
//     EAttributeProperties,
//     {
//       checked: boolean;
//     }
//   >;
// }

// export interface EntityData extends GenericNodeData {
//   type: NODE_TYPE.ENTITY;
// }

type GenericNodeData = {
  name: string;
  type: NODE_TYPE;
};

export type AttributeData = GenericNodeData & {
  type: NODE_TYPE.ATTRIBUTE;
  attributeType: string;
  properties: Record<
    EAttributeProperties,
    {
      checked: boolean;
    }
  >;
};

export type AttributeNodeData = Node<AttributeData, NODE_TYPE.ATTRIBUTE>;

export type EntityData = GenericNodeData & {
  type: NODE_TYPE.ENTITY;
};

export type EntityNodeData = Node<EntityData, NODE_TYPE.ENTITY>;

export type RelationData = GenericNodeData & {
  type: NODE_TYPE.RELATIONSHIP;
};

export type RelationNodeData = Node<RelationData, NODE_TYPE.RELATIONSHIP>;

export type NodeData = AttributeData | EntityData | RelationData;