import { Card, CardContent, CardHeader } from "@/components/cards/Card";

const recommendations = [
  {
    title: "Marketing Copywriter",
    description: "Generate compelling ad copy.",
  },
  {
    title: "Image Generator",
    description: "Create stunning visuals.",
  },
  {
    title: "Optimize Logistics Network",
    description: "High reward challenge!",
  },
  {
    title: "New Product Launch",
    description: "Super ",
  },
];

export const Recommendations = () => {
  return (
    <Card variant="glass">
      <CardHeader>
        <h2 className="text-xl font-semibold text-white">Recommendations</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div
              key={rec.title}
              className="p-3 bg-white/5 rounded-lg pt-4 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <h3 className="text-white font-medium">{rec.title}</h3>
              <p className="text-sm text-gray-400">{rec.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
