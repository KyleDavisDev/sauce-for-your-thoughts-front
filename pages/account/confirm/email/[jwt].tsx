import * as React from "react";
import { useRouter } from "next/router";
import ConfirmEmail from "../../../../src/components/ConfirmEmail/ConfirmEmail";

export interface ConfirmEmailPageProps {}

const ConfirmEmailPage: React.SFC<ConfirmEmailPageProps> = () => {
  const router = useRouter();
  const { jwt } = router.query;

  return <ConfirmEmail jwt={jwt} />;
};

export default ConfirmEmailPage;
