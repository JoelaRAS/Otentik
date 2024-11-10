import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import CompanyDetail from "./pages/CompanyDetail";
import JoinLabel from "./pages/JoinLabel";
import JoinDAO from "./pages/JoinDAO";
import Report from "./pages/Report";
import Vote from "./pages/Vote";

const queryClient = new QueryClient();

const App = () => {
  const [globalWalletAddress, setGlobalWalletAddress] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Navbar setGlobalWalletAddress={setGlobalWalletAddress} />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/join-label" element={<JoinLabel walletAddress={globalWalletAddress} isDAO={false} />} />
            <Route path="/join-dao" element={<JoinDAO walletAddress={globalWalletAddress} />} />
            <Route path="/report" element={<Report />} />
            <Route path="/vote" element={<Vote walletAddress={globalWalletAddress} daoMembers={undefined} />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
