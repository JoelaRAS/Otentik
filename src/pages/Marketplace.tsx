import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const companies = [
  {
    id: 1,
    name: "EcoFarm France",
    description: "Production agricole biologique",
    sector: "Agriculture",
    location: "France",
    labelDate: "2024-01-15",
  },
  // Add more mock companies here
];

const Marketplace = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-heading font-bold mb-8">Entreprises Certifiées</h1>
      
      <div className="flex gap-4 mb-8">
        <Input 
          placeholder="Rechercher une entreprise..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button>Filtrer</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Link 
            key={company.id} 
            to={`/company/${company.id}`}
            className="block p-6 rounded-lg border hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold mb-2">{company.name}</h3>
            <p className="text-gray-600 mb-4">{company.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{company.sector}</span>
              <span>{company.location}</span>
            </div>
            <div className="mt-4 text-sm text-certification">
              Certifié depuis le {new Date(company.labelDate).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;