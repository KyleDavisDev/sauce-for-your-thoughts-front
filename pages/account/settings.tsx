import * as React from "react";
import { Article } from "../../src/components/Article/Article";
import HeaderSimple from "../../src/components/HeaderSimple/HeaderSimple";
import PageTitle from "../../src/components/PageTitle/PageTitle";
import UserSettings from "../../src/components/UserSettings/UserSettings";

export interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = () => {
  return (
    <>
      <HeaderSimple />
      <Article size="sm">
        <PageTitle>Manage your account</PageTitle>
        <UserSettings />
      </Article>
    </>
  );
};

export default SettingsPage;
