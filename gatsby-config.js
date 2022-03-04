require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.gatherbadger.com",
    title: "Gather Badger",
    description: "Find the perfect gift. Search our hand crafted list of gifts or use our idea generator to come up with the perfect gift. We believe in a unique and special gift that will leave them beloved",
    author: "Gather Badger"
  },
  plugins: [
    "gatsby-plugin-dts-css-modules",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/data/blog`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`
      }
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-postcss",
    "gatsby-plugin-preact",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatherBadger`,
        short_name: `GatherBadger`,
        start_url: `/`,
        background_color: `#335541`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/badger-logo-square-48-48.png`, // This path is relative to the root of the site.
      },
    },
  ],
};
