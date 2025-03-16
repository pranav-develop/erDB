import { EAttributeProperties } from "@/types/DragBuilder";
import AttributeNode from "./AttributeNode";


export const ATTRIBUTE_PROPERTIES_DATA: Record<
  EAttributeProperties,
  {
    key: string;
    type: EAttributeProperties;
    label: string;
    disables: EAttributeProperties[];
    checks: EAttributeProperties[];
  }
> = {
  [EAttributeProperties.PRIMARY_KEY]: {
    key: "isPrimaryKey",
    label: "Primary Key",
    type: EAttributeProperties.PRIMARY_KEY,
    disables: [
      EAttributeProperties.FOREIGN_KEY,
      EAttributeProperties.UNIQUE,
      EAttributeProperties.NOT_NULL,
      EAttributeProperties.INDEX,
    ],
    checks: [
      EAttributeProperties.NOT_NULL,
      EAttributeProperties.UNIQUE,
      EAttributeProperties.INDEX,
    ],
  },
  [EAttributeProperties.FOREIGN_KEY]: {
    key: "isForeignKey",
    type: EAttributeProperties.FOREIGN_KEY,
    label: "Foreign Key",
    disables: [EAttributeProperties.PRIMARY_KEY],
    checks: [],
  },
  [EAttributeProperties.UNIQUE]: {
    key: "isUnique",
    type: EAttributeProperties.UNIQUE,
    label: "Unique",
    disables: [],
    checks: [],
  },
  [EAttributeProperties.NOT_NULL]: {
    key: "isNotNull",
    type: EAttributeProperties.NOT_NULL,
    label: "Not NULL",
    disables: [],
    checks: [],
  },
  [EAttributeProperties.DEFAULT]: {
    key: "isDefaultSet",
    type: EAttributeProperties.DEFAULT,
    label: "Default",
    disables: [],
    checks: [],
  },
  [EAttributeProperties.INDEX]: {
    key: "isIndexed",
    type: EAttributeProperties.INDEX,
    label: "Index",
    disables: [],
    checks: [],
  },
};

export default AttributeNode;