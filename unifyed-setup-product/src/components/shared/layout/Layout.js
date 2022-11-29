import InvolvTenantHeader from "components/shared/header/InvolvTenantHeader";
import { SideBar } from "components/shared/sidebar/SideBar";
import { AuthState } from "context/AuthContext";
import { memo, useEffect, useState } from "react";
import { withRouter } from "react-router";
const Layout = ({ children, location, history }) => {
  let pathname = location.pathname;
  const [breadcrumbPathname, setBreadcrumbPathname] = useState(pathname);
  const setBreadcrumb = (pathname) => {
    const formPaths = ["/edit/", "/view/"];
    let bcPath = pathname;
    const formPathInBreadcrumb = formPaths.filter((path) =>
      bcPath.includes(path)
    );
    if (formPathInBreadcrumb.length > 0) {
      bcPath = bcPath.substring(0, bcPath.lastIndexOf("/"));
    }
    if (bcPath !== "/" && bcPath.endsWith("/")) {
      bcPath = bcPath.substring(0, bcPath.lastIndexOf("/"));
    }
    setBreadcrumbPathname(bcPath);
  };

  useEffect(() => {
    const unlisten = history.listen((location) => {
      // location is an object like window.location
      setBreadcrumb(location.pathname);
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <div className="min-h-screen md:flex flex-row bg-gray-100 overflow-x-hidden overflow-y-hidden">
      {AuthState.user ? <SideBar /> : <SideBar />}

      <div className="flex-1">
        <InvolvTenantHeader
          children={children}
          breadcrumbPathname={breadcrumbPathname}
        />
      </div>
    </div>
  );
};

export default memo(withRouter(Layout));
