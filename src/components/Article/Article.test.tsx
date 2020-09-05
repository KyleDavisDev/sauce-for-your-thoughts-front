import * as React from "react";
import * as enzyme from "enzyme";

import { Article } from "./Article";

describe("<Article>", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(
      <Article>
        <span>hello!</span>
      </Article>
    );
    expect(wrapper).toBeTruthy();
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
