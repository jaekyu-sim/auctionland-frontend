import { atom } from "recoil";

export const auctionDataState = atom({
  key: "auctionData",
  default: {jData : "", gPrice : "", cPrice : "", yNum : ""},
});

export const locationCodeDataState = atom({
    key:'locationCodeData',
    default: [
      ""
    ]
  });