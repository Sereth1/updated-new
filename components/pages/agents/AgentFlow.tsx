/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  NodeTypes,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { cn } from "@/lib/utils";

interface AgentFlowProps {
  title: string;
  description: string;
  initialNodes: Node[];
  initialEdges: Edge[];
  className?: string;
}

const customNodeStyles = {
  background:
    "linear-gradient(135deg, rgba(6, 19, 49, 0.8) 0%, rgba(6, 19, 49, 0.95) 100%)",
  border: "2px solid rgba(0, 255, 255, 0.3)",
  borderRadius: "12px",
  padding: "12px",
  boxShadow: "1px 2px 10px rgba(0, 255, 255, 0.3)",
  backdropFilter: "blur(8px)",
  width: "180px",
  height: "120px",
  pointerEvents: "none" as const,
};

const InputNode = ({ data }: { data: any }) => (
  <div
    style={{
      ...customNodeStyles,
      borderColor: "rgba(0, 255, 255, 0.5)",
    }}
    className="flex flex-col items-center justify-center"
  >
    <Handle type="source" position={Position.Bottom} />
    {data.icon}
    <div className="text-white font-medium">{data.label}</div>
    {data.description && (
      <div className="text-white/60 text-sm mt-1">{data.description}</div>
    )}
  </div>
);

const OutputNode = ({ data }: { data: any }) => (
  <div
    style={{
      ...customNodeStyles,
      borderColor: "rgba(0, 255, 255, 0.5)",
    }}
    className="flex flex-col items-center justify-center"
  >
    <Handle type="target" position={Position.Top} />
    {data.icon}
    <div className="text-white font-medium">{data.label}</div>
    {data.description && (
      <div className="text-white/60 text-sm mt-1">{data.description}</div>
    )}
  </div>
);

const DefaultNode = ({ data }: { data: any }) => (
  <div
    style={customNodeStyles}
    className="flex flex-col items-center justify-center"
  >
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
    {data.icon}
    <div className="text-white font-medium">{data.label}</div>
    {data.description && (
      <div className="text-white/60 text-sm mt-1">{data.description}</div>
    )}
  </div>
);

const nodeTypes: NodeTypes = {
  input: InputNode,
  output: OutputNode,
  default: DefaultNode,
};

export function AgentFlow({
  title,
  description,
  initialNodes,
  initialEdges,
  className,
}: AgentFlowProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => [...eds, params]),
    [setEdges]
  );

  return (
    <div
      className={cn(
        "w-full h-[600px] bg-darkBlue rounded-xl p-6 shadow-xl overflow-hidden select-none",
        className
      )}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-neon-cyan mb-2">{title}</h3>
        <p className="text-slate-300 text-lg">{description}</p>
      </div>
      <div className="h-[calc(100%-88px)] pointer-events-none">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{
            animated: true,
            style: { stroke: "rgba(0, 255, 255, 0.5)", strokeWidth: 2 },
          }}
          className="bg-darkBlue cursor-grab"
          zoomOnScroll={true}
          zoomOnPinch={true}
          zoomOnDoubleClick={true}
          panOnScroll={true}
          panOnDrag={true}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          minZoom={0.5}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        />
      </div>
    </div>
  );
}
