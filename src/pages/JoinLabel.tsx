import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Client, xrpToDrops, isoTimeToRippleTime } from "xrpl";
import sdk from "@crossmarkio/sdk"; // SDK pour Crossmark

const JoinLabel = ({ walletAddress, isDAO }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    sector: "",
    description: "",
    collateral: "1000000",
  });
  const [labelNFT, setLabelNFT] = useState(null);
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
      // Encoder `MemoType` et `MemoData` en hexadécimal
      const metadataString = JSON.stringify(formData);
      const encoder = new TextEncoder();
      const metadataHex = Array.from(encoder.encode(metadataString))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
      const memoTypeHex = Array.from(encoder.encode("NFTMetadata"))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      // Créer l'objet de transaction d'escrow
      const escrowTx = {
        TransactionType: "EscrowCreate" as const,
        Account: walletAddress,
        Amount: xrpToDrops(formData.collateral), // Conversion du montant en drops
        Destination: walletAddress,
        FinishAfter: isoTimeToRippleTime(new Date(Date.now() + 31536000000)), // Expire dans 1 an
        Memos: [
          {
            Memo: {
              MemoType: memoTypeHex, // `NFTMetadata` en hexadécimal
              MemoData: metadataHex  // Encodage en hexadécimal
            }
          }
        ]
      };

      // Signer et soumettre la transaction via Crossmark
      const id = await sdk.sync.signAndSubmit(escrowTx);

      if (id) {
        const labelData = {
          name: `Label de Certification - ${formData.companyName}`,
          issuer: formData.companyName,
          commitments: [
            "Respect des droits de l'homme et de l'enfant",
            "Sous-traitance responsable",
            "Gestion éthique des déchets",
          ],
          collateral: `${formData.collateral} XRP`,
          sector: formData.sector,
          description: formData.description,
          dateCertified: new Date().toISOString().split("T")[0],
          escrowId: id, // Lien vers l'escrow pour suivi
          location: "Chine",
        };
        setLabelNFT(labelData);
        
        toast({
          title: "Label émis",
          description: "Votre label de certification a été créé et associé au collatéral.",
        });
      } else {
        throw new Error("Échec de la création de l'escrow");
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
      <h1 className="text-4xl font-heading font-bold mb-8">Obtenir le Label</h1>

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
            <label className="block mb-2">Secteur d'activité</label>
            <Input
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-2">Description de l'activité</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-2">Montant du collatéral (XRP)</label>
            <Input
              type="number"
              value={formData.collateral}
              onChange={(e) => setFormData({ ...formData, collateral: e.target.value })}
              required
              min="10"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Soumission en cours..." : "Soumettre la demande"}
          </Button>
        </form>

        {labelNFT && (
          <div className="mt-10 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Label de Certification Émis</h2>
            <p><strong>Nom :</strong> {labelNFT.name}</p>
            <p><strong>Secteur :</strong> {labelNFT.sector}</p>
            <p><strong>Description :</strong> {labelNFT.description}</p>
            <p><strong>Date de Certification :</strong> {labelNFT.dateCertified}</p>
            <p><strong>Collatéral :</strong> {labelNFT.collateral}</p>
            <p><strong>ID Escrow :</strong> {labelNFT.escrowId}</p>
            <p><strong>Engagements :</strong></p>
            <ul className="list-disc pl-5">
              {labelNFT.commitments.map((commitment, index) => (
                <li key={index}>{commitment}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinLabel;
