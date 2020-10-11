import * as React from "react";
import * as enzyme from "enzyme";

import Body, { IBodyProps } from "./Body";
import { casual, ITERATION_SIZE } from "../../../utils/testUtils/testUtils";

const fakeBody = (): IBodyProps => ({
  title: casual.random_element([undefined, casual.string]),
  description: casual.random_element([
    undefined,
    casual.string,
    casual.sentences(10)
  ])
});

const mockBodies = new Array(ITERATION_SIZE).fill(null).map(fakeBody);

describe("<Body />", () => {
  const defaultText = "Loading ...";
  const defaultLength = 60;

  it("renders", () => {
    mockBodies.forEach(mockBody => {
      const wrapper = enzyme.shallow(<Body {...mockBody} />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockBodies.forEach(mockBody => {
      const wrapper = enzyme.shallow(<Body {...mockBody} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders default title", () => {
    mockBodies.forEach(mockBody => {
      if (mockBody.title) return;

      const wrapper = enzyme.shallow(<Body {...mockBody} />);

      expect(wrapper.find("h4").text()).toEqual(defaultText);
    });
  });

  it("renders expected title", () => {
    mockBodies.forEach(mockBody => {
      if (!mockBody.title) return;

      const wrapper = enzyme.shallow(<Body {...mockBody} />);

      expect(wrapper.find("h4").text()).toEqual(mockBody.title);
    });
  });

  it("renders default description", () => {
    mockBodies.forEach(mockBody => {
      if (mockBody.description) return;

      const wrapper = enzyme.shallow(<Body {...mockBody} />);

      expect(wrapper.find("p").text()).toEqual(defaultText);
    });
  });

  it("renders expected description if short", () => {
    mockBodies.forEach(mockBody => {
      if (!mockBody.description) return;
      if (mockBody.description.length > defaultLength) return;

      const wrapper = enzyme.shallow(<Body {...mockBody} />);

      expect(wrapper.find("p").text()).toEqual(mockBody.description);
    });
  });

  it("cuts down descriptions if long", () => {
    mockBodies.forEach(mockBody => {
      if (!mockBody.description) return;
      if (mockBody.description.length < defaultLength) return;

      const wrapper = enzyme.shallow(<Body {...mockBody} />);

      expect(wrapper.find("p").text()).toEqual(
        mockBody.description.substring(0, defaultLength - 1) + "..."
      );
    });
  });
});
