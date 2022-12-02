import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoggedInMenu from "./LoggedInMenu";

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
          "fixed top-0 bg-white border-b border-gray-200 px-3 py-3 2xl:px-4 2xl:py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 w-full left-0 h-20 z-10"
        }
      >
        <LoggedInMenu userProfile={{ fullName: "shubham" }} logout={() => {}} />
      </div>
      <div className="p-5 bg-gray-100 flex-1 mt-20">
        <div className="mb-5 flex items-center justify-end ">
          {splitBreadcrumb.map((module, index) => {
            let breadcrumbItem = <></>;
            if (module === "" && index === 0) {
              breadcrumbItem =
                breadcrumbPathname !== "/" ? (
                  <div className="text-indigo-800">
                    <Link to="/">Dashboard</Link>
                  </div>
                ) : (
                  <div>Dashboard</div>
                );
            } else if (module !== "" && index < splitBreadcrumb.length - 1) {
              breadcrumbItem = (
                <div className="text-indigo-800">
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
                  {breadcrumbItem} &nbsp;{`>`} &nbsp;
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
