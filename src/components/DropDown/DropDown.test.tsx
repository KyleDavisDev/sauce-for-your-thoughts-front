import * as React from "react";
import * as enzyme from "enzyme";
import DropDown from "./DropDown";

describe("<DropDown>", () => {
  const mockOnSelect = jest.fn();
  const options = ["one", "two", "three", "seven", "ten"];
  const wrapper = enzyme.shallow(
    <DropDown options={options} onSelect={mockOnSelect} />
  );

  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });

  it("renders correct number of options", () => {
    const testOptions = options;

    expect(wrapper.find("option").length).toEqual(testOptions.length);

    // Add some more options
    testOptions.concat("1", "2", "1", "");
    wrapper.setProps({ options: testOptions });
    expect(wrapper.find("option").length).toEqual(testOptions.length);
  });

  it("selects assigned prop", () => {
    wrapper.setProps({ selectedValue: "one" });
    expect(
      wrapper
        .render()
        .find("select [selected]")
        .text()
    ).toEqual("one");

    wrapper.setProps({ selectedValue: "seven" });
    expect(
      wrapper
        .render()
        .find("select [selected]")
        .val()
    ).toEqual("seven");
  });

  it("calls onSelect when component used", () => {
    const select = wrapper.find("StyledSelect");

    select.simulate("change");
    expect(mockOnSelect).toHaveBeenCalledTimes(1);

    select.simulate("change");
    expect(mockOnSelect).toHaveBeenCalledTimes(2);
  });
});
