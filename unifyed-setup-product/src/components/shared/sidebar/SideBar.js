import { hamburgerIcon } from "components/shared/SVGIcon/AppIcons";
import useInvolvScreenSize from "hooks/useInvolvScreenSize";
import { useEffect, useRef, useState } from "react";
import { SidebarItems } from "./SidebarItems";
export const SideBar = () => {
  const [isSideBarVisible, setisSideBarVisible] = useState(true);
  const [toggleMobileSide, setToggleMobileSide] = useState(false);
  const wrapperRef = useRef(null);
  const [isMobile, isTabTwo] = useInvolvScreenSize();
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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setToggleMobileSide(false);
    }
  };

  const handleMobileSidebar = () => {
    setToggleMobileSide(!toggleMobileSide);
  };

  const handleSideBarVisibility = () => {
    setisSideBarVisible(!isSideBarVisible);
  };
  const navigations = [
    {
      id: 1,
      parent: null,
      name: "Dashboard",
      menuOrder: 1,
      visible: true,
      leafNode: true,
      logo: null,
      toolTip: null,
      accessComponentDTO: {
        id: 1,
        description: "Dashboard",
        componentName: "Sample",
        componentPath: "",
      },
      childItems: [],
    },
    {
      id: 3,
      parent: null,
      name: "Formss",
      menuOrder: 1,
      visible: true,
      leafNode: false,
      logo: null,
      toolTip: null,
      childItems: [
        {
          id: 4,
          parent: null,
          name: "Form",
          menuOrder: 1,
          visible: true,
          leafNode: true,
          logo: null,
          toolTip: null,
          accessComponentDTO: {
            id: 1,
            description: "Form",
            componentName: "Form",
            componentPath: "home",
          },
          childItems: [],
        },
        {
          id: 5,
          parent: null,
          name: "Samole Form",
          menuOrder: 1,
          visible: true,
          leafNode: true,
          logo: null,
          toolTip: null,
          accessComponentDTO: {
            id: 1,
            description: "SampleForm",
            componentName: "SampleForm",
            componentPath: "form",
          },
          childItems: [],
        },
      ],
    },
    {
      id: 2,
      parent: null,
      name: "Settings",
      menuOrder: 1,
      visible: true,
      leafNode: true,
      logo: null,
      toolTip: null,
      accessComponentDTO: {
        id: 1,
        description: "Settings",
        componentName: "Sample",
        componentPath: "/testt",
      },
      childItems: [],
    },
  ];

  if (isMobile || isTabTwo) {
    return (
      <div className="mobile bg-white z-[100]" ref={wrapperRef}>
        <div
          className={
            !sticky
              ? "flex fixed top-0 left-0 z-50 pt-4 pl-4 xl:hidden items-center transition-all duration-700 ease-in-out"
              : "flex fixed top-0 left-0 z-[100] pt-4 pl-4 xl:hidden items-center transition-all duration-700 ease-in-out"
          }
        >
          <div
            className="h-5 w-5 2xl:h-7 2xl:w-7 cursor-pointer mr-3"
            onClick={handleMobileSidebar}
          >
            {hamburgerIcon}
          </div>
        </div>
        {toggleMobileSide && (
          <div
            className={
              !sticky
                ? "flex-1 absolute left-0 top-[55px] bg-white h-full z-20 transition-all duration-700 ease-in-out shadow-md"
                : "flex-1 fixed top-[55px] left-0 bg-white z-30 h-full  transition-all duration-700 ease-in-out shadow-md"
            }
          >
            <div className="px-3 mt-6 h-2/3 overflow-y-auto">
              <div className="space-y-2 relative ">
                <div className="pt-2 pb-4 space-y-1 text-sm">
                  {navigations.map((menuItem) => (
                    <SidebarItems
                      key={menuItem.name}
                      item={menuItem}
                      isSideBarVisible={isSideBarVisible}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-full">
      <div
        className={`${
          isSideBarVisible
            ? "absolute left-0 top-[90px] xl:relative xl:block w-[240px] 2xl:w-300"
            : "w-28 z-30"
        }  bg-white overflow-hidden transition-all h-full ease-out z-30`}
      >
        <div
          className={`fixed top-0 left-0  bg-white z-30 h-full border-r shadow-r  ${
            isSideBarVisible ? "w-[250px] 2xl:w-300" : "w-28"
          } `}
        >
          <div className="md:flex flex-col h-full">
            <div
              onClick={handleSideBarVisibility}
              className="h-20 border-b border-gray-200 flex items-center justify-around pl-0 flex-row-reverse sm:flex-row sm:justify-center md:justify-around flex-shrink-0 px-3 py-3 2xl:px-4 2xl:py-4 z-30 cursor-pointer"
            >
              <div className="h-4 w-5 2xl:h-7 2xl:w-7 cursor-pointer">
                {hamburgerIcon}
              </div>
            </div>
            <div className="flex-1">
              <div className="px-3 mt-6 h-2/3 overflow-y-auto">
                <div className="space-y-2 relative ">
                  <div className="pt-2 pb-4 space-y-1 text-sm">
                    {navigations.map((menuItem) => (
                      <SidebarItems
                        key={menuItem.name}
                        item={menuItem}
                        isSideBarVisible={isSideBarVisible}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
