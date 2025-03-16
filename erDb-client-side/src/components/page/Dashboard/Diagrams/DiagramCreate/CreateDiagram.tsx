import { DragBuilderCanvas } from "@/components/general/DragBuilder";

function CreateDiagram() {
  return (
    <div className="h-full w-full">
      <DragBuilderCanvas
        id=""
        config={{
          allowedNodes: {
            ATTRIBUTE: true,
            ENTITY: true,
          },
        }}
        isEditable={true}
        nodeData={{
          nodes: [],
          edges: [],
        }}
      />
    </div>
  );
}

export default CreateDiagram;
