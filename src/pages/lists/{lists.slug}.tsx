import { graphql } from "gatsby";
import React from "react";
import { RouteComponentProps } from "@reach/router";

import GiftItemComponent from "../../components/gift-item";
import LayoutComponent from "../../components/layout";
import SEOComponent from "../../components/seo-component";

interface ListPageProps extends RouteComponentProps {
  data: {
    lists: {
      title: string;
      gifts: Array<{
        id: number;
        img: string;
        list_desc: string;
        title: string;
        url: string;
      }>;
    }
  }
}
const ListPage = ({ data, location }: ListPageProps) => {
  const title = "Test Gift List";
  return (
    <LayoutComponent pageTitle={data.lists.title} location={location}>
      <SEOComponent title={data.lists.title} />
      <div className="pt-5 pb-20 px-3 items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-5xl">{data.lists.title}</h1>
          <h2 className="text-center"></h2>
        </div>
        <div className="flex flex-col items-end mx-14">
          <p className="">Showing {data.lists.gifts.length} of {data.lists.gifts.length}</p>
        </div>

        <ul className="flex flex-row flex-wrap items-start justify-center space-x-2">
          {
            data.lists.gifts.map(g => {
              const supaGift = {
                id: g.id,
                img: g.img,
                title: g.title,
                url: g.url,
                score_sum: 1,
                custom_desc: "",
                word_matches: [],
              }
              return (
                <GiftItemComponent gift={supaGift} />
              );
            })
          }
        </ul>
      </div>
    </LayoutComponent>
  )
}

export const query = graphql`
  query($id: String) {
    lists(id: {eq:$id}) {
      title
      gifts {
        id
        img
        list_desc
        title
        url
      }
    }
  }
`

export default ListPage;