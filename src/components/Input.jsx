/* eslint-disable react/prop-types */
import classNames from "classnames";

function Input({ value, placeholder, ...rest }) {
  const classes = classNames(
    rest.className,
    "mt-1  bg-white border-[1px] border-[#E2E8F0] text-[14px] placeholder-[#A0AEC0] placeholder:font-[400] focus:outline-none block w-full h-[50px] focus:ring-1",
  );
  return (
    <input
      {...rest}
      className={classes}
      value={value}
      placeholder={placeholder}
    />
  );
}

export default Input;
