import { Node, Edge } from "reactflow";

export interface AgentFlowProps {
  title: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}

export interface AgentNode {
  id: string;
  type: "input" | "output" | "default" | "agent" | "api" | "database";
  data: {
    label: string;
    description?: string;
    icon?: React.ReactNode;
  };
  position: { x: number; y: number };
}
