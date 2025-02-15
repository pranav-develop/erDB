import { NODE_TYPE } from "@/types/DragBuilder";
import AttributeNode from "./AttributeNode";

const nodeTypes = {
  [NODE_TYPE.ATTRIBUTE]: AttributeNode,
};

export default nodeTypes;
