import BuildingSVG from "./components/BuildingSVG";

const SVGIcon = ({ name, ...svgProps }) => {
  switch (name) {
    case "building":
      return <BuildingSVG {...svgProps} />;
    default:
      return <></>;
  }
};

export default SVGIcon;
