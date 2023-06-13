/* eslint-disable react/prop-types */
import classNames from "classnames";
import { useEffect } from "react";
import { useState } from "react";
import {
  IoTvOutline,
  IoGitBranchOutline,
  IoHeartOutline,
  IoBasketball,
  IoSettingsOutline,
  IoEarthOutline,
  IoBriefcaseOutline,
} from "react-icons/io5";
import { useFetchCategoriesQuery } from "../store";

function PreferenceItems({ className, selected, onChange }) {
  const [userCategories, setUserCategories] = useState([]);

  const { data: categories, error, isFetching } = useFetchCategoriesQuery();
  
  useEffect(() => {
    if (selected) {
      setUserCategories(selected);
    }
  }, []);

  const handleChooseCategory = (category) => {
    if (userCategories.includes(category)) {
      const updatedItems = userCategories.filter((id) => id !== category);

      setUserCategories(updatedItems);
      onChange(updatedItems);
      return;
    }

    if (userCategories.length >= 3) {
      alert("Maximum number of categories");
      return;
    }

    setUserCategories([...userCategories, category]);
    onChange([...userCategories, category]);
  };

  const catIcons = [
    {
      1: <IoBriefcaseOutline className="text-[22px]" />,
      2: <IoTvOutline className="text-[22px]" />,
      3: <IoSettingsOutline className="text-[22px]" />,
      4: <IoHeartOutline className="text-[22px]" />,
      5: <IoEarthOutline className="text-[22px]" />,
      6: <IoBasketball className="text-[22px]" />,
      7: <IoGitBranchOutline className="text-[22px]" />,
    },
  ];

  let content;

  if (isFetching) {
    content = <div>Please wait...</div>;
  } else if (error) {
    content = <div>Error fetchin data...</div>;
  } else {
    content = categories.map((category, idx) => {
      idx += 1;

      const isSelected = userCategories.includes(category);

      return (
        <div
          key={idx}
          className={`__item cursor-pointer  text-gray-900 p-3 text-[12px] w-[200px] text-center rounded-full hover:bg-black hover:text-white items-center flex gap-2 justify-center ${
            isSelected ? "bg-gray-900 text-white" : "bg-slate-200"
          }`}
          onClick={() => handleChooseCategory(category)}
        >
          <div className="__icon">{catIcons[0][idx]}</div>

          <span className="uppercase font-normal tracking-wide">
            {category}
          </span>
        </div>
      );
    });
  }

  const classes = classNames(
    "__category_items flex flex-wrap items-center",
    className
  );
  return (
    <>
      <div className={classes}>{content}</div>
    </>
  );
}

export default PreferenceItems;
