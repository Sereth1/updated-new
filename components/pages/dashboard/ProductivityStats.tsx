import { Card, CardContent, CardHeader } from "@/components/cards/Card";
import { HiCode, HiBeaker, HiChartBar } from "react-icons/hi";

const focusAreas = [
  { name: "Coding", icon: HiCode, color: "text-blue-400" },
  { name: "Research", icon: HiBeaker, color: "text-purple-400" },
  { name: "Data Analysis", icon: HiChartBar, color: "text-green-400" },
];

export const ProductivityStats = () => {
  return (
    <Card variant="glass" className="h-[420px]">
      <CardHeader className="pb-4">
        <h2 className="text-xl font-semibold text-white">Productivity</h2>
      </CardHeader>
      <CardContent className="overflow-y-auto h-[calc(100%-64px)] space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-gray-400">Tasks Completed:</span>
            <span className="text-2xl font-bold text-white">15</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-gray-400">Avg. Time Saved / Task:</span>
            <span className="text-2xl font-bold text-white">8.5 hrs</span>
          </div>
        </div>

        <div>
          <h3 className="text-gray-400 mb-3">Focus Areas:</h3>
          <div className="space-y-2">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.name}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                >
                  <Icon className={`w-5 h-5 ${area.color}`} />
                  <span className="text-white">{area.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
