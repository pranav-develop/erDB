import { DnDProvider } from "@/contexts/DnDContext";
import DragBuilderContent from "./DragBuilderContent";
import { DragBuilderCanvasProps } from "@/types/DragBuilder";

export default function DragBuilderCanvas(props: DragBuilderCanvasProps) {
  return (
    // <DnDProvider>
    <DragBuilderContent {...props} />
    // </DnDProvider>
  );
}
