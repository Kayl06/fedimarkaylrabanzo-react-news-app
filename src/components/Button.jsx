/* eslint-disable react/prop-types */
import className from "classnames";
import { GoSync } from "react-icons/go";

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  white,
  rounded,
  loading,
  ...rest
}) {
  const classes = className(
    "flex items-center py-[20px] h-8",
    {
      "opacity-80": loading,
      "border-gray-800 bg-gray-800 text-white": primary,
      "border-gray-900 bg-gray-300 text-white": secondary,
      "border-green-500 bg-green-500 text-white": success,
      "border-yellow-400 bg-yellow-400 text-white": warning,
      "border-red-500 bg-red-500 text-white": danger,
      "bg-white border-0 text-[#2D3748] text-center": white,
      "rounded-full": rounded,
      "bg-white": outline,
      "text-blue-500": outline && primary,
      "text-gray-900": outline && secondary,
      "text-green-500": outline && success,
      "text-yellow-400": outline && warning,
      "text-red-500": outline && danger,
    },
    rest.className
  );

  return (
    <button disabled={loading} {...rest} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!danger);

    if (count > 1) {
      return new Error(
        "Only one of primary, secondary, success, warning, danger can be true"
      );
    }
  },
};

export default Button;
