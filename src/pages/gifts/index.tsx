import React from "react";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"

import LayoutComponent from "../../components/layout";

type GiftsIndexPageProps = {
  data: {
    allMdx: {
      nodes: Array<{
        id: string,
        slug: string,
        frontmatter: {
          title: string;
          date: string;
          image_link: string;
          image_alt: string;
          link: string;
        };
      }>;
    };
  };
};
type GiftsIndexPageState = {};

class GiftsIndexPage extends React.Component<GiftsIndexPageProps,GiftsIndexPageState> {
  constructor(props: GiftsIndexPageProps) {
    super(props)
  }

  public render() {
    return (
      <LayoutComponent pageTitle="Gifts">
        {
          this.props.data.allMdx.nodes.map(node => {
            return (
              <div>
                <h2>
                  <a target="_blank" href={node.frontmatter.title}>{node.frontmatter.title}</a>
                </h2>
                <StaticImage src="https://i.etsystatic.com/24300406/r/il/41cf8d/2494911473/il_1588xN.2494911473_k1r2.jpg" alt={node.frontmatter.image_alt} />
              </div>
            );
          })
        }
      </LayoutComponent>
    )
  }
}

export const query = graphql`
  query {
    allMdx(filter: {fileAbsolutePath: {regex: "/(gifts)/"}}) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title,
          image_alt,
          link
        },
        id,
        slug
      }
    }
  }
`

export default GiftsIndexPage;
