import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NODE_TYPE } from "@/types/DragBuilder";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { NODE_DESCRIPTIONS } from "../builderUtils";
import { useDnD } from "@/contexts/contextUsage";

function EachDraggableNode({ nodeType }: { nodeType: NODE_TYPE }) {
  const nodeData = NODE_DESCRIPTIONS[nodeType];
  const [_, setType] = useDnD();

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: NODE_TYPE
  ) => {
    setType(nodeType);
    event.dataTransfer.setData("application/reactflow-nodetype", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="py-2 dndnode"
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center gap-2">
              <div>{nodeData.icon}</div>
              <div className="capitalize">{nodeData.displayName}</div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{nodeData.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="">{}</div>
    </div>
  );
}

export default EachDraggableNode;
