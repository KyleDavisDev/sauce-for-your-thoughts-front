import * as React from "react";
import * as enzyme from "enzyme";
import { TextInput } from "./TextInput";

describe("<TextInput />", () => {
  const onChange = jest.fn();
  const wrapper = enzyme.shallow(<TextInput onChange={onChange} />);

  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });

  it("defaults to rendering single input", () => {
    expect(wrapper.find("StyledInput").length).toEqual(1);
  });
});
