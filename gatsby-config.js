require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Thecial",
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
        name: "gifts",
        path: `${__dirname}/data/gifts`
      }
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-postcss",
    "gatsby-plugin-preact",
    "gatsby-transformer-sharp"
  ],
};
