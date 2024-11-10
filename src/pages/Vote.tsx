import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import sdk from "@crossmarkio/sdk";
import { Client, EscrowFinish } from "xrpl";

interface VoteSlashProps {
  walletAddress: string | null;
}

const VoteSlash: React.FC<VoteSlashProps> = ({ walletAddress }) => {
  const [labelEscrowHash, setLabelEscrowHash] = useState("");
  const [isVoting, setIsVoting] = useState(false);
  const [voteCount, setVoteCount] = useState({ yes: 0, no: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [isDaoMember, setIsDaoMember] = useState(false);

  const encodeHex = (str: string) => {
    return Array.from(new TextEncoder().encode(str))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  // Vérification de l'appartenance à la DAO
  const checkDaoMembership = async () => {
    try {
      const client = new Client("wss://s.altnet.rippletest.net:51233");
      await client.connect();

      const response = await client.request({
        command: "account_objects",
        account: walletAddress,
        type: "escrow",
      });

      // Vérifier si l'un des escrows contient un Memo indiquant l'appartenance à la DAO
      const isMember = response.result.account_objects.some((escrow: any) => {
        return escrow.Memos?.some((memo: any) =>
          memo.Memo.MemoData === encodeHex("DAOMembership")
        );
      });

      setIsDaoMember(isMember);
      client.disconnect();
    } catch (error) {
      console.error("Erreur lors de la vérification de l'appartenance à la DAO :", error);
      toast({
        title: "Erreur",
        description: "Impossible de vérifier votre statut d'appartenance à la DAO.",
      });
    }
  };

  const handleVote = async (voteType: string) => {
    if (hasVoted) {
      toast({
        title: "Vote déjà enregistré",
        description: "Vous avez déjà voté pour ce slashing.",
      });
      return;
    }

    if (!isDaoMember) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être membre de la DAO pour voter.",
      });
      return;
    }

    setIsVoting(true);

    try {
      const client = new Client("wss://s.altnet.rippletest.net:51233");
      await client.connect();

      const memoType = voteType === "yes" ? "SlashVoteYes" : "SlashVoteNo";
      const voteTx: any = {
        TransactionType: "EscrowCreate",
        Account: walletAddress,
        Amount: "1",
        Destination: labelEscrowHash,
        Memos: [
          {
            Memo: {
              MemoType: encodeHex(memoType),
              MemoData: encodeHex(labelEscrowHash),
            },
          },
        ],
      };

      await sdk.sync.signAndSubmit(voteTx);

      setVoteCount((prev) => ({
        ...prev,
        [voteType]: prev[voteType] + 1,
      }));

      setHasVoted(true);
      toast({
        title: "Vote enregistré",
        description: `Votre vote ${voteType === "yes" ? "pour" : "contre"} a été pris en compte.`,
      });

      const totalVotes = voteCount.yes + voteCount.no + 1;
      if (totalVotes > 1 && voteCount.yes / totalVotes >= 0.5) {
        await executeSlash(labelEscrowHash, client);
      }
    } catch (error) {
      console.error("Erreur lors du vote :", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du vote.",
      });
    } finally {
      setIsVoting(false);
    }
  };

  const executeSlash = async (labelHash: string, client: Client) => {
    try {
      const response = await client.request({
        command: "account_objects",
        account: labelHash,
        type: "escrow",
      });

      const escrowObject = response.result.account_objects.find(
        (obj: any) => obj.LedgerEntryType === "Escrow" && obj.OfferSequence !== undefined
      );

      if (!escrowObject) {
        throw new Error("Aucun escrow correspondant trouvé.");
      }

      const cancelTx: EscrowFinish = {
        TransactionType: "EscrowFinish",
        Account: walletAddress,
        Owner: labelHash,
        OfferSequence: escrowObject.Sequence, // Use 'Sequence' instead of 'OfferSequence'
      };

      await sdk.sync.signAndSubmit(cancelTx);

      toast({
        title: "Slashing exécuté",
        description: `Le label ${labelHash} a été annulé et les fonds ont été redistribués.`,
      });
    } catch (error) {
      console.error("Erreur lors de l'exécution du slashing :", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'exécution du slashing.",
      });
    } finally {
      client.disconnect();
    }
  };

  // Vérifier l'appartenance à la DAO lors du chargement du composant
  useEffect(() => {
    if (walletAddress) {
      checkDaoMembership();
    }
  }, [walletAddress]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-heading font-bold mb-8">Voter pour le Slashing</h1>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6 max-w-md mx-auto">
        <label className="block mb-2">Adresse du Label à Slasher</label>
        <Input
          value={labelEscrowHash}
          onChange={(e) => setLabelEscrowHash(e.target.value)}
          required
        />
        <div className="flex gap-4">
          <Button onClick={() => handleVote("yes")} disabled={isVoting} className="w-full">
            {isVoting ? "Vote en cours..." : "Voter Oui"}
          </Button>
          <Button onClick={() => handleVote("no")} disabled={isVoting} className="w-full">
            {isVoting ? "Vote en cours..." : "Voter Non"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VoteSlash;