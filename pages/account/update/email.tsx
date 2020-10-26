import * as React from "react";
import UpdateEmail from "../../../src/components/UpdateEmail/UpdateEmail";
import HeaderSimple from "../../../src/components/HeaderSimple/HeaderSimple";
import { Article } from "../../../src/components/Article/Article";

export interface EmailPageProps {}

const EmailPage: React.FC<EmailPageProps> = () => {
  return (
    <>
      <HeaderSimple />
      <Article size="sm">
        <UpdateEmail />
      </Article>
    </>
  );
};

export default EmailPage;
