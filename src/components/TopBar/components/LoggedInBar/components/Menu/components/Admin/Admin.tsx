import * as React from "react";

import Title from "../Title/Title";
import Item from "../Item/Item";

export interface AdminMenuItemProps {}

class AdminMenuItem extends React.PureComponent<AdminMenuItemProps, any> {
  public render() {
    return (
      <div>
        <Title>Admin</Title>
        <Item to="/admin/approvesaucesubmissions">Approve Submissions</Item>
      </div>
    );
  }
}

export default AdminMenuItem;
