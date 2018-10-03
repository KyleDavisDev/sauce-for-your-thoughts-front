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
});
