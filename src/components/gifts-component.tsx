import React, { createContext, useContext } from "react";

import GiftItemComponent from "./gift-item";
import { GiftResultProviderContext } from "./gift-result-provider-context";
import { GiftResult } from "../providers/base-gift-provider";


const EndOfResultsComponent = ({ headline, }: { headline: string, }) => {
  const emailSubject = encodeURIComponent("Help Me Find a Gift");
  const emailBody = (`Hey,\n
    I'm looking for a gift for a [Friend/Coworker/Mom/Brother/Fill In].\n
    It's for a [Birthday/Anniversary/Thank You/Baby Shower/Fill In].\n
    They really enjoy [Cooking/Golf/Pet Puppy/Gardening/Partying/Fill In].\n
    They are also really good at [Making People Laugh/Driving Slowly/Fill In].\n
    They are passionate about [Job as a Nurse/Volunteering at a Food Pantry/Fill In].\n
    Some of their big recent accomplishments are they [Wrote a book/Ran a Marathon/Fill In].\n
    My budget is [$0-$50/Fill In] but flexible.
    It needs to be delivered in [United States/Fill In] within [3 weeks/Fill In].\n Any ideas?
  `);
  return (
    <div className="pt-5 pb-20 px-3 flex flex-col items-center">
      <span className="text-xl md:text-4xl lg:text-5xl">{headline}</span>
      <span className="text-md mt-2">If you can't find something great, <a className="underline italic" href={`mailto:gatherbadger@gmail.com?subject=${emailSubject}&body=${encodeURIComponent(emailBody)}`}>
        send me an email
        </a> and I'll start looking!
      </span>
      <p className="border rounded-md mt-5 p-5 space-y-2">
        {
          emailBody.split("\n").map(line => {
            return (
              <div>
                <span>{line}</span>
              </div>

            );
          })
        }
      </p>
    </div>
  )
}

type GiftsSearchComponentProps = {};
type GiftsSearchComponentState = {
  maxResults: number;
}

class GiftsSearchComponent extends React.Component<GiftsSearchComponentProps, GiftsSearchComponentState> {
  static contextType = GiftResultProviderContext;
  constructor(props: GiftsSearchComponentProps) {
    super(props);
    this.state = {
      maxResults: 8,
    }
  }

  public componentDidMount(): void {
    if (!window) {
      return;
    }
    window.addEventListener("scroll", this.loadMoreOnScroll.bind(this));
  }

  public componentWillUnmount(): void {
    if (!window) {
      return;
    }
    window.removeEventListener("scroll", this.loadMoreOnScroll.bind(this));
  }


  public render() {
    const { searchMatches, totalResults, isSearching } = this.context as React.ContextType<typeof GiftResultProviderContext>;
    const matches = searchMatches as Array<GiftResult>;

    if (matches.length == 0 && !isSearching) {
      return (
        <EndOfResultsComponent headline="Hmm it seems we don't have that" />
      )
    }
    return (
      <div className="pt-5 pb-20 px-3 items-center">
        <div className="flex flex-col items-end mx-14">
          <p className="">Showing {matches.length} of {totalResults}</p>
        </div>

        <ul className="flex flex-row flex-wrap items-start justify-center space-x-2">
          {
            matches.map(giftResult => {
              return (
                <GiftItemComponent gift={giftResult} />
              );
            })
          }
        </ul>
        { isSearching ? (
          <div className="pt-5 pb-20 px-3 flex flex-col items-center text-2xl">
            Searching ...
          </div>
        ) : matches.length < totalResults ? (
          <div className="flex flex-col items-center mx-14">
            <button type="submit" onClick={this.onLoadMore.bind(this)}>{ matches.length < totalResults ? ("Load More") : ("") }</button>
          </div>
        ): (<EndOfResultsComponent headline="That's it folks!" />)}

      </div>
    )
  }

  private onLoadMore() {
    const { loadMore, isSearching } = this.context as React.ContextType<typeof GiftResultProviderContext>;
    if (!isSearching) {
      loadMore(this.state.maxResults + 8);
      this.setState({
        maxResults: this.state.maxResults + 8,
      });
    }

  }

  private loadMoreOnScroll() {
    if (!window || !document || !document.documentElement) {
      return;
    }
    if (window.innerHeight + document.documentElement.scrollTop + 50 >= document.scrollingElement.scrollHeight) {
      this.onLoadMore();
    }
  }
}

export default GiftsSearchComponent;
