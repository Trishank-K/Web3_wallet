"use client";
import { Button } from "./ui/button";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "./ui/use-toast";
import { InputWithButton } from "./inputWithButton";
import { FaChevronDown } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import { useRecoilState } from "recoil";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import generateWallet from "@/app/api/generate/generateWallet";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { currency_atom, wallets_atom, phrase_atom } from "@/store/atoms";

interface wallet {
  publicKey: string;
  secret: string;
}

export default function Page() {
  const [phraseArray, setPhraseArray] = useState<string[]>([]);
  const [currency, setCurrency] = useRecoilState(currency_atom);
  const [wallets, setWallets] = useRecoilState(wallets_atom);
  const [phrase, setPhrase] = useRecoilState(phrase_atom);
  const [index, setIndex] = useState("0");
  const [collapse, setCollapse] = useState(false);
  const [showKey, setShowKey] = useState<boolean[]>([false]);
  const { toast } = useToast();

  useEffect(() => {
    setIndex(wallets.length.toString());
  }, [wallets]);

  useEffect(() => {
    const Array = phrase.split(" ");
    setPhraseArray(Array);
  }, [phrase]);

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
          <InputWithButton />
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
              <CollapsibleTrigger asChild>
                <div className="flex justify-between items-center my-4">
                  <div className="text-3xl font-bold">Your Secret Phrase</div>
                  <Button variant="ghost">
                    <FaChevronDown />
                  </Button>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent
                className="grid grid-cols-4 gap-2 hover:cursor-pointer"
                onClick={() => copy(phrase, toast)}
              >
                {phraseArray.map((phrase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <div
                      key={index}
                      className="rounded-md border p-6 w-full bg-foreground/10 transition-colors duration-500 hover:bg-foreground/20 col-span-1"
                    >
                      {phrase}
                    </div>
                  </motion.div>
                ))}
                <div className="flex items-center gap-2 text-primary/50 pt-4 hover:text-primary/80 transition-all duration-300">
                  <MdOutlineContentCopy />
                  <p className=" font-semibold">Click Anywhere to Copy</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          <div className="py-8 flex justify-between">
            <div className="text-4xl font-bold">Solana Wallet</div>
            <div className="space-x-2">
              <Button
                onClick={async () => {
                  console.log("Phrase: ", phrase);
                  const response = await generateWallet(
                    phrase,
                    currency,
                    toast,
                    index
                  );
                  if (response) {
                    const wallet: wallet = {
                      publicKey: response.publicKey,
                      secret: response.secret,
                    };
                    setWallets((wallets) => [...wallets, wallet]);
                    toast({
                      title: "Wallet Generated Success",
                    });
                  }
                }}
              >
                Add Wallet
              </Button>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button size={"lg"} variant="destructive">
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        setCurrency("");
                        setWallets([]);
                        setPhrase("");
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {wallets.map((wallet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3 + index * 0.1,
                ease: "easeInOut",
              }}
            >
              <div key={index} className="border-2 rounded-xl mb-8">
                <div className="text-2xl p-8 font-bold">Wallet {index + 1}</div>
                <div className="bg-secondary p-8 rounded-xl space-y-6">
                  <div className="space-y-2">
                    <div className="text-xl font-bold">Public Key </div>
                    <div
                      className="text-primary/70 pt-4 hover:text-primary/100 transition-all duration-300"
                      onClick={() => {
                        copy(wallet.publicKey, toast);
                      }}
                    >
                      {wallet.publicKey}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xl font-bold">Private Key </div>
                    <div className="flex justify-between">
                      <div
                        onClick={() => {
                          copy(wallet.secret, toast);
                        }}
                        className="text-primary/70 pt-4 hover:text-primary/100 transition-all duration-300"
                      >
                        {showKey[index]
                          ? wallet.secret
                          : "•".repeat(wallet.secret.length)}
                      </div>
                      <Button
                        onClick={() => {
                          const key = [...showKey];
                          key[index] = !key[index];
                          setShowKey(key);
                        }}
                      >
                        {showKey[index] ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function copy(phrase: string, toast: any) {
  navigator.clipboard.writeText(phrase);
  toast({
    title: "Copied To Clipboard",
    description: "Keep your Secret Phrase Safe",
  });
}
