"use client";

import { Card } from '@/components/ui/card';
import { RevenueChart } from '@/components/charts/revenue-chart';
import { TrafficChart } from '@/components/charts/traffic-chart';
import { ConversionChart } from '@/components/charts/conversion-chart';
import type { DashboardData } from '@/lib/types';

interface ChartsSectionProps {
  data: DashboardData | null;
}

export function ChartsSection({ data }: ChartsSectionProps) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 col-span-1 lg:col-span-2 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
          Revenue Trend (Last 12 Months)
        </h3>
        <RevenueChart data={data.charts.revenue} />
      </Card>
      
      <Card className="p-6 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
          Traffic Sources
        </h3>
        <TrafficChart data={data.charts.traffic} />
      </Card>
      
      <Card className="p-6 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
          Conversion Funnel
        </h3>
        <ConversionChart data={data.charts.conversions} />
      </Card>
    </div>
  );
}