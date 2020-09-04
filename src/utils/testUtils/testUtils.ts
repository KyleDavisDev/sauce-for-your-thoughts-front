import casual from "casual";
import { ReactWrapper } from "enzyme";
import { MockLink } from "./types";

// seed it so we get consistent results
casual.seed(777);

const fakeLink = (): MockLink => ({
  text: casual.text,
  to: casual.url,
  target: casual.boolean ? "_blank" : "_self"
});

const fakeLinks = () => [fakeLink(), fakeLink(), fakeLink()];

function simulateInputChange(
  wrapper: ReactWrapper,
  name: string,
  value: string
) {
  wrapper
    .find(`input[name='${name}']`)
    .simulate("change", { target: { name, value } });
}

export { fakeLinks, simulateInputChange };
