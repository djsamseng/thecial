import React from "react";

export type SupabaseSearchResult = {
  id: number;
  title: string;
  img: string;
  score_sum: number;
  url: string;
  custom_desc: string;
  word_matches: Array<string>;
};

type GiftItemComponentProps = {
  gift: SupabaseSearchResult,
};
type GiftItemComponentState = {};
class GiftItemComponent extends React.Component<GiftItemComponentProps, GiftItemComponentState> {
  constructor(props: GiftItemComponentProps) {
    super(props);
  }

  public render() {
    const item = this.props.gift;
    let img = null;
    let iframe = null;

    if (this.props.children) {
      img = this.props.children;
    }
    else if (item.img) {
      img = (
        <div className="mt-1 max-w-[300px] sm:max-w-xs h-[300px] bg-white">
          <img className="max-w-[300px] sm:max-w-xs max-h-[300px]" src={item.img} alt={item.title}></img>
        </div>

      )
    }
    return (
      <li className="mt-5 w-[340px] sm:w-[420px] h-[480px] border rounded p-4 border-bg-light-border dark:bg-bg-dark hover:bg-stone-50 dark:border-bg-dark-border dark:hover:bg-bg-dark-hover overflow-hidden" key={item.id}>
        <a target="_blank" rel="noopener" href={item.url}>
          <p className="text-2xl">{item.title}</p>
          <div className="flex flex-row items-baseline">
            {img}
            {iframe}
          </div>
          <p className="mt-1">{item.custom_desc}</p>
        </a>
        <div className="mt-2 overflow-hidden flex flex-row flex-wrap items-start">
          {
            item.word_matches.map(queryMatch => {
              if (queryMatch.length > 0) {
                queryMatch = queryMatch[0].toUpperCase() + queryMatch.slice(1);
              }
              return (
                <div className="mx-2 border-[1px] mb-1 px-2 border-stone-200 rounded overflow-hidden">{queryMatch}</div>
              )
            })
          }
        </div>
      </li>
    );
  }
}

export default GiftItemComponent;