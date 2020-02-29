import * as React from "react";
import UserSettings from "../../src/components/UserSettings/UserSettings";

export interface SettingsPageProps {}

const SettingsPage: React.SFC<SettingsPageProps> = () => {
  return <UserSettings />;
};

export default SettingsPage;
