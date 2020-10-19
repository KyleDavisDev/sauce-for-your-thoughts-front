import * as React from "react";

import Title from "../Title/Title";
import Item from "../Item/Item";

export interface AdminProps {}

const Admin: React.FC<AdminProps> = props => {
  return (
    <>
      <Title>Admin</Title>
      <Item to="/admin/approvesaucesubmissions">Approve Submissions</Item>
    </>
  );
};

export default Admin;
