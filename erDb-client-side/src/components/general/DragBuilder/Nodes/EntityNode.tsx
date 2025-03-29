import { NodeProps, Position } from "@xyflow/react";
import CustomHandle from "../Components/CustomHandle";
import NodeWrapper from "./NodeWrapper";
import { NODE_DESCRIPTIONS } from "../builderUtils";
import { EntityData, EntityNodeData } from "@/types/DragBuilder";
import { useImmer } from "use-immer";
import { useEffect } from "react";
import { useLazyEffect } from "@/hooks/useLazyEffect";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";





function EntityNode(props: NodeProps<EntityNodeData>) {
  const nodeDescriptions = NODE_DESCRIPTIONS.ENTITY;

  const [nodeData, setNodeData] = useImmer<EntityData>({} as EntityData);
  
    useEffect(() => {
      setNodeData(props.data);
    }, [props.data]);
  
    useLazyEffect(() => {
      props.data.updateNodeData(props.id, nodeData);
    }, [nodeData]);

  return (
    <div>
      <CustomHandle type="target" position={Position.Left} />
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

          </div>
        </div>
      </NodeWrapper>
    </div>
  );
}

export default EntityNode;
