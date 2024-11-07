import {SKY_CONTRACT ,SKY_TOKEN_CONTRACT ,USDT_TOKEN_CONTRACT } from "../../utils/constants";
import SKY_ABI from "../abi/SKY_ABI.json"
import TOKEN_ABI from "../abi/TOKEN_ABI.json";
import USDTABI from "../abi/USDT_TOKEN_ABI.json";

export const contractDetail = [
  {
    symbol: "SKY_CONTRACT",
    address: SKY_CONTRACT,
    abi: SKY_ABI,
  },
  {
    symbol: "SKY",
    address: SKY_TOKEN_CONTRACT,
    abi: TOKEN_ABI,
  },

  {
    symbol:"USDT",
    address:USDT_TOKEN_CONTRACT,
    abi:USDTABI,
  }

];
