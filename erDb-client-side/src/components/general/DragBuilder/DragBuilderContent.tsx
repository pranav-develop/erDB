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
import { useImmer } from "use-immer";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import nodeTypes from "./Nodes";
import { useDnD } from "@/contexts/DnDContext";
import { NodesSelector } from "./NodesSelector";
import { NODE_DESCRIPTIONS } from "./builderUtils";

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

  const [nodes, setNodes] = useImmer<Node<NodeData, NODE_TYPE>[]>(nodeData.nodes);
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

  // Handle node and edge changes. Called when node and edges are added, removed, or updated.
  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nds) => {
        const prevData = [...nds];
        return applyNodeChanges(changes, prevData);
      }),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((eds) => {
        const prevEdges = [...eds];
        return applyEdgeChanges(changes, prevEdges);
      }),
    []
  );

  // Handle edge connect event.
  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => {
        const prevEdges = [...eds];
        return addEdge(params, prevEdges);
      }),
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
      console.log("got node data", type, nodeData);

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
