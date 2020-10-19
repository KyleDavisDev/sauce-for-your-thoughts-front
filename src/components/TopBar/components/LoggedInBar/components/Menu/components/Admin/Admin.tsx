import * as React from "react";

import Title from "../Title/Title";
import Item from "../Item/Item";

export interface AdminProps {}

class Admin extends React.PureComponent<AdminProps, any> {
  public render() {
    return (
      <div>
        <Title>Admin</Title>
        <Item to="/admin/approvesaucesubmissions">Approve Submissions</Item>
      </div>
    );
  }
}

export default Admin;
