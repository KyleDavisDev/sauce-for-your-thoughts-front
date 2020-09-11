import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { Link } from "./Link";
import { fakeLinks } from "../../utils/testUtils/testUtils";
import { MockLink } from "../../utils/testUtils/types";

const mockLinks = fakeLinks();

describe("<Link>", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Link href="#">""</Link>);
    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    mockLinks.forEach((mockLink: MockLink) => {
      const wrapper = enzyme.shallow(
        <Link {...mockLink}>{mockLink.children}</Link>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders correct children", () => {
    mockLinks.forEach((mockLink: MockLink) => {
      const wrapper = enzyme.mount(
        <Link {...mockLink}>{mockLink.children}</Link>
      );

      expect(wrapper.find("a").props().children).toEqual(mockLink.children);
    });
  });

  it("renders correct link", () => {
    mockLinks.forEach((mockLink: MockLink) => {
      const wrapper = enzyme.mount(
        <Link {...mockLink}>{mockLink.children}</Link>
      );

      expect(wrapper.find("a").props().href).toEqual(mockLink.href);
    });
  });

  it("accepts additional classname", () => {
    mockLinks.forEach((mockLink: MockLink) => {
      if (!mockLink.className) return;

      const wrapper = enzyme.mount(
        <Link {...mockLink}>{mockLink.children}</Link>
      );

      expect(wrapper.find("a").props().className).toContain(mockLink.className);
    });
  });

  it("render outward link if asked otherwise default", () => {
    mockLinks.forEach((mockLink: MockLink) => {
      const wrapper = enzyme.mount(
        <Link {...mockLink}>{mockLink.children}</Link>
      );

      expect(wrapper.find("a").props().target).toContain(
        mockLink.target || "_self"
      );
    });
  });
});
