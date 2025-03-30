import { NodeData } from "@/types/DragBuilder";
import { createContext, ReactNode } from "react";

type NodeDataUpdaterContextType = {
  updaterFunction: (id: string, nodeData: NodeData) => void
};

const NodeDataUpdaterContext = createContext<NodeDataUpdaterContextType>({
  updaterFunction: () => {}
});

export const NodeDataUpdaterProvider = ({
  children,
  updaterFunction,
}: {
  children: ReactNode;
  updaterFunction: NodeDataUpdaterContextType;
}) => {
  return (
    <NodeDataUpdaterContext.Provider value={updaterFunction}>
      {children}
    </NodeDataUpdaterContext.Provider>
  );
};

export default NodeDataUpdaterContext;
