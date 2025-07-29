"use client";

import { Card } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon, DollarSign, Users, Target, TrendingUp } from 'lucide-react';
import type { DashboardData } from '@/lib/types';

interface MetricsGridProps {
  data: DashboardData | null;
}

export function MetricsGrid({ data }: MetricsGridProps) {
  if (!data) return null;

  const metrics = [
    {
      title: 'Total Revenue',
      value: `$${data.metrics.revenue.toLocaleString()}`,
      change: data.metrics.revenueGrowth,
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Active Users',
      value: data.metrics.users.toLocaleString(),
      change: data.metrics.userGrowth,
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Conversions',
      value: data.metrics.conversions.toLocaleString(),
      change: data.metrics.conversionGrowth,
      icon: Target,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Growth Rate',
      value: `${data.metrics.growthRate}%`,
      change: data.metrics.growthChange,
      icon: TrendingUp,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const isPositive = metric.change >= 0;
        
        return (
          <Card 
            key={metric.title}
            className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {metric.value}
                </p>
                <div className="flex items-center space-x-1">
                  {isPositive ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {Math.abs(metric.change)}%
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    vs last month
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${metric.bgColor}`}>
                <Icon className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}