"use client";

import { Button } from '@/components/ui/button';
import { Moon, Sun, Download, RefreshCw } from 'lucide-react';
import { useTheme } from 'next-themes';

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();

  const handleExport = () => {
    // Simulate export functionality
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,';
    link.download = 'analytics-report.csv';
    link.click();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                ADmyBRAND Insights
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Digital Marketing Analytics Dashboard
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="hidden sm:flex"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="hidden sm:flex"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}