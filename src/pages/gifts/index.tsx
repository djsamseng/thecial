import React from "react";
import { Router } from "@reach/router";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"

import LayoutComponent from "../../components/layout";

type GiftsSearchComponentProps = {};
type GiftsSearchComponentState = {
  searchText: string;
}

const DATA = [
  {
    url: "",
    title: "Golf Cheating Device",
    tags: ["golf", "prank"],
  },
  {
    url: "",
    title: "Family Puzzle",
    tags: ["family", "picture", "puzzle", "personalized"],
  }
];

const TAG_TO_DATA = {};
for (const item of DATA) {
  for (const tag of item.tags) {
    if (!TAG_TO_DATA[tag]) {
      TAG_TO_DATA[tag] = []
    }
    TAG_TO_DATA[tag].push(item);
  }
}

class GiftsSearchComponent extends React.Component<GiftsSearchComponentProps, GiftsSearchComponentState> {
  constructor(props: GiftsSearchComponentProps) {
    super(props);
    this.state = {
      searchText: "",
    }
  }

  public render() {
    let matches = DATA;
    if (this.state.searchText) {
      const words = this.state.searchText.split(" ");
      if (words.length > 0) {
        matches = [];
        for (const word of words) {
          for (const tag in TAG_TO_DATA) {
            if (tag.startsWith(word) && tag !== word) {
              words.push(tag);
            }
          }
        }
      }
      for (const word of words) {
        if (TAG_TO_DATA[word]) {
          TAG_TO_DATA[word].forEach(item => {
            matches.push(item);
          });
        }
      }
      // TODO: remove duplicates
    }

    return (
      <div>
        <input type="text" onChange={this.onSearchChange.bind(this)}></input>
        <ul>
          {
            matches.map(item => {
              return (
                <li>{item.title}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  private onSearchChange(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchText: evt.target.value,
    });
  }
}

type GiftsIndexPageProps = {
};
type GiftsIndexPageState = {};

class GiftsIndexPage extends React.Component<GiftsIndexPageProps,GiftsIndexPageState> {
  constructor(props: GiftsIndexPageProps) {
    super(props)
  }

  public render() {
    return (
      <LayoutComponent pageTitle="Gifts">
        <GiftsSearchComponent />
      </LayoutComponent>
    )
  }
}

export default GiftsIndexPage;
