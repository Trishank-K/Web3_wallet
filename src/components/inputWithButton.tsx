"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import generateWallet from "@/app/api/generate/generateWallet";
import { useToast } from "./ui/use-toast";
import { useRecoilState, useRecoilValue,useSetRecoilState } from "recoil";
import { currency_atom, wallets_atom, phrase_atom } from "@/store/atoms";

interface Wallet {
  publicKey: string;
  secret: string;
}

export function InputWithButton() {
  const { toast } = useToast();
  const currency = useRecoilValue(currency_atom);
  const setWallets = useSetRecoilState(wallets_atom);
  const [phrase, setPhrase] = useRecoilState(phrase_atom);

  return (
    <div className="flex w-full items-center space-x-4">
      <Input
        type="email"
        placeholder="Enter your secret phrase (or leave blank to generate) "
        onChange={(e) => {
          setPhrase(e.target.value);
        }}
      />
      <Button
        onClick={async () => {
          const response = await generateWallet(phrase, currency, toast);

          if (response) {
            const wallet: Wallet = {
              publicKey: response.publicKey,
              secret: response.secret,
            };

            setWallets((wallets) => [...wallets, wallet]);
            setPhrase(response.phrase);
          }
        }}
        type="submit"
      >
        {phrase.length == 0 ? "Generate Wallet" : "Add Wallet"}
      </Button>
    </div>
  );
}


