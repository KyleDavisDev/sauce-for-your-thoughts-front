import * as React from "react";

import Sauces from "../src/components/Sauces/Sauces";

interface ISaucesPageProps {}

const SaucesPage: React.FunctionComponent<ISaucesPageProps> = props => {
  return <Sauces />;
};

export default SaucesPage;
