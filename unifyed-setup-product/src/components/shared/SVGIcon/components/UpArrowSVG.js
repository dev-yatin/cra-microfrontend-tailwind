const UpArrowSVG = ({ width, height, fill, id = "upArrow-icon" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke={fill}
    className="w-6 h-6"
    width={width}
    height={height}
    id={id}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 15.75l7.5-7.5 7.5 7.5"
    />
  </svg>
);

UpArrowSVG.defaultProps = {
  height: "18",
  width: "20",
  fill: "#2c3652",
};

export default UpArrowSVG;
