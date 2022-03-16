import React, { useContext } from "react";

import { SearchBarContext } from "./search-context";
import { GiftResultProviderContext } from "./gift-result-provider-context";

type SearchBarProps = {};
type SearchBarState = {
};
class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {};
  }
  public render() {
    const { submitSearch } = useContext(GiftResultProviderContext);
    return (
      <div className="flex-1 flex flex-row items-center shrink-0 min-w-fit px-1">
        <SearchBarContext.Consumer>
          {({ pendingSearchText, setPendingSearchText }) => (
            <form className="flex-1 flex flex-row text-slate-900 border rounded-lg dark:border-slate-700" onSubmit={this.onSearchSubmit.bind(this, submitSearch)}>
              <input className="flex-1 pl-1 pr-14 text-black dark:text-white bg-stone-50 hover:bg-white dark:bg-bg-dark rounded-lg"
                type="text"
                onChange={(evt) => setPendingSearchText(evt.target.value)}
                value={pendingSearchText}
                aria-label="Search input"
                tabIndex={0}
                placeholder="Search Gifts"
              />
              <button className="bg-badger-tail opacity-70 border-slate-500 rounded-r-lg w-12 h-12 sm:h-10 flex flex-col items-center justify-center ml-[-48px]" type="submit" aria-label="search">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
              </button>
            </form>
          )}
        </SearchBarContext.Consumer>

      </div>
    );
  }

  private onSearchSubmit(submitFunc: () => {}, evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    submitFunc();
  }
}

export default SearchBar;