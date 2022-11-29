const DownArrowSVG = ({ width, height, fill, id = "downArrow-icon" }) => (
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
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

DownArrowSVG.defaultProps = {
  height: "18",
  width: "20",
  fill: "#2c3652",
};

export default DownArrowSVG;
