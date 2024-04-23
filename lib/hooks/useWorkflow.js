import { useContext } from "react";
import { WorkflowContext } from "../contexts/WorkflowContext";

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
