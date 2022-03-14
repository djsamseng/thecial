
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

  public getGiftsForSearch(searchText: string) {
    return [];
  }
}

const s_provider = new GiftProvider();

export default s_provider;
