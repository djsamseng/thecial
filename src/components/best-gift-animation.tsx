import React from "react";

type BestGiftAnimationComponentProps = {};
type BestGiftAnimationComponentState = {};

interface QuoteData {
  quote: string;
  author: string;
}
interface WithKey {
  key: string;
}

// https://freesvg.org/1511820216

const QUOTES: Array<QuoteData> = [
  {
    quote: "That was the best gift ever!",
    author: "Tory",
  },
  {
    quote: "This is HILARIOUS! Love it",
    author: "Adam"
  },
  {
    quote: "Thank you so much, this meant the world to me :)",
    author: "Megan",
  },
  {
    quote: "You remembered! I can't stop smiling",
    author: "Robert"
  },
]

const ANIMATIONS = [
  `animate-[fade-in-out-0_10s_infinite] self-start  sm:self-center sm:ml-[-200px]`,
  `animate-[fade-in-out-1_10s_infinite] self-center sm:self-center sm:ml-[0px]`,
  `animate-[fade-in-out-2_10s_infinite] self-start  sm:self-center sm:ml-[100px]`,
  `animate-[fade-in-out-3_10s_infinite] self-end    sm:self-center sm:ml-[200px]`,
  `animate-[fade-in-out-4_10s_infinite] self-center sm:self-center sm:ml-[0px]`,
]

const QUOTES_WITH_KEYS = QUOTES.map((obj, idx) => {
  (obj as (QuoteData & WithKey)).key = idx.toString();
  return obj as (QuoteData & WithKey);
});


class BestGiftAnimationComponent extends React.Component<BestGiftAnimationComponentProps, BestGiftAnimationComponentState> {
  constructor(props: BestGiftAnimationComponentProps) {
    super(props);
  }

  public render() {
    return (
      <div className="my-5 w-full pt-20 h-10 px-3">
        <ul className="flex flex-row w-full" >
          {
            QUOTES_WITH_KEYS.map((obj, idx) => {
              return (
                <div className="absolute w-full flex flex-col px-10">
                  <li key={obj.key} className={ANIMATIONS[idx]}>
                    <div className="">
                      <p>{obj.quote}</p>
                      <p>- {obj.author}</p>
                    </div>
                  </li>
                </div>
              );
            })
          }
        </ul>
      </div>
    )
  }
}

export default BestGiftAnimationComponent;