import * as React from "react";
import * as enzyme from "enzyme";
import DropDown from "./DropDown";

describe("<DropDown>", () => {
  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    // Grab the value
    // const selectedValue: string = event.target.value;
  };

  const options = ["one", "two", "three", "seven", "ten"];

  it("renders", () => {
    const wrapper = enzyme.shallow(
      <DropDown options={options} onSelect={onSelect} />
    );
    expect(wrapper).toBeTruthy();
  });

  it("renders correct number of options", () => {
    const testOptions = options;

    const wrapper = enzyme.shallow(
      <DropDown options={testOptions} onSelect={onSelect} />
    );
    expect(wrapper.find("option").length).toEqual(testOptions.length);

    // Add some more options
    testOptions.concat("1", "2", "1", "");
    wrapper.setProps({ options: testOptions });
    expect(wrapper.find("option").length).toEqual(testOptions.length);
  });

  it("renders correct options", () => {
    // const wrapper;
  });
});
