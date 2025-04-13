import { Card, CardContent } from "@/components/cards/Card";
import { HiCurrencyDollar, HiStar, HiTrendingUp } from "react-icons/hi";

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card variant="glass" hoverEffect>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">UPDT Balance</p>
              <h3 className="text-3xl font-bold text-neon-cyan mt-1">493</h3>
            </div>
            <div className="p-3 bg-neon-cyan/10 rounded-lg">
              <HiCurrencyDollar className="w-6 h-6 text-neon-cyan" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card variant="glass" hoverEffect>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Claimable Rewards</p>
              <h3 className="text-3xl font-bold text-yellow-400 mt-1">75.5</h3>
            </div>
            <div className="p-3 bg-yellow-400/10 rounded-lg">
              <HiStar className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card variant="glass" hoverEffect>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Rewards Earned</p>
              <h3 className="text-3xl font-bold text-green-400 mt-1">1,250</h3>
            </div>
            <div className="p-3 bg-green-400/10 rounded-lg">
              <HiTrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
