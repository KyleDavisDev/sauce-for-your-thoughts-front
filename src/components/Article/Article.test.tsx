import * as React from "react";
import * as enzyme from "enzyme";

import { Article, ArticleProps } from "./Article";
import {
  casual,
  fakeJSXElement,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";

const mockArticle = (): ArticleProps => ({
  children: fakeJSXElement(),
  className: casual.random_element([undefined, casual.string]),
  size: casual.random_element(["sm", "md", "lg", undefined])
});

const mockArticles = new Array(ITERATION_SIZE).fill(null).map(mockArticle);

describe("<Article>", () => {
  it("renders", () => {
    mockArticles.forEach(mockArticle => {
      const wrapper = enzyme.shallow(
        <Article {...mockArticle}>{mockArticle.children}</Article>
      );
      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.shallow(
      <Article>
        <span>hello!</span>
      </Article>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("renders children", () => {
    let wrapper = enzyme.shallow(
      <Article>
        <span>hello!</span>
      </Article>
    );
    expect(wrapper.find("span")).toBeTruthy();
    expect(wrapper.find("span").text()).toEqual("hello!");

    wrapper = enzyme.shallow(
      <Article>
        <p>hello! Anoter test here</p>
      </Article>
    );
    expect(wrapper.find("p")).toBeTruthy();
    expect(wrapper.find("p").text()).toEqual("hello! Anoter test here");
  });
});
