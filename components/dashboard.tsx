"use client";

import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { MetricsGrid } from '@/components/metrics-grid';
import { ChartsSection } from '@/components/charts-section';
import { DataTableSection } from '@/components/data-table-section';
import { generateMockData } from '@/lib/mock-data';
import type { DashboardData } from '@/lib/types';

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial data load
    const loadData = () => {
      setData(generateMockData());
      setIsLoading(false);
    };

    loadData();

    // Simulate real-time updates every 5 seconds
    const interval = setInterval(() => {
      setData(generateMockData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <MetricsGrid data={data} />
        <ChartsSection data={data} />
        <DataTableSection data={data} />
      </main>
    </div>
  );
}