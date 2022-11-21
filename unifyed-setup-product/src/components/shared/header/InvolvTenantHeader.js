import { useEffect, useState } from "react";

// import { useAuth } from "../../services/api/context/authContext/AuthContext";
// import LoggedInMenu from "./InvolveLoginMenu";

// import { AuthService } from "../../services/api/auth/AuthService";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function InvolvTenantHeader({ children }) {
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

  return (
    <main className="flex flex-col bg-gray-100 h-full ">
      <div
        className={
          "fixed top-0 bg-white border-b border-gray-200 px-3 py-3 2xl:px-4 2xl:py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 w-full left-0 z-19 h-20"
        }
      >
        {/* <LoggedInMenu userProfile={userProfile} logout={logout} /> */}
      </div>
      <div className="p-5 bg-gray-100 flex-1 mt-20">{children}</div>
    </main>
  );
}
