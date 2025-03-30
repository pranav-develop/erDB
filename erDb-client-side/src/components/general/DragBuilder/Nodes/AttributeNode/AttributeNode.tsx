import { NodeProps, Position } from "@xyflow/react";
import NodeWrapper from "../NodeWrapper";
import CustomHandle from "../../Components/CustomHandle";
import {
  AttributeData,
  AttributeNodeData,
  EAttributeDataType,
  EAttributeProperties,
} from "@/types/DragBuilder";
import { NODE_DESCRIPTIONS } from "../../builderUtils";
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
import { useImmer } from "use-immer";
import { useLazyEffect } from "@/hooks/useLazyEffect";
import { useEffect } from "react";
import AttributeProperties from "./AttributeProperties";
import AttributePropertyValues from "./AttributePropertyValues";
import { useNodeDataUpdater } from "@/contexts/contextUsage";

function AttributeNode(props: NodeProps<AttributeNodeData>) {
  const nodeDescriptions = NODE_DESCRIPTIONS.ATTRIBUTE;

  const [nodeData, setNodeData] = useImmer<AttributeData>({
    properties: {
      [EAttributeProperties.PRIMARY_KEY]: {
        checked: false,
      },
      [EAttributeProperties.FOREIGN_KEY]: {
        checked: false,
      },
      [EAttributeProperties.UNIQUE]: {
        checked: false,
      },
      [EAttributeProperties.NOT_NULL]: {
        checked: false,
      },
      [EAttributeProperties.DEFAULT]: {
        checked: false,
      },
      [EAttributeProperties.INDEX]: {
        checked: false,
      },
    },
  } as AttributeData);
  const { updaterFunction } = useNodeDataUpdater();

  useEffect(() => {
    setNodeData(props.data);
  }, [props.data]);

  useLazyEffect(() => {
    updaterFunction(props.id, nodeData);
  }, [nodeData]);

  return (
    <div className="">
      <CustomHandle type="source" position={Position.Right} />
      <NodeWrapper
        title={
          <div className="flex justify-start items-end gap-1">
            <div className="capitalize">
              {props.data.name.length > 0 ? props.data.name : "Untitled"} -{" "}
            </div>
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
              onChange={(e) => {
                setNodeData((draft) => {
                  draft.name = e.target.value;
                });
              }}
            />
          </div>
          <div>
            <Label htmlFor="name" className="font-bold text-xs">
              Data Type
            </Label>
            <Select
              value={nodeData.attributeType}
              onValueChange={(value) => {
                setNodeData((draft) => {
                  draft.attributeType = value;
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  {Object.keys(EAttributeDataType).map((key) => (
                    <SelectItem
                      key={key}
                      value={
                        EAttributeDataType[
                          key as keyof typeof EAttributeDataType
                        ]
                      }
                    >
                      {key}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <AttributeProperties
            attributeProperties={nodeData.properties}
            setAttributeProperties={(
              properties: AttributeData["properties"]
            ) => {
              setNodeData((prev) => {
                prev.properties = properties;
              });
            }}
          />
          <AttributePropertyValues
            nodeData={nodeData}
            setNodeData={setNodeData}
          />
        </div>
      </NodeWrapper>
    </div>
  );
}

export default AttributeNode;
