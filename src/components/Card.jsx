/* eslint-disable react/prop-types */
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import Button from "./Button";

function Card({ data }) {
  const { title, description, content, author, publishedAt, url, urlToImage } =
    data;

  return (
    <>
      <div className="flex flex-wrap justify-center lg:justify-start lg:flex-col gap-5">
        <div className="__card flex flex-col shadow-lg rounded-[20px] w-[350px] max-h-[500px] overflow-auto h-[450px]">
          <div className="__header">
            <a href={url} target="__blank">
              <img
                src={urlToImage}
                alt="image-news"
                className="w-full h-[170px] rounded-t-xl "
              />
            </a>
          </div>

          <div className="__body p-5 flex flex-col justify-between h-full">
            <div>
              <div className="__title mb-5 uppercase ">
                <h1 className="font-bold text-sm truncate mb-1" title={title}>
                  {title}
                </h1>

                <span className="text-xs text-gray-400 border-none">
                  <span className="font-bold leading-none">By: {author}</span>
                  <br />
                  {new Date(publishedAt).toLocaleString()}
                </span>
              </div>

              <div className="__description">
                <p className="text-gray-400 text-sm font-normal" title="">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <Link to={url}>
                <Button className="border-0 text-[14px] text-gray-700 hover:text-gray-500 font-medium flex items-center px-0">
                  <span>Read more</span>
                  <HiArrowNarrowRight className="ml-2 text-xl" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
