import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleReport = () => {
    navigate('/report');
  };

  return (
    <div className="container mx-auto py-10">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-heading font-bold mb-6">EcoFarm France</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Informations</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Secteur</h3>
                <p>Agriculture</p>
              </div>
              <div>
                <h3 className="font-semibold">Localisation</h3>
                <p>France</p>
              </div>
              <div>
                <h3 className="font-semibold">Date de certification</h3>
                <p>15 janvier 2024</p>
              </div>
              <div>
                <h3 className="font-semibold">Collatéral engagé</h3>
                <p>1,000,000 XRP</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Engagements</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Production 100% française</li>
              <li>Agriculture biologique certifiée</li>
              <li>Traçabilité complète de la chaîne d'approvisionnement</li>
            </ul>
            
            <div className="mt-8">
              <Button 
                variant="destructive"
                onClick={handleReport}
              >
                Signaler une infraction
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
