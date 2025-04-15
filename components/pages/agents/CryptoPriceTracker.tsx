"use client";

import { AgentFlow } from "./AgentFlow";
import {
  HiOutlineClock,
  HiOutlineChip,
  HiOutlineCurrencyDollar,
  HiOutlineBell,
} from "react-icons/hi";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: {
      label: "Schedule Trigger",
      icon: <HiOutlineClock className="w-8 h-8 text-neon-cyan mb-2" />,
    },
    position: { x: 0, y: 100 },
    style: {
      width: 180,
      height: 120,
    },
  },
  {
    id: "2",
    type: "default",
    data: {
      label: "Crypto Agent",
      icon: <HiOutlineChip className="w-8 h-8 text-neon-cyan mb-2" />,
    },
    position: { x: 250, y: 100 },
    style: {
      width: 180,
      height: 120,
    },
  },
  {
    id: "3",
    type: "default",
    data: {
      label: "Price API",
      icon: <HiOutlineCurrencyDollar className="w-8 h-8 text-neon-cyan mb-2" />,
    },
    position: { x: 500, y: 100 },
    style: {
      width: 180,
      height: 120,
    },
  },
  {
    id: "4",
    type: "output",
    data: {
      label: "Price Alert",
      icon: <HiOutlineBell className="w-8 h-8 text-neon-cyan mb-2" />,
    },
    position: { x: 750, y: 100 },
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
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    style: { stroke: "rgba(0, 255, 255, 0.5)" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    style: { stroke: "rgba(0, 255, 255, 0.5)" },
  },
];

export function CryptoPriceTracker() {
  return (
    <AgentFlow
      title="Crypto Price Tracker"
      description="An automated agent that monitors cryptocurrency prices and sends alerts"
      initialNodes={initialNodes}
      initialEdges={initialEdges}
    />
  );
}
