import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Initialize theme on app load
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('logpulse-theme');
    } catch {
      // Fail silently in private browsing mode
    }
    
    const theme = stored && ['light', 'dark', 'system'].includes(stored) ? stored : 'system';
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    let effectiveTheme: 'light' | 'dark';
    if (theme === 'system') {
      try {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch {
        effectiveTheme = 'dark'; // fallback
      }
    } else {
      effectiveTheme = theme as 'light' | 'dark';
    }
    
    root.classList.add(effectiveTheme);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
