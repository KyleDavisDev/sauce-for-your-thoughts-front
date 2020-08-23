import * as React from "react";
import HeaderSimple from "../src/components/HeaderSimple/HeaderSimple";
import { Article } from "../src/components/Article/Article";

export interface TACProps {}

const TAC: React.SFC<TACProps> = () => {
  return (
    <>
      <HeaderSimple />
      <Article>
        <ol>
          <li>Don't be a jerk.</li>
          <li>Don't do anything you might regret later.</li>
          <li>That's it!</li>
        </ol>
      </Article>
    </>
  );
};

export default TAC;
