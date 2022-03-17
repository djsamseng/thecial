import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Link, graphql } from "gatsby";

import LayoutComponent from "../../components/layout";
import SEOComponent from "../../components/seo-component";

interface ListsPageProps extends RouteComponentProps {
  data: {
    allLists: {
      nodes: Array<{
        title: string,
        slug: string,
      }>;
    }
  }
};
type ListsPageState = {};

class ListsPage extends React.Component<ListsPageProps, ListsPageState> {
  constructor(props: ListsPageProps) {
    super(props);
  }

  public render() {
    return (
      <LayoutComponent pageTitle="Blog" location={this.props.location}>
        <SEOComponent title="Blog" />
        <div className="flex flex-col items-center space-y-12">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl sm:text-5xl">Hand Crafted Gift Lists</h1>
            <h2 className="text-center"></h2>
          </div>
          <div className="flex flex-col items-start">
            {
              this.props.data.allLists.nodes.map(listData => {
                return (
                  <div className="text-xl">
                    <Link to={`/lists/${listData.slug}`}>
                      {listData.title}
                    </Link>

                  </div>
                )
              })
            }
          </div>


        </div>
      </LayoutComponent>
    )
  }
}

export const query = graphql`
  query {
    allLists(filter: {}) {
      nodes {
        title
        slug
      }
    }
  }
`

export default ListsPage;