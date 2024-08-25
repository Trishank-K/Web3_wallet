import axios from "axios";
export default async function generateWallet(phrase: string, currency: string, toast: any,index?:string) {
    try {
      const response = await axios.post("/api/generate", {
        phrase,
        currency,
        index
      });
  
      return response.data;
    } catch (err) {
      toast({
        title: "Invalid Phrase",
        description: "Please try again",
      });
    }
  }