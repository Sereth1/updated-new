"use client";

import { DashboardStats } from "@/components/pages/dashboard/DashboardStats";
import { ProductivityStats } from "@/components/pages/dashboard/ProductivityStats";
import { UsageChart } from "@/components/pages/dashboard/UsageChart";
import { TopAffiliates } from "@/components/pages/dashboard/TopAffiliates";
import { ConversationInsights } from "@/components/pages/dashboard/ConversationInsights";
import {
  Card,
  CardContent,
  CardHeader,
  CardActionButton,
} from "@/components/cards/Card";
import {
  HiPlus,
  HiOutlineChatAlt,
  HiOutlineSparkles,
  HiOutlineCode,
  HiOutlineLightningBolt,
} from "react-icons/hi";

const quickActions = [
  { name: "New Chat", icon: HiOutlineChatAlt },
  { name: "AI Agents", icon: HiOutlineSparkles },
  { name: "Tools", icon: HiOutlineCode },
  { name: "Challenges", icon: HiOutlineLightningBolt },
];

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
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, User!
        </h1>
        <p className="text-gray-400">
          Here's a quick overview of your AGiOS workspace.
        </p>
      </div>

      <div className="space-y-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Stats and Chart */}
          <div className="lg:col-span-8 space-y-6">
            <DashboardStats />
            <UsageChart />
          </div>

          {/* Right Column - Quick Actions and Recommendations */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions */}
            <Card variant="glass">
              <CardHeader>
                <h2 className="text-xl font-semibold text-white">
                  Quick Actions
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.name}
                        className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <Icon className="w-6 h-6 text-neon-cyan mb-2" />
                        <span className="text-sm text-white">
                          {action.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card variant="glass">
              <CardHeader>
                <h2 className="text-xl font-semibold text-white">
                  Recommendations
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.title}
                      className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <h3 className="text-white font-medium">{rec.title}</h3>
                      <p className="text-sm text-gray-400">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Productivity Stats */}
          <div className="lg:col-span-4">
            <ProductivityStats />
          </div>

          {/* Top Affiliates */}
          <div className="lg:col-span-4">
            <TopAffiliates />
          </div>

          {/* Conversation Insights */}
          <div className="lg:col-span-4">
            <ConversationInsights />
          </div>
        </div>

        {/* Recent Activity */}
        <Card variant="glass">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white">
              Recent Activity
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Discussed project requirements",
                  time: "1h ago",
                },
                {
                  title: "Ran Code Assistant on main.py",
                  time: "3h ago",
                },
                {
                  title: 'Submitted entry for "Solar Panel Efficiency"',
                  time: "Yesterday",
                },
                {
                  title: "Used Data Analyzer on sales_data.csv",
                  time: "2 days ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <span className="text-white">{activity.title}</span>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
