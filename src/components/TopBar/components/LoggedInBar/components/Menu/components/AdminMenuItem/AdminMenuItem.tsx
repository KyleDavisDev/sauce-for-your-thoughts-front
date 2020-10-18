import * as React from "react";
import styled from "styled-components";

import Title from "../Title/Title";
import Item from "../Item/Item";

const StyledTitle = styled(Title)`
  padding-bottom: 0px;
`;

export interface AdminMenuItemProps {}

class AdminMenuItem extends React.PureComponent<AdminMenuItemProps, any> {
  public render() {
    return (
      <div>
        <StyledTitle>Admin</StyledTitle>
        <Item to="/admin/approvesaucesubmissions">Approve Submissions</Item>
      </div>
    );
  }
}

export default AdminMenuItem;
