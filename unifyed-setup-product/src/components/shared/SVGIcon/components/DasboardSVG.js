const DasboardSVG = ({ width, height, fill, id = "dashboard-icon" }) => (
  <svg
    id={id}
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill={fill}
  >
    <path
      id="Path_23178"
      style={{ fill: "none" }}
      d="M-2.3-1.9h24v24h-24V-1.9z"
    />
    <path
      id="Path_23179"
      fill={fill}
      d="M10,0c5.5,0,10,4.5,10,10s-4.5,10-10,10S0,15.5,0,10S4.5,0,10,0z M10,3c-3.9,0-7,3.1-7,7
  c0,1.8,0.7,3.5,1.9,4.8l0.2,0.2l1.4-1.4c-2-2-2-5.1,0-7.1c1.3-1.3,3.1-1.8,4.8-1.3l1.6-1.6C12,3.2,11,3,10,3z M16.4,7.1l-1.6,1.6
  c0.5,1.7,0,3.6-1.3,4.8L15,15C17,12.9,17.6,9.8,16.4,7.1z M14.2,4.3l-3.7,3.7C9.4,7.8,8.4,8.4,8.1,9.5c-0.3,1.1,0.3,2.2,1.4,2.4
  c1.1,0.3,2.2-0.3,2.4-1.4c0.1-0.3,0.1-0.7,0-1l3.7-3.7L14.2,4.3L14.2,4.3z"
    />
  </svg>
);

DasboardSVG.defaultProps = {
  height: "20",
  width: "30",
  fill: "currentColor",
};

export default DasboardSVG;
