import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardActionLink,
} from "@/components/cards/Card";
import { HiUser, HiArrowRight } from "react-icons/hi";
import { HiTrophy, HiSparkles, HiStar } from "react-icons/hi2";

const affiliates = [
  {
    name: "Affiliate Alpha",
    revenue: 1250.5,
    rank: "#1",
    status: "Top Performer",
    growth: "+12.5% vs last month",
  },
  {
    name: "Beta Partners",
    revenue: 980.75,
    rank: "#2",
    status: "Top Performer",
  },
  { name: "Gamma Growth", revenue: 810.0, rank: "#3", status: "Top Performer" },
  {
    name: "Delta Deals",
    revenue: 750.2,
    rank: "#4",
    status: "Active Affiliate",
  },
  {
    name: "Epsilon Earners",
    revenue: 690.9,
    rank: "#5",
    status: "Active Affiliate",
  },
  { name: "Zeta Zone", revenue: 650.0, rank: "#6", status: "Active Affiliate" },
  { name: "User", revenue: 450.75, rank: "#7", status: "Active Affiliate" },
];

export const TopAffiliates = () => {
  return (
    <Card variant="glass" className="h-[420px]">
      <CardHeader className="flex items-center justify-between pb-4">
        <h2 className="text-xl font-semibold text-white">
          Top Affiliates (Revenue)
        </h2>
        <div className="px-3 py-1 bg-white/5 rounded-full">
          <span className="text-sm text-gray-400">This Month</span>
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto h-[calc(100%-64px)]">
        <div className="space-y-3">
          {affiliates.map((affiliate, index) => (
            <div
              key={affiliate.name}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-400 min-w-[32px]">
                  {affiliate.rank}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  {index === 0 ? (
                    <HiTrophy className="w-4 h-4 text-yellow-400" />
                  ) : index === 1 ? (
                    <HiStar className="w-4 h-4 text-yellow-400" />
                  ) : index === 2 ? (
                    <HiSparkles className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <HiUser className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div>
                  <span className="text-white font-medium block">
                    {affiliate.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {affiliate.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-neon-cyan font-medium block">
                  ${affiliate.revenue.toFixed(2)}
                </span>
                {affiliate.growth && (
                  <span className="text-xs text-green-400">
                    {affiliate.growth}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-6">
        <CardActionLink
          href="/affiliates"
          variant="ghost"
          fullWidth
          className="flex items-center justify-center space-x-2 text-neon-cyan"
        >
          <span>View Full Affiliate Dashboard</span>
          <HiArrowRight className="w-4 h-4" />
        </CardActionLink>
      </CardFooter>
    </Card>
  );
};
