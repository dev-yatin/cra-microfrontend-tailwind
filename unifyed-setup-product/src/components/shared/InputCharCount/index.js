/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";

/**
 *
 * @param {*} param0
 * @returns a character count label
 */
const InputCharCount = ({ children, maxLimit, initialCount, ...props }) => {
  const [charCount, setCharCount] = useState(initialCount || 0);
  const [showCharCount, setShowCharCount] = useState(false);
  const onCharCountChange = (inputCharCount) => {
    setCharCount(inputCharCount || 0);
  };

  return (
    <>
      {children(onCharCountChange, setShowCharCount)}
      {showCharCount && (
        <div
          className="flex justify-center items-center absolute"
          style={{
            right: props.right ? props.right : "10px",
            top: props.top ? props.top : "9px",
            bottom: props.bottom ? props.bottom : "unset",
          }}
        >
          <div className="rounded bg-green-500 text-sm text-white py-[1px] px-[5px] ">
            {charCount} / {maxLimit}
          </div>
        </div>
      )}
    </>
  );
};

export default InputCharCount;
