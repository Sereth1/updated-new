import { Card, CardContent, CardHeader } from "@/components/cards/Card";
import {
  HiOutlineChatAlt,
  HiOutlineSparkles,
  HiOutlineCode,
  HiOutlineLightningBolt,
} from "react-icons/hi";

const quickActions = [
  { name: "New Chat", icon: HiOutlineChatAlt, color: "text-blue-400" },
  { name: "AI Agents", icon: HiOutlineSparkles, color: "text-purple-400" },
  { name: "Tools", icon: HiOutlineCode, color: "text-green-400" },
  {
    name: "Challenges",
    icon: HiOutlineLightningBolt,
    color: "text-yellow-400",
  },
];

export const QuickActions = () => {
  return (
    <Card variant="glass" className="h-full">
      <CardHeader className="pb-4">
        <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.name}
                className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                <Icon className={`w-6 h-6 ${action.color} mb-2`} />
                <span className="text-sm text-white">{action.name}</span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
