import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-xrp via-midnight to-midnight-dark">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb')] bg-cover bg-center opacity-10" />
        
        <div className="relative container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-6xl font-heading font-bold text-white mb-6 animate-fadeIn">
              <span className="bg-gradient-to-r from-white to-certification bg-clip-text text-transparent">
                Ensure Information
              </span>
              <br />
              Veracity on XRP Ledger
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Our platform guarantees the authenticity of information through a decentralized DAO system 
              and financial guarantees on the XRP Ledger
            </p>
            
            <div className="flex gap-6 justify-center">
              <Link to="/marketplace">
                <Button size="lg" className="bg-certification hover:bg-certification/90 text-lg px-8">
                  View Certified Companies
                </Button>
              </Link>
              <Link to="/join-label">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8">
                  Get Label
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ... keep existing code (feature cards section) */}
      <div className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl bg-midnight border border-white/10 hover:border-certification/50 transition-all duration-300 transform hover:-translate-y-1">
            <div className="h-12 w-12 rounded-lg bg-certification/20 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-certification" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">Financial Guarantee</h3>
            <p className="text-gray-400">Producers commit with XRP collateral, ensuring the truthfulness of provided information.</p>
          </div>
          
          <div className="p-8 rounded-xl bg-midnight border border-white/10 hover:border-certification/50 transition-all duration-300 transform hover:-translate-y-1">
            <div className="h-12 w-12 rounded-lg bg-certification/20 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-certification" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">DAO Governance</h3>
            <p className="text-gray-400">A DAO verifies and validates information. Decisions are made in a decentralized and transparent way.</p>
          </div>
          
          <div className="p-8 rounded-xl bg-midnight border border-white/10 hover:border-certification/50 transition-all duration-300 transform hover:-translate-y-1">
            <div className="h-12 w-12 rounded-lg bg-certification/20 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-certification" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">NFT Label</h3>
            <p className="text-gray-400">Receive an NFT certifying your commitment and compliance with traceability standards.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
