import BuildingSVG from "./components/BuildingSVG";
import DasboardSVG from "./components/DasboardSVG";
import DownArrowSVG from "./components/DownArrowSVG";
import UpArrowSVG from "./components/UpArrowSVG";
const SVGIcon = ({ name, ...svgProps }) => {
  switch (name) {
    case "building":
      return <BuildingSVG {...svgProps} />;
    case "downArrow":
      return <DownArrowSVG {...svgProps} />;
    case "upArrow":
      return <UpArrowSVG {...svgProps} />;
    case "dashboard":
      return <DasboardSVG {...svgProps} />;
    default:
      return <></>;
  }
};

export default SVGIcon;
