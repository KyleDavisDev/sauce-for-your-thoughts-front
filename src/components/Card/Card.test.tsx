import * as React from "react";
import * as enzyme from "enzyme";

import Card, { CardProps } from "./Card";
import { casual, ITERATION_SIZE } from "../../utils/testUtils/testUtils";

const fakeCard = (): CardProps => ({
  title: casual.string,
  description: casual.string,
  to: casual.string,
  imageLink: casual.string,
  showLink: casual.random_element([undefined, casual.boolean]),
  className: casual.random_element([undefined, casual.string]),
  anchorText: casual.random_element([undefined, casual.string])
});

const mockCards = new Array(ITERATION_SIZE).fill(null).map(fakeCard);

describe("<Card />", () => {
  const _defaultShowLink = true;

  it("renders", () => {
    mockCards.forEach(mockCard => {
      const wrapper = enzyme.shallow(<Card {...mockCard} />);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockCards.forEach(mockCard => {
      const wrapper = enzyme.shallow(<Card {...mockCard} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("appends className to parent", () => {
    mockCards.forEach(mockCard => {
      const wrapper = enzyme.shallow(<Card {...mockCard} />);

      expect(wrapper.first().prop("className")).toEqual(mockCard.className);
    });
  });

  it("passes expected 'to' to Head component", () => {
    mockCards.forEach(mockCard => {
      const wrapper = enzyme.shallow(<Card {...mockCard} />);

      expect(wrapper.find("Head").prop("to")).toEqual(mockCard.to);
    });
  });

  it("passes expected showLink to Head component when showLink provided", () => {
    mockCards.forEach(mockCard => {
      if (mockCard.showLink === undefined) return;

      const wrapper = enzyme.shallow(<Card {...mockCard} />);

      expect(wrapper.find("Head").prop("showLink")).toEqual(mockCard.showLink);
    });
  });

  it("passes default showLink to Head component when showLink not provided", () => {
    mockCards.forEach(mockCard => {
      if (mockCard.showLink !== undefined) return;

      const wrapper = enzyme.shallow(<Card {...mockCard} />);

      expect(wrapper.find("Head").prop("showLink")).toEqual(_defaultShowLink);
    });
  });

  it("passes expected imageLink to Head component", () => {
    mockCards.forEach(mockCard => {
      const wrapper = enzyme.shallow(<Card {...mockCard} />);

      expect(wrapper.find("Head").prop("imageLink")).toEqual(
        mockCard.imageLink
      );
    });
  });

  it("passes expected description to Head component", () => {
    mockCards.forEach(mockCard => {
      const wrapper = enzyme.shallow(<Card {...mockCard} />);

      expect(wrapper.find("Head").prop("description")).toEqual(
        mockCard.description
      );
    });
  });

  it("passes expected title to Body component", () => {
    mockCards.forEach(mockCard => {
      const wrapper = enzyme.shallow(<Card {...mockCard} />);

      expect(wrapper.find("Body").prop("title")).toEqual(mockCard.title);
    });
  });

  it("passes expected description to Body component", () => {
    mockCards.forEach(mockCard => {
      const wrapper = enzyme.shallow(<Card {...mockCard} />);

      expect(wrapper.find("Body").prop("description")).toEqual(
        mockCard.description
      );
    });
  });

  it("does not render Footer component when showLink is false", () => {
    mockCards.forEach(mockCard => {
      if (mockCard.showLink || mockCard.showLink === undefined) return;

      const wrapper = enzyme.shallow(<Card {...mockCard} />);

      expect(wrapper.find("Footer").exists()).toBeFalsy();
    });
  });

  it("renders Footer component when showLink is true or undefined", () => {
    mockCards.forEach(mockCard => {
      if (mockCard.showLink === false) return;

      const wrapper = enzyme.shallow(<Card {...mockCard} />);

      expect(wrapper.find("Footer").exists).toBeTruthy();
    });
  });

  it("passes expected 'to' to Footer component when showLabel is true", () => {
    mockCards.forEach(mockCard => {
      if (mockCard.showLink === false) return;

      const wrapper = enzyme.shallow(<Card {...mockCard} />);

      expect(wrapper.find("Footer").prop("to")).toEqual(mockCard.to);
    });
  });

  it("passes expected anchorText to Footer component when showLabel is true", () => {
    mockCards.forEach(mockCard => {
      if (mockCard.showLink === false) return;

      const wrapper = enzyme.shallow(<Card {...mockCard} />);

      expect(wrapper.find("Footer").prop("anchorText")).toEqual(
        mockCard.anchorText
      );
    });
  });
});
