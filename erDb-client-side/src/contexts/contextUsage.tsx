import { useContext } from "react";
import DnDContext from "./DnDContext";
import NodeDataUpdaterContext from "./NodeDataUpdaterContext";

export const useDnD = () => {
    return useContext(DnDContext);
};

export const useNodeDataUpdater = () => {
    return useContext(NodeDataUpdaterContext);
};