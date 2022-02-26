import React from "react";


export enum ROTATION {
  R0 = 0,
  RN12 = 1,
  R12 = 2,
  R6 = 3,
  RN6 = 4,
}
type RotatedExample = {
  text: string;
  rotation: ROTATION;
};
type RotatedExamplesProps = {
  examples: Array<RotatedExample>;
};
type RotatedExamplesState = {

};
class RotatedExamplesComponent extends React.Component<RotatedExamplesProps, RotatedExamplesState> {
  constructor(props: RotatedExamplesProps) {
    super(props);
  }

  public render() {
    return (
      <div className="flex flex-row space-x-10">
        <div className="text-sm sm:text-lg m-5 mt-4 space-x-10 flex-1 flex flex-row justify-around">
          {
            this.props.examples.map(({text, rotation}) => {
              if (rotation == ROTATION.R0) {
                return (
                  <div className="rotate-0 text-center">{text}</div>
                )
              }
              else if (rotation == ROTATION.R12) {
                return (
                  <div className="rotate-12 text-center">{text}</div>
                )
              }
              else if (rotation == ROTATION.RN12) {
                return (
                  <div className="-rotate-12 text-center">{text}</div>
                )
              }
              else if (rotation == ROTATION.R6) {
                return (
                  <div className="rotate-6 text-center">{text}</div>
                )
              }
              else if (rotation == ROTATION.RN6) {
                return (
                  <div className="-rotate-6 text-center">{text}</div>
                )
              }
              return (
                <div className="rotate-0 text-center">{text}</div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

type HeadlineWithExamplesComponentProps = {
    headlines: Array<{
      headline: string;
      examples: Array<RotatedExample>;
    }>
};
type HeadlineWithExamplesComponentState = {};

class HeadlineWithExamplesComponent extends React.Component<HeadlineWithExamplesComponentProps, HeadlineWithExamplesComponentState> {
  constructor(props: HeadlineWithExamplesComponentProps) {
    super(props);
  }

  public render() {
    return (
      <ul className="mt-2 sm:mt-10 text-3xl space-y-2">
        {
          this.props.headlines.map(headline => {
            return (
              <li className="">
                <div className="flex flex-col items-center sm:items-start">
                  {headline.headline}
                </div>
                <RotatedExamplesComponent examples={headline.examples} />
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default HeadlineWithExamplesComponent;