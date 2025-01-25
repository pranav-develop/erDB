import { NODE_TYPE, RawBuilderData } from "@/types/DragBuilder";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  ReactFlow,
} from "@xyflow/react";
import { useCallback, useRef } from "react";
import { useImmer } from "use-immer";
import "@xyflow/react/dist/style.css";
import { NodesSelector } from "./NodesSelector";

function DragBuilderCanvas({
  id,
  nodeData,
  isEditable,
  config,
}: DragBuilderCanvasProps) {
  const [nodes, setNodes] = useImmer<Node[]>(nodeData.nodes);
  const [edges, setEdges] = useImmer<Edge[]>(nodeData.edges);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onNodesChange = useCallback((data: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(data, nds));
  }, []);

  const onEdgesChange = useCallback((data: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(data, eds));
  }, []);

  return (
    <div className="h-full relative overflow-hidden">
      <div
        key={id}
        className="flex items-center h-full"
        ref={reactFlowWrapper}
        onContextMenu={(e) => e.preventDefault()}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          deleteKeyCode={["ControlLeft+Backspace", "Delete"]}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        >
          <MiniMap
            className="mb-6"
            nodeStrokeWidth={3}
            position="bottom-left"
            zoomable
            pannable
          />
          <Controls className="flex" position="bottom-right" />
          <Background
            color={"#D2D3E0"}
            variant={BackgroundVariant.Lines}
            gap={60}
            lineWidth={0.5}
            size={1}
          />
        </ReactFlow>
      </div>
    </div>
  );
}

export default DragBuilderCanvas;

interface DragBuilderCanvasProps {
  id: string;
  nodeData: RawBuilderData;
  isEditable: boolean;
  config: {
    allowedNodes: {
      [key in NODE_TYPE]?: boolean;
    };
  };
}
