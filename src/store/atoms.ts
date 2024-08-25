import {atom} from "recoil"

interface wallet {
    publicKey: string,
    secret: string
}

export const currency_atom = atom<string>({
    key: "Currency",
    default: ""
    
})

export const wallets_atom = atom<wallet[]>({
    key: "Wallets",
    default: []
})

export const phrase_atom = atom<string>({
    key: "Phrase",
    default:""
})

