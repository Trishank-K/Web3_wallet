"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useToast } from "./ui/use-toast";

interface Wallet {
  publicKey: string;
  secret: string;
}

interface InputWithButtonProps {
  currency: string;
  setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
  phrase:string;
  setPhrase: React.Dispatch<React.SetStateAction<string>>;
}

export function InputWithButton({
  currency,
  setWallets,
  phrase,
  setPhrase
}: InputWithButtonProps) {
  const { toast } = useToast();
  

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
          }
        }}
        type="submit"
      >
        {phrase.length == 0 ? "Generate Wallet" : "Add Wallet"}
      </Button>
    </div>
  );
}

async function generateWallet(phrase: string, currency: string, toast: any) {
  try {
    const response = await axios.post("http://localhost:3000/api/generate", {
      phrase,
      currency,
    });

    return response.data;
  } catch (err) {
    toast({
      title: "Invalid Phrase",
      description: "Please try again",
    });
  }
}
