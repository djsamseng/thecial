import React from "react";

export type GiftResultItem = {
  key: string;
  url?: string;
  title: string;
  tags: Array<string>;
  img?: string;
  iframe?: string;
  desc: string;
}
export type GiftResult = {
  queryMatches: Array<string>;
  item: GiftResultItem;
}

type GiftItemComponentProps = {
  giftResult: GiftResult;
};
type GiftItemComponentState = {};
class GiftItemComponent extends React.Component<GiftItemComponentProps, GiftItemComponentState> {
  constructor(props: GiftItemComponentProps) {
    super(props);
  }

  public render() {
    const giftResult = this.props.giftResult;
    const item = giftResult.item;
    let img = null;
    let iframe = null;

    if (item.img) {
      img = (
        <img className="ml-5 mt-1 max-w-xs" src={item.img}></img>
      )
    }
    else if (item.iframe) {
      iframe = (
        <iframe className="ml-5 mt-1 w-[120px] h-[240px]" scrolling="no" src={item.iframe}/>
      )
    }
    let queryMatches = giftResult.queryMatches.length > 0 ? giftResult.queryMatches.join(" ") : ""
    return (
      <li className="mt-5 border-[1px] rounded p-4 border-stone-200 bg-stone-50 hover:bg-white dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-800" key={item.key}>
        <a target="_blank" href={item.url}>
          <p className="text-2xl">{item.title}</p>
          <div className="flex flex-row items-baseline">
            {img}
            {iframe}
          </div>
          <p className="mt-1">{item.desc}</p>
        </a>
        <p>{queryMatches}</p>
      </li>
    );
  }
}

export default GiftItemComponent;