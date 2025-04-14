"use client";

import { DashboardStats } from "@/components/pages/dashboard/DashboardStats";
import { ProductivityStats } from "@/components/pages/dashboard/ProductivityStats";
import { UsageChart } from "@/components/pages/dashboard/UsageChart";
import { TopAffiliates } from "@/components/pages/dashboard/TopAffiliates";
import { ConversationInsights } from "@/components/pages/dashboard/ConversationInsights";
import { Recommendations } from "@/components/pages/dashboard/Recommendations";
import { RecentActivity } from "@/components/pages/dashboard/RecentActivity";
import { QuickActions } from "@/components/pages/dashboard/QuickActions";
import { useAuth } from "@/providers/auth-provider";

export default function DashboardPage() {
  const { user } = useAuth();
  const username = user?.metadata?.username || user?.name || "User";

  return (
    <div className="min-h-screen pt-30 bg-[#061331] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {username}!
          </h1>
          <p className="text-gray-400 mt-2">
            Here&apos;s what&apos;s happening with your workspace
          </p>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 ">
              <DashboardStats />
            </div>
            <div className="lg:col-span-4">
              <QuickActions />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <ProductivityStats />
            </div>
            <div className="lg:col-span-4">
              <TopAffiliates />
            </div>
            <div className="lg:col-span-4">
              <ConversationInsights />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <UsageChart />
            </div>
            <div className="lg:col-span-4">
              <Recommendations />
            </div>
          </div>

          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
