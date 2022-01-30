import React from "react";
import { Link, graphql } from "gatsby";

import LayoutComponent from "../../components/layout";

type BlogPageProps = {
  data: {
    allMdx: {
      nodes: Array<{
        id: string,
        slug: string,
        frontmatter: {
          title: string,
          date: string;
        };
      }>;
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
        {
          this.props.data.allMdx.nodes.map(node => {
            return (
              <article key={node.id}>
                <h2>
                  <Link to={`/blog/${node.slug}`}>
                    {node.frontmatter.title}
                  </Link>
                </h2>
                <p>Posted: {node.frontmatter.date}</p>
              </article>
            );
          })
        }
      </LayoutComponent>
    )
  }
}

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC } ), {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        },
        id,
        slug
      }
    }
  }
`

export default BlogPage;