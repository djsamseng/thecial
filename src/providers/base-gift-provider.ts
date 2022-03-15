
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
export abstract class BaseGiftProvider {
  abstract getMatches(searchText: string, totalCount: number): Promise<{
    matches: Array<GiftResult>;
    totalResults: number;
  }>;
}