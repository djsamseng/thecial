import React from "react";
import { Link } from "gatsby";

import LayoutComponent from "../components/layout";
import SEOComponent from "../components/seo-component";
import HeadlineWithExamplesComponent, { ROTATION } from "../components/headline-with-examples";

type GuidePageProps = {};
type GuidePageState = {};

class GuidePage extends React.Component<GuidePageProps, GuidePageState> {
  constructor(props: GuidePageProps) {
    super(props);
  }

  public render() {
    const headlinesWithExamples = [
      {
        headline: "Personal",
        examples: [
          {
            text: "Their Name",
            rotation: ROTATION.R6,
          },
          {
            text: "A Book They Wrote",
            rotation: ROTATION.RN6,
          },
          {
            text: "Their Hangout Spot",
            rotation: ROTATION.R6,
          }
        ],
      },
      {
        headline: "Special",
        examples: [
          {
            text: "From the Heart",
            rotation: ROTATION.RN6,
          },
          {
            text: "Funny",
            rotation: ROTATION.R6
          }
        ]
      },
      {
        headline: "All About Them",
        examples: [
          {
            text: "Hobbies",
            rotation: ROTATION.R6,
          },
          {
            text: "Sports",
            rotation: ROTATION.R0,
          },
          {
            text: "Passions",
            rotation: ROTATION.RN6,
          }
        ],
      }
    ]
    return (
      <LayoutComponent pageTitle="Guide">
        <SEOComponent title="Guide" />
        <div className="px-3">
          <h2>Step 1: What is unique to them?</h2>
          <ul>
            <li>Their name</li>
            <li>A book they wrote</li>
          </ul>
        </div>
        <div className="border-b dark:border-gray-700 self-stretch pb-10 px-3">
          <div className="flex flex-row justify-center">
            <div className="flex flex-col">
              <HeadlineWithExamplesComponent headlines={headlinesWithExamples}/>
            </div>
          </div>
        </div>

      </LayoutComponent>
    )
  }
}

export default GuidePage;