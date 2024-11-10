import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { xrpToDrops, isoTimeToRippleTime } from "xrpl";
import sdk from "@crossmarkio/sdk"; // SDK pour Crossmark

const JoinDAO = ({ walletAddress }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [daoMembership, setDaoMembership] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletAddress) {
      toast({
        title: "Veuillez d'abord connecter votre portefeuille",
        description: "Cliquez sur 'Connect Wallet' pour vous connecter.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const metadataString = JSON.stringify(formData);
      const encoder = new TextEncoder();
      const metadataHex = Array.from(encoder.encode(metadataString))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
      const memoTypeHex = Array.from(encoder.encode("DAOMembership"))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      // Créer l'objet de transaction d'escrow pour l'adhésion à la DAO
      const daoEscrowTx = {
        TransactionType: "EscrowCreate" as const,
        Account: walletAddress,
        Amount: xrpToDrops("5"), // En drops, 5 ETH requis pour l'adhésion
        Destination: walletAddress,
        FinishAfter: isoTimeToRippleTime(new Date(Date.now() + 31536000000)), // Expire dans 1 an
        Memos: [
          {
            Memo: {
              MemoType: memoTypeHex, // `DAOMembership` en hexadécimal
              MemoData: metadataHex,  // Encodage des métadonnées en hexadécimal
            },
          },
        ],
      };

      // Signer et soumettre la transaction via Crossmark
      const id = await sdk.sync.signAndSubmit(daoEscrowTx);

      if (id) {
        const membershipData = {
          name: `DAO Membership - ${formData.fullName}`,
          email: formData.email,
          amountStaked: "5 ETH",
          escrowId: id, // ID de l'escrow pour suivi
          dateJoined: new Date().toISOString().split("T")[0],
        };
        setDaoMembership(membershipData);
        
        toast({
          title: "Adhésion réussie",
          description: "Vous êtes maintenant membre de la DAO.",
        });
      } else {
        throw new Error("Échec de l'adhésion à la DAO");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-heading font-bold mb-8">Rejoindre la DAO</h1>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Nom complet</label>
            <Input
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-2">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Soumission en cours..." : "Rejoindre la DAO"}
          </Button>
        </form>

        {daoMembership && (
          <div className="mt-10 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Adhésion à la DAO Confirmée</h2>
            <p><strong>Nom :</strong> {daoMembership.name}</p>
            <p><strong>Email :</strong> {daoMembership.email}</p>
            <p><strong>Date d'Adhésion :</strong> {daoMembership.dateJoined}</p>
            <p><strong>Montant Stake :</strong> {daoMembership.amountStaked}</p>
            <p><strong>ID Escrow :</strong> {daoMembership.escrowId}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinDAO;
