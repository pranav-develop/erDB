import { DragBuilderCanvas } from "@/components/general/DragBuilder";

function CreateDiagram() {
  return (
    <div className="h-full w-full">
      <DragBuilderCanvas
        id=""
        config={{
          allowedNodes: {
            ATTRIBUTE: true,
          },
        }}
        isEditable={true}
        nodeData={{
          nodes: [
            {
              id: "node-1",
              type: "ATTRIBUTE",
              position: { x: 0, y: 0 },
              data: { name: "Test node", attributeType: "Test" },
            },
          ],
          edges: [],
        }}
      />
    </div>
  );
}

export default CreateDiagram;
