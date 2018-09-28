import * as React from "react";
import * as enzyme from "enzyme";
import DropDown from "./DropDown";

describe("<DropDown>", () => {
  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>): string => {
    // Grab the value
    return event.target.value;
  };

  const options = ["one", "two", "three", "seven", "ten"];
  const wrapper = enzyme.shallow(
    <DropDown options={options} onSelect={onSelect} />
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
});
