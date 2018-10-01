import * as React from "react";
import * as enzyme from "enzyme";
import List from "./List";

describe("<List />", () => {
  const title = ["Test title", "Another title"];
  const items = [
    { text: "Sample text" },
    { text: "More text" },
    { link: "google.com", text: "Third" }
  ];
  const wrapper = enzyme.shallow(<List title={title[0]} items={items} />);

  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
});
