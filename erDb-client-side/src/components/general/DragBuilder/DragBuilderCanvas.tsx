import { DnDProvider } from "@/contexts/DnDContext";
import DragBuilderContent from "./DragBuilderContent";
import {
  DragBuilderCanvasProps,
  NODE_TYPE,
  NodeData,
} from "@/types/DragBuilder";
import { useImmer } from "use-immer";
import { Edge, Node } from "@xyflow/react";
import { useCallback } from "react";
import { NodeDataUpdaterProvider } from "@/contexts/NodeDataUpdaterContext";

export default function DragBuilderCanvas({
  id,
  nodeData,
  isEditable,
  config,
}: DragBuilderCanvasProps) {
  const [nodes, setNodes] = useImmer<Node<NodeData, NODE_TYPE>[]>(
    nodeData.nodes
  );
  const [edges, setEdges] = useImmer<Edge[]>(nodeData.edges);

  const handleNodeDataUpdate = useCallback(
    (id: string, nodeData: NodeData) => {
      setNodes((nds) => {
        nds.forEach((node) => {
          if (node.id === id) {
            node.data = nodeData;
          }
          // return node;
        });
      });
    },
    [setNodes]
  );

  return (
    <DnDProvider>
      <NodeDataUpdaterProvider
        updaterFunction={{ updaterFunction: handleNodeDataUpdate }}
      >
        <DragBuilderContent
          id={id}
          isEditable={isEditable}
          config={config}
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
        />
      </NodeDataUpdaterProvider>
    </DnDProvider>
  );
}
