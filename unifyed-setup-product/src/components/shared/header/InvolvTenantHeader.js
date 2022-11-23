import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import { useAuth } from "../../services/api/context/authContext/AuthContext";
// import LoggedInMenu from "./InvolveLoginMenu";

// import { AuthService } from "../../services/api/auth/AuthService";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function InvolvTenantHeader({ children, breadcrumbPathname }) {
  const [sticky, setSticky] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFixed = () => {
    if (window.scrollY > 0) {
      setSticky(!sticky);
    } else {
      setSticky(sticky);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleFixed);
    return () => {
      window.removeEventListener("scroll", handleFixed);
    };
  }, [handleFixed]);

  // const { userProfile, logout } = useAuth();
  const splitBreadcrumb = breadcrumbPathname.split("/");

  return (
    <main className="flex flex-col bg-gray-100 h-full ">
      <div
        className={
          "fixed top-0 bg-white border-b border-gray-200 px-3 py-3 2xl:px-4 2xl:py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 w-full left-0 z-19 h-20"
        }
      >
        {/* <LoggedInMenu userProfile={userProfile} logout={logout} /> */}
      </div>
      <div className="p-5 bg-gray-100 flex-1 mt-20">
        <div>
          {splitBreadcrumb.map((module, index) => {
            let breadcrumbItem = <></>;
            if (module === "" && index === 0) {
              breadcrumbItem =
                breadcrumbPathname !== "/" ? (
                  <div>
                    <Link to="/">Dashboard</Link>
                  </div>
                ) : (
                  <div>Dashboard</div>
                );
            } else if (module !== "" && index < splitBreadcrumb.length - 1) {
              breadcrumbItem = (
                <div>
                  <Link
                    to={`${splitBreadcrumb.slice(0, index + 1).join("/")}`}
                  >{`${module.charAt(0).toUpperCase()}${module.substring(
                    1
                  )}`}</Link>
                </div>
              );
            } else if (module !== "" && index === splitBreadcrumb.length - 1) {
              breadcrumbItem = (
                <div>{`${module.charAt(0).toUpperCase()}${module.substring(
                  1
                )}`}</div>
              );
            }
            if (
              splitBreadcrumb.length > 1 &&
              breadcrumbPathname !== "/" &&
              index < splitBreadcrumb.length - 1
            ) {
              return (
                <>
                  {" "}
                  {breadcrumbItem} {">"}
                </>
              );
            }
            return breadcrumbItem;
          })}
        </div>
        <div>{children}</div>
      </div>
    </main>
  );
}
