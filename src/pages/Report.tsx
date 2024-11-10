import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const Report = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    reason: "",
    evidence: "",
    additionalInfo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Signalement envoyé",
      description: "Les membres de la DAO examineront votre signalement.",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-heading font-bold mb-8">Signaler une infraction</h1>
      
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Nom de l'entreprise</label>
            <Input
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">Motif du signalement</label>
            <Input
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">Lien vers les preuves</label>
            <Input
              type="url"
              value={formData.evidence}
              onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
              required
              placeholder="https://"
            />
          </div>
          
          <div>
            <label className="block mb-2">Informations complémentaires</label>
            <Textarea
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              rows={4}
            />
          </div>
          
          <Button type="submit" className="w-full">
            Envoyer le signalement
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Report;