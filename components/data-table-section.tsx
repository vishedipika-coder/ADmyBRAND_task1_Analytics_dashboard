"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { DashboardData, CampaignData } from '@/lib/types';

interface DataTableSectionProps {
  data: DashboardData | null;
}

type SortField = 'name' | 'status' | 'budget' | 'spent' | 'impressions' | 'clicks' | 'ctr' | 'conversions';
type SortDirection = 'asc' | 'desc';

export function DataTableSection({ data }: DataTableSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!data) return null;

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredData = data.campaigns
    .filter(campaign => 
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || campaign.status === statusFilter)
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * direction;
      }
      return (Number(aValue) - Number(bValue)) * direction;
    });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <Card className="p-6 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Campaign Performance
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                {[
                  { key: 'name' as SortField, label: 'Campaign Name' },
                  { key: 'status' as SortField, label: 'Status' },
                  { key: 'budget' as SortField, label: 'Budget' },
                  { key: 'spent' as SortField, label: 'Spent' },
                  { key: 'impressions' as SortField, label: 'Impressions' },
                  { key: 'clicks' as SortField, label: 'Clicks' },
                  { key: 'ctr' as SortField, label: 'CTR' },
                  { key: 'conversions' as SortField, label: 'Conversions' },
                ].map((column) => (
                  <th
                    key={column.key}
                    className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      <SortIcon field={column.key} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((campaign, index) => (
                <tr 
                  key={campaign.name}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeIn 0.4s ease-out forwards',
                  }}
                >
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                    {campaign.name}
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    ${campaign.budget.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    ${campaign.spent.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {campaign.impressions.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {campaign.clicks.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {campaign.ctr.toFixed(2)}%
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                    {campaign.conversions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
            </p>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}