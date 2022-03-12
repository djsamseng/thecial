import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
// import { MDXRenderer } from "gatsby-plugin-mdx";
import LayoutComponent from "../../components/layout";
import SEOComponent from "../../components/seo-component";


type BlogPostProps = {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        date: string;
        hero_image: any;
        hero_image_alt: string;
        hero_credit_link: string;
      },
      id: string;
      body: string;
    }
  }
};
type BlogPostState = {};

class BlogPost extends React.Component<BlogPostProps, BlogPostState> {
  constructor(props: BlogPostProps) {
    super(props);
  }

  public render() {
    const image = getImage(this.props.data.mdx.frontmatter.hero_image);
    return (
      <LayoutComponent pageTitle={this.props.data.mdx.frontmatter.title}>
        <SEOComponent title={this.props.data.mdx.frontmatter.title} />
        <p>{this.props.data.mdx.frontmatter.date}</p>
        <a href={this.props.data.mdx.frontmatter.hero_credit_link}>
          <GatsbyImage image={image} alt={this.props.data.mdx.frontmatter.hero_image_alt} />
        </a>
        <MDXRenderer>
          {this.props.data.mdx.body}
        </MDXRenderer>
      </LayoutComponent>
    )
  }
}

export const query = graphql`
  query($id: String) {
    mdx(id: {eq:$id}) {
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        title
        hero_image_alt
        hero_credit_link
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      },
      id,
      body
    }
  }
`

export default BlogPost;