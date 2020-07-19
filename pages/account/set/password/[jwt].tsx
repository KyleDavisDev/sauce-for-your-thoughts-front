import * as React from "react";
import SetPassword from "../../../../src/components/SetPassword/SetPassword";
import HeaderSimple from "../../../../src/components/HeaderSimple/HeaderSimple";
import { Article } from "../../../../src/components/Article/Article";
import { useRouter } from "next/router";

export interface SetPasswordPageProps {}

const SetPasswordPage: React.SFC<SetPasswordPageProps> = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <>
      <HeaderSimple />
      <Article size="sm">
        <SetPassword />
      </Article>
    </>
  );
};

export default SetPasswordPage;
