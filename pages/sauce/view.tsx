import * as React from "react";

import Sauces from "../../src/components/Sauces/Sauces";

interface IViewPageProps {}

const ViewPage: React.FunctionComponent<IViewPageProps> = props => {
  return <Sauces />;
};

export default ViewPage;
