import { Card, CardContent, CardHeader } from "@/components/cards/Card";
import { HiChat, HiClock, HiEmojiHappy } from "react-icons/hi";

const stats = [
  { label: "Total Chats", value: "128", icon: HiChat, color: "text-blue-400" },
  {
    label: "Avg. Response",
    value: "1.2s",
    icon: HiClock,
    color: "text-purple-400",
  },
  {
    label: "Sentiment Score",
    value: "85%",
    icon: HiEmojiHappy,
    color: "text-green-400",
  },
];

const topTopics = ["Project Alpha", "API Integration", "Billing Query"];

const improvements = [
  "Consider clarifying the documentation for the 'XYZ' feature.",
  "Explore using pre-defined snippets for common support questions.",
];

export const ConversationInsights = () => {
  return (
    <Card variant="glass" className="h-[420px]">
      <CardHeader className="pb-4">
        <h2 className="text-xl font-semibold text-white">
          Conversation Insights
        </h2>
      </CardHeader>
      <CardContent className="overflow-y-auto h-[calc(100%-64px)]">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Top Topics */}
          <div>
            <h3 className="text-white font-medium mb-3">Top Topics:</h3>
            <div className="space-y-2">
              {topTopics.map((topic) => (
                <div
                  key={topic}
                  className="p-3 bg-white/5 rounded-lg text-white"
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>

          {/* Improvements */}
          <div>
            <h3 className="text-white font-medium mb-3">
              Suggested Improvements:
            </h3>
            <div className="space-y-2">
              {improvements.map((improvement) => (
                <div
                  key={improvement}
                  className="p-3 bg-white/5 rounded-lg text-gray-400 text-sm"
                >
                  {improvement}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
