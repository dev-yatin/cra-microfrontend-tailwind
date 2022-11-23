import SVGIcon from "components/shared/SVGIcon";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip";

export const SidebarItems = ({ item, isSideBarVisible }) => {
  // eslint-disable-next-line autofix/no-unused-vars
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const isActive =
    (!!item?.accessComponentDTO?.componentPath &&
      pathname.includes(item?.accessComponentDTO?.componentPath)) ||
    (item.leafNode &&
      !item?.accessComponentDTO?.componentPath &&
      pathname === "/");

  const handleClick = () => {
    if (!item.leafNode) {
      if (!open) {
        setOpen(true);
      } else if (!!open) {
        setOpen(false);
      }
    } else {
      history.push(`/${item?.accessComponentDTO?.componentPath}`);
    }
  };

  const content = (
    <div
      className={`${
        isActive
          ? " text-indigo-900 bg-indigo-50"
          : "text-grey-600 hover:bg-indigo-50 transition-all duration-150 ease-in-out "
      }
    flex items-center  ${
      !isSideBarVisible ? "justify-center" : "justify-between"
    } py-4 px-4 text-sm rounded-md h-11 md:h-14 group `}
      onClick={() => handleClick()}
    >
      <div className="flex items-center justify-between space-x-4 w-full">
        <div className="flex items-center">
          <div data-tip={item.name}>
            <SVGIcon id={`${item.logo}-collapse-icon`} name="dashboard" />
          </div>
          {!isSideBarVisible && (
            <ReactTooltip place="bottom" type="dark" effect="solid" />
          )}{" "}
          {isSideBarVisible && (
            <span className="truncate text-base font-normal">{item.name}</span>
          )}{" "}
        </div>
        <div className="flex items-center justify-emd">
          {!item.leafNode &&
            item.childItems.length > 0 &&
            (open ? (
              <SVGIcon id={`${item.logo}-collapse-icon`} name="upArrow" />
            ) : (
              <SVGIcon id={`${item.logo}-expand-icon`} name="downArrow" />
            ))}
        </div>
      </div>
      {isActive && isSideBarVisible && (
        <div className="flex justify-end w-full">
          <div className=" rounded-lg bg-indigo-900 border-indigo-900">
            &nbsp;
          </div>
        </div>
      )}
    </div>
  );
  return (
    <>
      {item.visible && content}
      {open &&
        item.childItems.length > 0 &&
        item.childItems.map((menuItem) => {
          return (
            <SidebarItems
              key={menuItem.name}
              item={menuItem}
              isSideBarVisible={isSideBarVisible}
            />
          );
        })}
    </>
  );
};
