import * as React from "react";
import * as enzyme from "enzyme";
import Descriptor from "./Descriptor";

describe("<Descriptor>", () => {
  const title = "Test title";
  const children = "Test description";
  const wrapper = enzyme.shallow(
    <Descriptor title={title}>{children}</Descriptor>
  );

  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });

  it("Renders correct title", () => {
    expect(
      wrapper
        .find("Title")
        .children()
        .text()
    ).toEqual(title);

    // Test an updated title
    wrapper.setProps({ title: "Another title here!!" });
    expect(
      wrapper
        .find("Title")
        .children()
        .text()
    ).toEqual("Another title here!!");
  });

  it("Renders correct description", () => {
    expect(
      wrapper
        .render()
        .find("p")
        .text()
    ).toEqual(children);

    // Test an updated description
    wrapper.setProps({ children: "Second description test" });
    expect(
      wrapper
        .render()
        .find("p")
        .text()
    ).toEqual("Second description test");
  });
});
