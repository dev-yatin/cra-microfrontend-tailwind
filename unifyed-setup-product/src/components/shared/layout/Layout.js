import InvolvTenantHeader from "components/shared/header/InvolvTenantHeader";
import InvolvTenantSidebar from "components/shared/sidebar/InvolvTenantSidebar";
import { memo } from "react";
import { withRouter } from "react-router";

const Layout = ({ children }) => (
  <div className="min-h-screen md:flex flex-row bg-gray-100 overflow-x-hidden overflow-y-hidden">
    <InvolvTenantSidebar />
    <div className="flex-1">
      <InvolvTenantHeader children={children} />
    </div>
  </div>
);

export default memo(withRouter(Layout));
