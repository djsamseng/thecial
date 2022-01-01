import React from "react";
import { graphql } from "gatsby";

import LayoutComponent from "../components/layout";

type BlogPageProps = {
  data: {
    allFile: {
      nodes: Array<{name: string}>;
    }
  }
};
type BlogPageState = {};

class BlogPage extends React.Component<BlogPageProps, BlogPageState> {
  constructor(props: BlogPageProps) {
    super(props);
  }

  public render() {
    return (
      <LayoutComponent pageTitle="Blog">
        <ul>
          {
            this.props.data.allFile.nodes.map(node => {
              return (
                <li>
                  {node.name}
                </li>
              );
            })
          }
        </ul>
      </LayoutComponent>
    )
  }
}

export const query = graphql`
  query {
    allFile(filter: {sourceInstanceName: {eq: "blog"}}) {
      nodes {
        name
      }
    }
  }
`

export default BlogPage;