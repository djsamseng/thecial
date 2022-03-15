

import StaticGiftProviderInstance from "./static-gift-provider";
import SupaGiftProviderInstance from "./supa-gift-provider";
import { GiftResult } from "./base-gift-provider";



class GiftProvider {
  constructor() {
    console.log("Creating new Gift Provider");
  }

  public async getGiftsForSearch(searchText: string, totalCount: number = 8): Promise<{
    matches: Array<GiftResult>;
    totalResults: number;
  }> {
    const res = await SupaGiftProviderInstance.getMatches(searchText, totalCount);
    return res;
  }
}

const s_provider = new GiftProvider();

export default s_provider;
