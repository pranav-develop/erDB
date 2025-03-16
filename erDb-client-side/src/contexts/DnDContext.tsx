import { NODE_TYPE } from "@/types/DragBuilder";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type DnDContextType = [
  NODE_TYPE | null,
  Dispatch<SetStateAction<NODE_TYPE | null>>
];
const DnDContext = createContext<DnDContextType>([null, (_) => {}]);

export const DnDProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<NODE_TYPE | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

export const useDnD = () => {
  return useContext(DnDContext);
};
