import { Node, NodeProps, Position } from "@xyflow/react";
import NodeWrapper from "./NodeWrapper";
import CustomHandle from "../Components/CustomHandle";
import { NODE_TYPE } from "@/types/DragBuilder";

export type AttributeNodeData = Node<
  {
    id: string;
    name: string;
    attributeType: string;
  },
  NODE_TYPE.ATTRIBUTE
>;

function AttributeNode(props: NodeProps<AttributeNodeData>) {
  return (
    <div className="">
      <CustomHandle type="target" position={Position.Left} />
      <NodeWrapper>
        <div>This is an attribute node {props.data.attributeType}</div>
      </NodeWrapper>
      <CustomHandle type="source" position={Position.Bottom} id="b" />
      <CustomHandle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default AttributeNode;
