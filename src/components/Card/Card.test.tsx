import * as React from "react";
import * as enzyme from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Card from "./Card";

describe("<Card />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Card title="" description="" to="" />);
    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.shallow(<Card title="" description="" to="" />);
    expect(wrapper).toBeTruthy();
  });

  it("renders correct content", () => {
    let wrapper = enzyme.render(
      <MemoryRouter>
        <Card title="Title1" description="Desc1" to="" />
      </MemoryRouter>
    );
    expect(wrapper.find("h4").text()).toEqual("Title1");
    expect(wrapper.find("p").text()).toEqual("Desc1");

    wrapper = enzyme.render(
      <MemoryRouter>
        <Card title="Title2" description="Desc2" to="" />
      </MemoryRouter>
    );
    expect(wrapper.find("h4").text()).toEqual("Title2");
    expect(wrapper.find("p").text()).toEqual("Desc2");
  });
});
