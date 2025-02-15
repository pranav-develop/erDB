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
} from "@xyflow/react";
import { useImmer } from "use-immer";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo } from "react";
import nodeTypes from "./Nodes";

function DragBuilderContent({
  id,
  nodeData,
  isEditable,
  config,
}: DragBuilderCanvasProps) {
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

  // All the types of nodes memoised
  const memoisedNodeTypes = useMemo(() => nodeTypes, []);

  return (
    <div className="w-full h-full">
      <ReactFlow
        id={`drag-builder-canvas-${id}`}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={memoisedNodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default DragBuilderContent;
