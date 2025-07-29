export interface MetricsData {
  revenue: number;
  revenueGrowth: number;
  users: number;
  userGrowth: number;
  conversions: number;
  conversionGrowth: number;
  growthRate: number;
  growthChange: number;
}

export interface ChartData {
  revenue: Array<{ month: string; revenue: number; }>;
  traffic: Array<{ source: string; visitors: number; }>;
  conversions: Array<{ stage: string; count: number; }>;
}

export interface CampaignData {
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
}

export interface DashboardData {
  metrics: MetricsData;
  charts: ChartData;
  campaigns: CampaignData[];
}