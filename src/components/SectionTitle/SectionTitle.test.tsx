import * as React from "react";
import * as enzyme from "enzyme";
import SectionTitle from "./SectionTitle";

describe("<SectionTitle />", () => {
  const title = ["child1", "different text", "Third rANDom text"];
  const description = [
    "sample text here",
    "more text",
    "third string of text1231"
  ];
  const wrapper = enzyme.shallow(
    <SectionTitle title={title[0]} description={description[0]} />
  );

  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });

  it("renders correct tags", () => {
    expect(wrapper.find("StyledH2")).toBeTruthy();
    expect(wrapper.find("StyledH2").length).toEqual(1);

    expect(wrapper.find("StyledH6")).toBeTruthy();
    expect(wrapper.find("StyledH6").length).toEqual(1);
  });

  it("renders correct h2 text", () => {
    expect(
      wrapper
        .find("StyledH2")
        .render()
        .text()
    ).toEqual(title[0]);

    // Update title, retest
    wrapper.setProps({ title: title[1] });
    expect(
      wrapper
        .find("StyledH2")
        .render()
        .text()
    ).toEqual(title[1]);

    // Update title, retest
    wrapper.setProps({ title: title[2] });
    expect(
      wrapper
        .find("StyledH2")
        .render()
        .text()
    ).toEqual(title[2]);
  });

  it("renders correct h6 text", () => {
    expect(
      wrapper
        .find("StyledH6")
        .render()
        .text()
    ).toEqual(description[0]);

    // Update description, retest
    wrapper.setProps({ description: description[1] });
    expect(
      wrapper
        .find("StyledH6")
        .render()
        .text()
    ).toEqual(description[1]);

    // Update description, retest
    wrapper.setProps({ description: description[2] });
    expect(
      wrapper
        .find("StyledH6")
        .render()
        .text()
    ).toEqual(description[2]);
  });
});
