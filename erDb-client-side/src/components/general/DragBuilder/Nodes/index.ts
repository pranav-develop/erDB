import { NODE_TYPE } from "@/types/DragBuilder";
import EntityNode from "./EntityNode";
import AttributeNode from "./AttributeNode";

const nodeTypes = {
  [NODE_TYPE.ATTRIBUTE]: AttributeNode,
  [NODE_TYPE.ENTITY]: EntityNode,
};

export default nodeTypes;
