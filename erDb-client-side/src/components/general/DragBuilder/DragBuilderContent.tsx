/* eslint-disable */
import {
  DragBuilderCanvasProps,
  NODE_TYPE,
  RawBuilderData,
} from "@/types/DragBuilder";
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
  useReactFlow,
} from "@xyflow/react";
import { DragEventHandler, useCallback, useRef } from "react";
import { useImmer } from "use-immer";
import "@xyflow/react/dist/style.css";
import { NodesSelector } from "./NodesSelector";
import { useDnD } from "@/contexts/DnDContext";
import { v4 as uuidv4 } from "uuid";

function DragBuilderContent({
  id,
  nodeData,
  isEditable,
  config,
}: DragBuilderCanvasProps) {
  const [nodes, setNodes] = useImmer<Node[]>(nodeData.nodes);
  const [edges, setEdges] = useImmer<Edge[]>(nodeData.edges);

  const { screenToFlowPosition } = useReactFlow();

  const [type] = useDnD();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onNodesChange = useCallback((data: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(data, nds));
  }, []);

  const onEdgesChange = useCallback((data: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(data, eds));
  }, []);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      console.log("got here and type is", type, event);

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  return (
    <div className="h-full relative overflow-hidden dndflow">
      <NodesSelector
        allowedNodes={{
          ATTRIBUTE: true,
          ENTITY: true,
          RELATIONSHIP: true,
        }}
      />
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
          onDrop={onDrop}
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

export default DragBuilderContent;
