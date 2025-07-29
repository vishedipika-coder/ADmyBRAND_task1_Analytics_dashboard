import type { DashboardData } from './types';

const campaigns = [
  'Holiday Sale Campaign',
  'Brand Awareness Drive',
  'Product Launch 2024',
  'Retargeting Campaign',
  'Social Media Boost',
  'Email Marketing Push',
  'Mobile App Install',
  'Lead Generation Campaign',
  'Video Advertisement',
  'Influencer Collaboration',
  'Search Engine Marketing',
  'Display Network Campaign',
  'Conversion Optimization',
  'Customer Retention',
  'Seasonal Promotion',
];

const statuses: Array<'active' | 'paused' | 'completed'> = ['active', 'paused', 'completed'];

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const trafficSources = [
  'Organic Search',
  'Social Media',
  'Direct Traffic',
  'Paid Ads',
  'Email Marketing',
];

const conversionStages = [
  'Awareness',
  'Interest',
  'Consideration',
  'Purchase',
  'Retention'
];

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 2): number {
  return Number((Math.random() * (max - min) + min).toFixed(decimals));
}

export function generateMockData(): DashboardData {
  // Generate base revenue with slight variation
  const baseRevenue = 250000;
  const revenueVariation = randomBetween(-10000, 15000);
  const currentRevenue = baseRevenue + revenueVariation;
  
  const baseUsers = 45000;
  const userVariation = randomBetween(-2000, 5000);
  const currentUsers = baseUsers + userVariation;

  const baseConversions = 1250;
  const conversionVariation = randomBetween(-50, 100);
  const currentConversions = baseConversions + conversionVariation;

  return {
    metrics: {
      revenue: currentRevenue,
      revenueGrowth: randomFloat(-5, 25, 1),
      users: currentUsers,
      userGrowth: randomFloat(-3, 18, 1),
      conversions: currentConversions,
      conversionGrowth: randomFloat(-8, 22, 1),
      growthRate: randomFloat(8, 32, 1),
      growthChange: randomFloat(-2, 8, 1),
    },
    charts: {
      revenue: months.map(month => ({
        month,
        revenue: randomBetween(180000, 320000),
      })),
      traffic: trafficSources.map(source => ({
        source,
        visitors: randomBetween(5000, 25000),
      })),
      conversions: conversionStages.map(stage => ({
        stage,
        count: randomBetween(800, 5000),
      })),
    },
    campaigns: campaigns.map(name => {
      const budget = randomBetween(5000, 50000);
      const spent = randomBetween(1000, budget);
      const impressions = randomBetween(10000, 500000);
      const clicks = randomBetween(100, Math.floor(impressions * 0.1));
      const ctr = (clicks / impressions) * 100;
      
      return {
        name,
        status: statuses[randomBetween(0, statuses.length - 1)],
        budget,
        spent,
        impressions,
        clicks,
        ctr,
        conversions: randomBetween(5, Math.floor(clicks * 0.1)),
      };
    }),
  };
}