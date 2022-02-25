import React from "react";

import LayoutComponent from "../components/layout";

type GuidePageProps = {};
type GuidePageState = {};

class GuidePage extends React.Component<GuidePageProps, GuidePageState> {
  constructor(props: GuidePageProps) {
    super(props);
  }

  public render() {
    return (
      <LayoutComponent pageTitle="Guide">
        <div className="px-3">
          <h2>Step 1: What is unique to them?</h2>
          <ul>
            <li>Their name</li>
            <li>A book they wrote</li>
          </ul>
        </div>

      </LayoutComponent>
    )
  }
}

export default GuidePage;