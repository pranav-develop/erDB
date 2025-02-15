/* eslint-disable */
import { DragBuilderCanvasProps } from "@/types/DragBuilder";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Edge,
  Node,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";
import { useImmer } from "use-immer";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useRef } from "react";
import nodeTypes from "./Nodes";
import { useDnD } from "@/contexts/DnDContext";
import { NodesSelector } from "./NodesSelector";

let id = 0;
const getId = () => `dndnode_${id++}`;

function DragBuilderContent({
  id,
  nodeData,
  isEditable,
  config,
}: DragBuilderCanvasProps) {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes] = useImmer<Node[]>(nodeData.nodes);
  const [edges, setEdges] = useImmer<Edge[]>(nodeData.edges);

  // Handle node and edge changes. Called when node and edges are added, removed, or updated.
  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Handle edge connect event.
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const [type] = useDnD();

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

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
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  // All the types of nodes memoised
  const memoisedNodeTypes = useMemo(() => nodeTypes, []);

  return (
    <div className="w-full h-full">
      <NodesSelector
        allowedNodes={{
          ATTRIBUTE: true,
        }}
      />
      <ReactFlow
        id={`drag-builder-canvas-${id}`}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={memoisedNodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default DragBuilderContent;
