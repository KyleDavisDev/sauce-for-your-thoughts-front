import * as React from "react";
import * as enzyme from "enzyme";

import  Article,{ ArticleProps } from "./Article";
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
    mockArticles.forEach(mockArticle => {
      const wrapper = enzyme.shallow(
        <Article {...mockArticle}>{mockArticle.children}</Article>
      );

    expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders expected children", () => {
    mockArticles.forEach(mockArticle => {
      const wrapper = enzyme.shallow(
        <Article {...mockArticle}>{mockArticle.children}</Article>
      );
      
      expect(wrapper.find("article").prop("children")).toBeTruthy();
      expect(wrapper.find("article").prop("children")).toEqual(mockArticle.children);
    });
  });
});
