import Header from "components/shared/header/Header";
import { SideBar } from "components/shared/sidebar/SideBar";
import { AuthState } from "context/AuthContext";
import { memo } from "react";
import { withRouter } from "react-router";

const Layout = ({ children, location, history }) => {
  return (
    <div className="min-h-screen md:flex flex-row bg-gray-100 overflow-x-hidden overflow-y-hidden">
      {AuthState.user ? <SideBar /> : <SideBar />}

      <div className="flex-1">
        <Header children={children} />
      </div>
    </div>
  );
};

export default memo(withRouter(Layout));
