"use client";

import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Dashboard } from '@/components/dashboard';

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}