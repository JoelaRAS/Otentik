import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Bell } from "lucide-react";
import sdk from '@crossmarkio/sdk';

const Navbar = ({ setGlobalWalletAddress }) => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const { response } = await sdk.methods.signInAndWait();
      setWalletAddress(response.data.address);
      setGlobalWalletAddress(response.data.address); // Mise à jour de l'adresse globale
      console.log("Adresse du portefeuille connectée:", response.data.address);
    } catch (error) {
      console.error("Erreur de connexion au portefeuille Crossmark", error);
      alert("Oops.. Nous avons rencontré une erreur. Veuillez réessayer.");
    }
  };

  return (
    <nav className="bg-midnight-dark/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto flex items-center h-16 px-4">
        <Link to="/" className="text-2xl font-heading font-bold text-white">
          Otentik
        </Link>
        <div className="flex-1 flex justify-center gap-8">
          <Link to="/marketplace" className="text-gray-300 hover:text-certification transition-colors">
            Marketplace
          </Link>
          <Link to="/join-label" className="text-gray-300 hover:text-certification transition-colors">
            Get Label
          </Link>
          <Link to="/join-dao" className="text-gray-300 hover:text-certification transition-colors">
            Join DAO
          </Link>
          <Link to="/vote" className="text-gray-300 hover:text-certification transition-colors">
            Vote
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={connectWallet} variant="default">
            {walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
