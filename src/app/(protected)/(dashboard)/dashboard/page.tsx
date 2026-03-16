import React from "react";

import { EcommerceMetrics } from "@/components/dashboard/ecommerce/EcommerceMetrics";
import MonthlyTarget from "@/components/dashboard/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/dashboard/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/dashboard/ecommerce/StatisticsChart";
import RecentOrders from "@/components/dashboard/ecommerce/RecentOrders";
import DemographicCard from "@/components/dashboard/ecommerce/DemographicCard";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />
        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}
