import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NODE_TYPE } from "@/types/DragBuilder";
import EachDraggableNode from "./EachDraggableNode";

interface NodeSelectorProps {
  allowedNodes: {
    [key in NODE_TYPE]?: boolean;
  };
}

function NodesSelector({ allowedNodes }: NodeSelectorProps) {

  return (
    <div className="absolute right-5 top-[30%] z-10">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Nodes</CardTitle>
          <CardDescription>Drag and drop nodes in the builder</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.entries(allowedNodes).map(([key, value]) => {
            if (value) {
              return (
                <EachDraggableNode key={key} nodeType={key as NODE_TYPE} />
              );
            }
            return "";
          })}
        </CardContent>
      </Card>
    </div>
  );
}

export default NodesSelector;
