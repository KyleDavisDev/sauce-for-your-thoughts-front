import * as React from "react";
import * as enzyme from "enzyme";
import List from "./List";
import { MemoryRouter } from "react-router-dom";

describe("<List />", () => {
  const title = ["Test title", "Another title"];
  const items = [
    { text: "Sample text", link: "github.com" },
    { text: "More text" },
    { link: "google.com", text: "Third" }
  ];
  let wrapper = enzyme.render(
    <MemoryRouter>
      <List title={title[0]} items={items} />
    </MemoryRouter>
  );

  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });

  it("renders correct title", () => {
    expect(wrapper.find("h5").text()).toEqual(title[0]);

    // Update title
    wrapper = enzyme.render(
      <MemoryRouter>
        <List title={title[1]} items={items} />
      </MemoryRouter>
    );
    expect(wrapper.find("h5").text()).toEqual(title[1]);
  });

  it("renders correct number of list items", () => {
    expect(wrapper.find("li").length).toEqual(items.length);
    // Add item to items, update props
    items.push({ text: "Fourth title", link: "javascript.com" });
    wrapper = enzyme.render(
      <MemoryRouter>
        <List title={title[0]} items={items} />
      </MemoryRouter>
    );
    expect(wrapper.find("li").length).toEqual(items.length);
  });

  it("renders correct list item texts", () => {
    wrapper.find("li").map((ind, node) => {
      // li -> a -> text -> data (same as text())
      expect(node.children[0].children[0].data).toEqual(items[ind].text);
    });
  });

  it("renders correct list item link", () => {
    wrapper.find("li").map((ind, node) => {
      // li -> a
      expect(node.children[0].attribs.href).toEqual(items[ind].link || "#");
    });
  });
});
