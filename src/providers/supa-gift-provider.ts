
import { createClient } from "@supabase/supabase-js";
import { stemmer } from "stemmer";

import { BaseGiftProvider, GiftResult } from "./base-gift-provider";

// const supabaseUrl = "http://localhost:54321";
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs";
const supabaseUrl = "https://fbzpfjeadselmgdvgitu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZienBmamVhZHNlbG1nZHZnaXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDcyMDk0MDUsImV4cCI6MTk2Mjc4NTQwNX0.cQ6AYTxIpp48k276gyY5A1at_LAjqWURsUJzmryTTdc";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type SupabaseSearchResult = {
  id: number;
  title: string;
  img: string;
  score_sum: number;
  url: string;
  custom_desc: string;
  word_matches: Array<string>;
  total_results: number;
};


function sanitizeQueryWord(word: string) {
  word = word.toLowerCase();
  word = word.replace(/\W/g, '');
  word = word.trimEnd();
  word = word.trimStart();
  word = stemmer(word);
  return word;
}

async function getGiftsSupabase(start: number, limit: number): Promise<Array<SupabaseSearchResult>> {
  type SearchResult = {
    id: number;
    title: string;
    img: string;
    url: string;
    custom_desc: string;
    score: number;
  }
  console.log("Hitting supabase:", start, limit);
  const { data, error, status, count } = await supabase.from("gifts")
    .select("id, title, img, url, custom_desc, score", { count: "exact" })
    .order("score", { ascending: false })
    .range(start, start+limit) as {
      data: Array<SearchResult>;
      error?: any;
      status: number;
      count: number;
    };
  if (error && status !== 406) {
    console.error("Supabase getGifts Error:", error, status);
  }
  if (data) {
    return data.map(item => {
      return {
        id: item.id,
        title: item.title,
        img: item.img,
        url: item.url,
        custom_desc: item.custom_desc,
        score_sum: item.score,
        word_matches: [],
        total_results: count,
      };
    });
  }
  console.error("Failed to get Supabase gifts", data, error, status);
  throw new Error("Failed to get Supabase gifts");
}

async function searchGiftsSupabase(query: string, start: number, limit: number): Promise<Array<SupabaseSearchResult>> {
  const words = query.split(" ");
  const stemWords = words
    .map(s => sanitizeQueryWord(s))
    .filter(s => s.length > 0);
  if (stemWords.length === 0) {
    return await getGiftsSupabase(start, limit);
  }
  console.log("Hitting supabase:", stemWords, start, limit);
  const {data, error, status} = await supabase.rpc("search_by_words", {
    words: stemWords,
    range_offset: start,
    range_limit: limit,
  }) as {
    data: Array<SupabaseSearchResult>;
    error?: any;
    status: number;
  }
  const searchResults = data;
  const stemToWord = words.reduce((map, word) => {
    const stem = sanitizeQueryWord(word);
    map[stem] = word;
    return map;
  }, {});
  searchResults.forEach(res => {
    res.word_matches = res.word_matches.map(stem => {
      return stemToWord[stem];
    });
  });

  if (error && status !== 406) {
    console.error("Supabase searchGifts Error:", error, status);
    throw new Error(error);
  }
  if (searchResults) {
    return searchResults;
  }
  console.error("Failed to search for Supabase gifts", searchResults, error, status);
  throw new Error("Failed to search for Supabase gifts");
}

type SearchingResult = {
  matches: Array<GiftResult>;
  totalResults: number;
};
class SupaGiftProvider extends BaseGiftProvider {
  private d_cache: Record<string, {
    matches: Array<GiftResult>;
    searching?: Promise<SearchingResult>;
    totalResults: number;
  }> = {};
  constructor() {
    super();
  }

  public async getMatches(searchText: string, totalCount: number = 8): Promise<SearchingResult> {
    return this.fetchIfNeeded(searchText, totalCount);
  }

  private async fetchIfNeeded(searchText: string, requestedCount: number): Promise<SearchingResult> {
    // Haven't yet searched for this
    if (!this.d_cache[searchText]) {
      this.d_cache[searchText] = {
        matches: [],
        searching: new Promise(fulfill => {}),
        totalResults: 1,
      }
      requestedCount = this.d_cache[searchText].matches.length + 8;
      this.d_cache[searchText].searching = this.searchAction(searchText, requestedCount);
    }
    requestedCount = this.d_cache[searchText].matches.length + 8;
    const entry = this.d_cache[searchText];
    if (entry.searching) {
      const res = await entry.searching;
      return res;
    }

    // We've already fetched what is requested
    if (requestedCount <= entry.matches.length) {
      return {
        matches: entry.matches.slice(0, requestedCount),
        totalResults: entry.totalResults,
      };
    }
    // Need to fetch more and can fetch more
    if (requestedCount > entry.matches.length && entry.matches.length < entry.totalResults) {
      this.d_cache[searchText].searching = this.searchAction(searchText, requestedCount);
      return await this.d_cache[searchText].searching;
    }
    // We've already fetched all results
    return {
      matches: entry.matches,
      totalResults: entry.totalResults,
    }
  }

  private async searchAction(searchText: string, requestedCount: number): Promise<SearchingResult> {
    try {
      const entry = this.d_cache[searchText];
      const start = entry.matches.length;
      const limit = requestedCount - start - 1;
      const res = await searchGiftsSupabase(searchText, start, limit);
      if (res.length > 0) {
        this.d_cache[searchText].totalResults = res[0].total_results;
      }
      this.d_cache[searchText].matches = this.d_cache[searchText].matches.concat(res);
      this.d_cache[searchText].searching = undefined;
    }
    catch (error) {
      console.error("SearchAction failed:", error);
      this.d_cache[searchText].searching = undefined;
      if (this.d_cache[searchText].totalResults === 0) {
        this.d_cache[searchText].totalResults = 1;
      }
    }
    return {
      matches: this.d_cache[searchText].matches,
      totalResults: this.d_cache[searchText].totalResults
    };
  }
}

const s_SupaGiftProvider = new SupaGiftProvider();
export default s_SupaGiftProvider;
