import * as React from "react";
import * as enzyme from "enzyme";

import { casual, ITERATION_SIZE } from "../../utils/testUtils/testUtils";
import DropDown, { DropDownProps } from "./DropDown";

const getRandomValFromArr = (arr: string[]) => {
  // get rnadom value from array if possible
  const randomIndexInArray = casual.integer(0, arr.length);

  return arr[randomIndexInArray];
};

const fakeDropDown = (): DropDownProps => {
  // generate options
  const options = casual.array_of_words();

  // get selected value if possible
  const selectedValue = casual.random_element([
    undefined,
    getRandomValFromArr(options)
  ]);

  return {
    id: casual.random_element([undefined, casual.uuid]),
    options,
    selectedValue,
    name: casual.random_element([undefined, casual.uuid]),
    className: casual.random_element([undefined, casual.string]),
    showLabel: casual.random_element([undefined, casual.boolean]),
    label: casual.random_element([undefined, casual.string]),
    required: casual.random_element([undefined, casual.boolean]),
    onSelect: jest.fn()
  };
};

const mockDropDowns = new Array(ITERATION_SIZE).fill(null).map(fakeDropDown);

describe("<DropDown>", () => {
  it("renders", () => {
    mockDropDowns.forEach(mockDropDown => {
      const wrapper = enzyme.shallow(<DropDown {...mockDropDown} />);
      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockDropDowns.forEach(mockDropDown => {
      const wrapper = enzyme.shallow(<DropDown {...mockDropDown} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders correct number of options", () => {
    mockDropDowns.forEach(mockDropDown => {
      const wrapper = enzyme.shallow(<DropDown {...mockDropDown} />);

      expect(wrapper.find("option").length).toEqual(
        mockDropDown.options.length
      );
    });
  });

  it("selects assigned prop", () => {
    mockDropDowns.forEach(mockDropDown => {
      const wrapper = enzyme.shallow(<DropDown {...mockDropDown} />);

      // get random value and update props
      const randomVal = getRandomValFromArr(mockDropDown.options);
      wrapper.setProps({ selectedValue: randomVal });

      expect(wrapper.render().find("select [selected]").text()).toEqual(
        randomVal
      );
    });
  });

  it("calls onSelect when component used", () => {
    mockDropDowns.forEach(mockDropDown => {
      const wrapper = enzyme.shallow(<DropDown {...mockDropDown} />);

      const select = wrapper.find("StyledSelect");

      select.simulate("change");
      expect(mockDropDown.onSelect).toHaveBeenCalledTimes(1);

      select.simulate("change");
      expect(mockDropDown.onSelect).toHaveBeenCalledTimes(2);
    });
  });

  it("adds className to parent div", () => {
    mockDropDowns.forEach(mockDropDown => {
      const wrapper = enzyme.shallow(<DropDown {...mockDropDown} />);

      if (!mockDropDown.className) return;

      expect(wrapper.find("div").first().prop("className")).toContain(
        mockDropDown.className
      );
    });
  });

  it("renders label element when showLabel is true", () => {
    mockDropDowns.forEach(mockDropDown => {
      const wrapper = enzyme.shallow(<DropDown {...mockDropDown} />);

      if (!mockDropDown.showLabel) return;

      expect(wrapper.find("Label")).toBeTruthy();
    });
  });
});
