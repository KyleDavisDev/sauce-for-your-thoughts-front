import * as React from "react";
import SetPassword from "../../../../src/components/SetPassword/SetPassword";
import HeaderSimple from "../../../../src/components/HeaderSimple/HeaderSimple";
import { Article } from "../../../../src/components/Article/Article";
import { useRouter } from "next/router";

export interface SetPasswordPageProps {}

const SetPasswordPage: React.SFC<SetPasswordPageProps> = () => {
  // assign router
  const router = useRouter();

  // grab jwt from router and verify
  const { jwt } = router.query;
  if (!jwt || Array.isArray(jwt)) {
    router.push("/");
    return;
  }

  return (
    <>
      <HeaderSimple />
      <Article size="sm">
        <SetPassword jwt={jwt} />
      </Article>
    </>
  );
};

export default SetPasswordPage;
