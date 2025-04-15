"use client";

import { AgentFlow } from "./AgentFlow";
import {
  HiOutlineChip,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlinePencil,
} from "react-icons/hi";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: {
      label: "Main Agent",
      icon: <HiOutlineChip className="w-8 h-8 text-neon-cyan mb-2" />,
    },
    position: { x: 400, y: 0 },
    style: {
      width: 180,
      height: 120,
    },
  },
  {
    id: "2",
    type: "default",
    data: {
      label: "Data Scraper",
      icon: <HiOutlineDocumentText className="w-8 h-8 text-neon-cyan mb-2" />,
    },
    position: { x: 0, y: 200 },
    style: {
      width: 180,
      height: 120,
    },
  },
  {
    id: "3",
    type: "default",
    data: {
      label: "Stats Analyzer",
      icon: <HiOutlineChartBar className="w-8 h-8 text-neon-cyan mb-2" />,
    },
    position: { x: 400, y: 200 },
    style: {
      width: 180,
      height: 120,
    },
  },
  {
    id: "4",
    type: "default",
    data: {
      label: "Summary Writer",
      icon: <HiOutlinePencil className="w-8 h-8 text-neon-cyan mb-2" />,
    },
    position: { x: 800, y: 200 },
    style: {
      width: 180,
      height: 120,
    },
  },
  {
    id: "5",
    type: "output",
    data: {
      label: "Final Report",
      icon: <HiOutlineDocumentText className="w-8 h-8 text-neon-cyan mb-2" />,
    },
    position: { x: 400, y: 400 },
    style: {
      width: 180,
      height: 120,
    },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "rgba(0, 255, 255, 0.5)" },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
    style: { stroke: "rgba(0, 255, 255, 0.5)" },
  },
  {
    id: "e1-4",
    source: "1",
    target: "4",
    animated: true,
    style: { stroke: "rgba(0, 255, 255, 0.5)" },
  },
  {
    id: "e2-5",
    source: "2",
    target: "5",
    animated: true,
    style: { stroke: "rgba(0, 255, 255, 0.5)" },
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    animated: true,
    style: { stroke: "rgba(0, 255, 255, 0.5)" },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: true,
    style: { stroke: "rgba(0, 255, 255, 0.5)" },
  },
];

export function MultiAgentResearchSystem() {
  return (
    <AgentFlow
      title="Multi-Agent Research System"
      description="A collaborative system of specialized agents working together to produce comprehensive research"
      initialNodes={initialNodes}
      initialEdges={initialEdges}
    />
  );
}
