"use client";
import { Button } from "./ui/button";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "./ui/use-toast";
import { InputWithButton } from "./inputWithButton";
import { FaChevronDown } from "react-icons/fa";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface wallet {
  publicKey: string;
  secret: string;
}

export default function Page() {
  const [currency, setCurrency] = useState("");
  const [wallets, setWallets] = useState<wallet[]>([]);
  const [index, setIndex] = useState(0);
  const [collapse, setCollapse] = useState(false);
  const [phrase, setPhrase] = useState<string>("")
  const { toast } = useToast();
  console.log("Wallets: ", wallets);
  useEffect(() => {
    setIndex(wallets.length);
  }, [wallets]);

  return (
    <div className="p-8 ">
      {currency == "" && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="text-5xl font-bold">Multi-Blockchain Support</div>
          <div className="font-bold text-muted-foreground text-xl py-4">
            Choose a Blockchain to get started
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setCurrency("Solana");
                toast({
                  title: "Currency Selected",
                  description: "Generate Wallet to continue",
                });
              }}
              className="w-32"
            >
              Solana
            </Button>
            <Button
              onClick={() => {
                setCurrency("Ethereum");
                toast({
                  title: "Currency Selected",
                  description: "Generate Wallet to continue",
                });
              }}
              className="w-32"
            >
              Ethereum
            </Button>
          </div>
        </motion.div>
      )}
      {currency != "" && wallets.length == 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="text-5xl font-bold">Secret Recovery Phrase</div>
          <div className="text-xl font-bold text-muted-foreground py-4">
            Save These Words in a Safe Place
          </div>
          <InputWithButton currency={currency} setWallets={setWallets} phrase={phrase} setPhrase={setPhrase}/>
        </motion.div>
      )}

      {wallets.length != 0 && (
        <div className="">
          <Collapsible
            open={collapse}
            onOpenChange={setCollapse}
            className=" space-y-2 border-2 p-8 rounded-xl"
          >
            <div className="">
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">Your Secret Phrase</div>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost">
                    <FaChevronDown />
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent className="flex grid-cols-4 gap-2 py-4">
                <div className="rounded-md border px-4 py-2 w-full bg-foreground/10 transition-colors duration-500 hover:bg-foreground/20 col-span-1">
                  @radix-ui/colors
                </div>
                <div className="rounded-md border px-4 py-2 w-full shadow-lg col-span-1">
                  @stitches/react
                </div>
                <div className="rounded-md border px-4 py-2 w-full shadow-lg col-span-1">
                  @stitches/react
                </div>
                <div className="rounded-md border px-4 py-2 w-full shadow-lg col-span-1">
                  @stitches/react
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
          {wallets.map((wallet, index) => (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <div key={index}>
                {index + 1}
                <br />
                {wallet.publicKey}
                <br />
                {wallet.secret}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
