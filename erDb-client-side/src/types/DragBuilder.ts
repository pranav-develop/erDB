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

interface GenericNodeData {
  id: string;
  name: string;
}

export type AttributeData = {
  name: string;
  type: NODE_TYPE.ATTRIBUTE,
  attributeType: string;
  properties: Record<
    EAttributeProperties,
    {
      checked: boolean;
    }
  >;
};

export type AttributeNodeData = Node<AttributeData, NODE_TYPE.ATTRIBUTE>;

export type EntityData = {
  name: string;
  type: NODE_TYPE.ENTITY;
};

export type EntityNodeData = Node<EntityData, NODE_TYPE.ENTITY>;

export type NodeData = AttributeData | EntityData; 