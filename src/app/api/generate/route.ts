import { NextRequest, NextResponse } from "next/server";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";

import zod from "zod";

const safeBody = zod.object({
  currency: zod.string(),
  phrase: zod.string().optional(),
  index: zod.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parseBody = safeBody.safeParse(body);
  if (!parseBody.success)
    return new NextResponse("Invalid Body", { status: 400 });

  const currency_temp = body.currency;
  let phrase = body.phrase;
  let index = "0";
  if (body.index) index = body.index;
  const currency = currency_temp == "Solana" ? "501" : "60";

  if (phrase.length == 0) phrase = generateMnemonic();

  const isValid = validateMnemonic(phrase);

  if (!isValid) {
    return new NextResponse("Invalid Mnemonic", { status: 400 });
  }
  try {
    const seed = mnemonicToSeedSync(phrase);
    const path = `m/44'/${currency}'/${index}'/0'`;

    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();

    return NextResponse.json({
      publicKey: publicKey,
      secret: bs58.encode(secret),
      phrase: phrase,
    });
  } catch (err) {
    console.log("error", err);
    return new NextResponse("Some Error Occureed", { status: 500 });
  }
}
