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
    className: casual.random_element([undefined, casual.words]),
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

  // it("selects assigned prop", () => {
  //   wrapper.setProps({ selectedValue: "one" });
  //   expect(wrapper.render().find("select [selected]").text()).toEqual("one");

  //   wrapper.setProps({ selectedValue: "seven" });
  //   expect(wrapper.render().find("select [selected]").val()).toEqual("seven");
  // });

  // it("calls onSelect when component used", () => {
  //   const select = wrapper.find("StyledSelect");

  //   select.simulate("change");
  //   expect(mockOnSelect).toHaveBeenCalledTimes(1);

  //   select.simulate("change");
  //   expect(mockOnSelect).toHaveBeenCalledTimes(2);
  // });
});
