import { Node, NodeProps, Position } from "@xyflow/react";
import NodeWrapper from "./NodeWrapper";
import CustomHandle from "../Components/CustomHandle";
import { AttributeDataType, NODE_TYPE } from "@/types/DragBuilder";
import { NODE_DESCRIPTIONS } from "../builderUtils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        title={
          <div className="flex justify-start items-end gap-1">
            <div>Untitled - </div>
            <div className="font-normal">{nodeDescriptions.displayName}</div>
          </div>
        }
        description={nodeDescriptions.description}
      >
        <div className="py-3 grid gap-2">
          <div className="">
            <Label htmlFor="name" className="font-bold text-xs">
              Name
            </Label>
            <Input
              className="text-sm"
              type="email"
              id="name"
              placeholder="Name"
            />
          </div>
          <div>
            <Label htmlFor="name" className="font-bold text-xs">
              Type
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  {Object.keys(AttributeDataType).map((key) => (
                    <SelectItem
                      value={
                        AttributeDataType[key as keyof typeof AttributeDataType]
                      }
                    >
                      {key}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          {/* Multiple checkbox options */}
          <div>
              
          </div>
        </div>
      </NodeWrapper>
      <CustomHandle type="source" position={Position.Bottom} id="b" />
      <CustomHandle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default AttributeNode;
