import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventScorecard from "./pages/EventScorecard";
import Leaderboard from "./pages/Leaderboard";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Rules from "./pages/Rules";
import Players from "./pages/Players";
import PlayerProfile from "./pages/PlayerProfile";
import TeeSheet from "./pages/TeeSheet";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug/scorecard" element={<EventScorecard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsArticle />} />
            <Route path="/players" element={<Players />} />
            <Route path="/players/:slug" element={<PlayerProfile />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/tee-sheet" element={<TeeSheet />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
