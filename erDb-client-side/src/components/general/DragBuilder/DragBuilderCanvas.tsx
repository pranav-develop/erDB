import { DnDProvider } from "@/contexts/DnDContext";
import DragBuilderContent from "./DragBuilderContent";
import {
	DragBuilderCanvasProps,
	NODE_TYPE,
	NodeData,
} from "@/types/DragBuilder";
import { Edge, Node } from "@xyflow/react";
import { useCallback, useState } from "react";
import { NodeDataUpdaterProvider } from "@/contexts/NodeDataUpdaterContext";

export default function DragBuilderCanvas({
	id,
	nodeData,
	isEditable,
	config,
}: DragBuilderCanvasProps) {
	const [nodes, setNodes] = useState<Node<NodeData, NODE_TYPE>[]>(
		nodeData.nodes
	);
	const [edges, setEdges] = useState<Edge[]>(nodeData.edges);

	const handleNodeDataUpdate = useCallback(
		(id: string, nodeData: NodeData) => {
			setNodes((prev) => {
				return prev.map((node: Node<NodeData, NODE_TYPE>) => {
					if (node.id === id) {
						return {
							...node,
							data: nodeData,
						};
					}
					return node;
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
