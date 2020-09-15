import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";

import { Link, LinkProps } from "./Link";
import {
  casual,
  fakeJSXElement,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";

const mockLink = (): LinkProps => ({
  children: casual.random_element([
    casual.string,
    fakeJSXElement(),
    [casual.string, fakeJSXElement()]
  ]),
  href: casual.url,
  className: casual.boolean ? casual.string : undefined,
  target: casual.boolean
    ? casual.random_element(["_blank", "_self"])
    : undefined
});

const mockLinks = new Array(ITERATION_SIZE).fill(null).map(mockLink);

describe("<Link>", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<Link href="#">""</Link>);
    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    mockLinks.forEach((mockLink: LinkProps) => {
      const wrapper = enzyme.shallow(
        <Link {...mockLink}>{mockLink.children}</Link>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders correct children", () => {
    mockLinks.forEach((mockLink: LinkProps) => {
      const wrapper = enzyme.mount(
        <Link {...mockLink}>{mockLink.children}</Link>
      );

      expect(wrapper.find("a").props().children).toEqual(mockLink.children);
    });
  });

  it("renders correct link", () => {
    mockLinks.forEach((mockLink: LinkProps) => {
      const wrapper = enzyme.mount(
        <Link {...mockLink}>{mockLink.children}</Link>
      );

      expect(wrapper.find("a").props().href).toEqual(mockLink.href);
    });
  });

  it("accepts additional classname", () => {
    mockLinks.forEach((mockLink: LinkProps) => {
      if (!mockLink.className) return;

      const wrapper = enzyme.mount(
        <Link {...mockLink}>{mockLink.children}</Link>
      );

      expect(wrapper.find("a").props().className).toContain(mockLink.className);
    });
  });

  it("render outward link if asked otherwise default", () => {
    mockLinks.forEach((mockLink: LinkProps) => {
      const wrapper = enzyme.mount(
        <Link {...mockLink}>{mockLink.children}</Link>
      );

      expect(wrapper.find("a").props().target).toContain(
        mockLink.target || "_self"
      );
    });
  });
});
