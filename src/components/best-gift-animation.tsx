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
  `animate-[fade-in-out-0_10s_infinite] ml-[0px]`,
  `animate-[fade-in-out-1_10s_infinite] ml-[20px]`,
  `animate-[fade-in-out-2_10s_infinite] ml-[0px]`,
  `animate-[fade-in-out-3_10s_infinite] ml-[60px]`,
  `animate-[fade-in-out-4_10s_infinite] ml-[80px]`,
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
      <div className="my-5 w-full h-10">
        <ul >
          {
            QUOTES_WITH_KEYS.map((obj, idx) => {
              return (
                <li key={obj.key} className={ANIMATIONS[idx]}>
                  <div >
                    <div className="absolute">
                      <p>{obj.quote}</p>
                      <p>- {obj.author}</p>
                    </div>

                  </div>

                </li>
              );
            })
          }
        </ul>
      </div>
    )
  }
}

export default BestGiftAnimationComponent;