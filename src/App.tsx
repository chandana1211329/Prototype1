import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import States from "./pages/States";
import Explore from "./pages/Explore";
import CultureCombined from "./pages/CultureCombined";
import Tourism from "./pages/Tourism";
import LanguageConverter from "./pages/LanguageConverter";
import SOSTest from "./pages/SOSTest";
import ViewGallery from "./pages/ViewGallery";
import NotFound from "./pages/NotFound";
import KlassygoChatbot from "./components/KlassygoChatbot";
import ToorlyChatbot from "./components/ToorlyChatbot";
import ScamDetector from "./components/ScamDetector";
import EmergencySOS from "./components/EmergencySOS";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  
  // Check if current route is a cultural page
  const isCulturalPage = 
    location.pathname === '/culture' || 
    location.pathname === '/festivals' || 
    location.pathname === '/dances' || 
    location.pathname === '/food';

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/states" element={<States />} />
        <Route path="/culture" element={<CultureCombined />} />
        <Route path="/tourism" element={<Tourism />} />
        <Route path="/language-converter" element={<LanguageConverter />} />
        <Route path="/sos-test" element={<SOSTest />} />
        <Route path="/view-gallery" element={<ViewGallery />} />
        <Route path="/festivals" element={<CultureCombined />} />
        <Route path="/dances" element={<CultureCombined />} />
        <Route path="/food" element={<CultureCombined />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScamDetector />
      <ToorlyChatbot />
      {isCulturalPage && <KlassygoChatbot />}
      <EmergencySOS />
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
