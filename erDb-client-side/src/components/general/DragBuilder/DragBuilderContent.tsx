/* eslint-disable */
import { DragBuilderCanvasProps, NODE_TYPE, NodeData } from "@/types/DragBuilder";
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
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useRef } from "react";
import nodeTypes from "./Nodes";
import { NodesSelector } from "./NodesSelector";
import { NODE_DESCRIPTIONS } from "./builderUtils";
import { useDnD } from "@/contexts/contextUsage";

let id = 0;
const getId = () => `dndnode_${id++}`;

interface DragBuilderContentProps {
  id: string;
  nodes: Node<NodeData, NODE_TYPE>[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node<NodeData, NODE_TYPE>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  config: DragBuilderCanvasProps["config"];
  isEditable: boolean;
}

function DragBuilderContent({
  id,
  isEditable,
  config,
  nodes,
  edges,
  setNodes,
  setEdges,
}: DragBuilderContentProps) {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

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

      // Getting the default data for that node
      const nodeData = NODE_DESCRIPTIONS[type].defaultData;
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
        data: {
          ...nodeData,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  // All the types of nodes memoised
  const memoisedNodeTypes = useMemo(() => nodeTypes, []);

  return (
    <div className="w-full h-full">
      <NodesSelector allowedNodes={config.allowedNodes} />
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
