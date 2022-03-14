import React from "react";
import { RouteComponentProps } from "@reach/router";
import { navigate, withPrefix } from "gatsby";

import { SearchBarContext } from "../../components/searchbar";
import LayoutComponent from "../../components/layout";
import SEOComponent from "../../components/seo-component";
import GiftsSearchComponent from "../../components/static-gifts";
import SupaGiftsComponent from "../../components/supa-gifts";

const USE_STATIC_GIFTS = true;

interface GiftsIndexPageProps extends RouteComponentProps {
};
type GiftsIndexPageState = {
  searchText: string;
  pendingSearchText: string;
};

class GiftsIndexPage extends React.Component<GiftsIndexPageProps,GiftsIndexPageState> {
  constructor(props: GiftsIndexPageProps) {
    super(props);
    const searchText = this.getSearchTextFromLocation();
    this.state = {
      searchText,
      pendingSearchText: searchText,
    };
  }

  public render() {
    if ((this.props.location?.state as any)?.source === "navbar") {
      (this.props.location.state as any).source = "self";
      this.setState({
        pendingSearchText: "",
        searchText: "",
      });
    }
    const searchContext = {
      pendingSearchText: this.state.pendingSearchText,
      searchText: this.state.searchText,
      setPendingSearchText: (newText: string) => {
        this.setState({
          pendingSearchText: newText,
        })
      },
      submitSearch: this.submitSearch.bind(this),
    };
    return (
      <SearchBarContext.Provider value={searchContext}>
        <LayoutComponent pageTitle="Gift Search">
          <SEOComponent title="Gift Search"/>
          { USE_STATIC_GIFTS ? (<GiftsSearchComponent />) : (<SupaGiftsComponent />)}

        </LayoutComponent>
      </SearchBarContext.Provider>

    )
  }

  private submitSearch() {
    const searchText = this.state.pendingSearchText;
    const newUrl = "/gifts?search=" + encodeURIComponent(searchText.replace(" ", "+"));
    if (this.props.location && this.props.location.pathname.indexOf(withPrefix("/gifts")) >= 0) {
      window.history.pushState("", "", newUrl);
      this.setState({
        searchText,
      });
    }
    else {
      navigate(newUrl);
    }
  }

  private getSearchTextFromLocation(): string {
    if (this.props.location && this.props.location.search) {
      const params = new URLSearchParams(this.props.location.search);
      const query = params.get("search").replace("+", " ");
      return query;
    }
    return "";
  }
}

export default GiftsIndexPage;
