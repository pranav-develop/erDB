import { Node, NodeProps, Position } from "@xyflow/react";
import NodeWrapper from "./NodeWrapper";
import CustomHandle from "../Components/CustomHandle";
import { NODE_TYPE } from "@/types/DragBuilder";
import { NODE_DESCRIPTIONS } from "../builderUtils";

export type AttributeNodeData = Node<
  {
    name: string;
    attributeType: string;
  },
  NODE_TYPE.ATTRIBUTE
>;

function AttributeNode(props: NodeProps<AttributeNodeData>) {
  const nodeDescriptions = NODE_DESCRIPTIONS.ATTRIBUTE;

  return (
    <div className="">
      <CustomHandle type="target" position={Position.Left} />
      <NodeWrapper
        title={nodeDescriptions.displayName}
        description={nodeDescriptions.description}
      >
        <div>fefawefewf</div>
      </NodeWrapper>
      <CustomHandle type="source" position={Position.Bottom} id="b" />
      <CustomHandle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default AttributeNode;
