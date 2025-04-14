import { Card, CardContent, CardHeader } from "@/components/cards/Card";
import {
  HiOutlineChatAlt,
  HiOutlineSparkles,
  HiOutlineCode,
} from "react-icons/hi";

const activities = [
  {
    icon: HiOutlineChatAlt,
    title: "Project Alpha Discussion",
    description: "Chat with team about project requirements",
    time: "2 hours ago",
  },
  {
    icon: HiOutlineSparkles,
    title: "API Integration",
    description: "Generated API documentation",
    time: "4 hours ago",
  },
  {
    icon: HiOutlineCode,
    title: "Billing Query",
    description: "Resolved payment processing issue",
    time: "6 hours ago",
  },
];

export const RecentActivity = () => {
  return (
    <Card variant="glass">
      <CardHeader>
        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <activity.icon className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <h3 className="text-white font-medium">{activity.title}</h3>
                <p className="text-sm text-gray-400">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
