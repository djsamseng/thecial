
import StaticGiftProvider from "./static-gift-provider";

type SupabaseSearchResult = {
  id: number;
  title: string;
  img: string;
  score_sum: number;
  url: string;
  custom_desc: string;
  word_matches: Array<string>;
};
export type GiftResult = SupabaseSearchResult;

class GiftProvider {
  constructor() {
    console.log("Creating new Gift Provider");
  }

  public async getGiftsForSearch(searchText: string, totalCount: number = 8): Promise<{
    matches: Array<GiftResult>;
    hasMore: boolean;
  }> {
    const matches = StaticGiftProvider.getMatches(searchText, totalCount);
    return Promise.resolve({
      matches: matches,
      hasMore: false,
    });
  }
}

const s_provider = new GiftProvider();

export default s_provider;
