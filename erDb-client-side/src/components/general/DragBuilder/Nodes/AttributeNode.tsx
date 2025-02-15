import { Position } from "@xyflow/react";
import NodeWrapper from "./NodeWrapper";
import CustomHandle from "../Components/CustomHandle";

function AttributeNode() {
  return (
    <div className="">
      <CustomHandle type="target" position={Position.Left} />
      <NodeWrapper>
        <div>This is an attribute node</div>
      </NodeWrapper>
      <CustomHandle type="source" position={Position.Bottom} id="b" />
      <CustomHandle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default AttributeNode;
