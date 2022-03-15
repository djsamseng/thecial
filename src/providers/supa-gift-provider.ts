
import { BaseGiftProvider, GiftResult } from "./base-gift-provider";


class SupaGiftProvider extends BaseGiftProvider {
  constructor() {
    super();
  }

  public async getMatches(searchText: string, totalCount: number = 8): Promise<{
    matches: Array<GiftResult>;
    totalResults: number;
  }> {
    return {
      matches: [],
      totalResults: 0,
    };
  }
}

const s_SupaGiftProvider = new SupaGiftProvider();
export default s_SupaGiftProvider;
