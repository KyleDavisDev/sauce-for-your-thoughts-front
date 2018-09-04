import * as React from "react";

import { TextInput } from "../../components/TextInput/TextInput";

const Home = ({}) => (
  <h1>
    Hello from world!!
    <TextInput
      id={"5"}
      name={"this is a test"}
      value={"this shows up in input"}
      title={"Title"}
      onChange={() => {
        console.log("hi");
      }}
      parentRef={() => {
        console.log("hi");
      }}
    />
  </h1>
);

export default Home;
