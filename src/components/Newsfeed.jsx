import CardItem from "../components/CardItem";

function Newsfeed({ data }) {
  let content;

  content = data.articles.map((article, i) => {
    return <CardItem key={i} news={article} />;
  });

  return (
    <div className="flex flex-wrap justify-center  lg:justify-start items-center gap-10">
      {content}
    </div>
  );
}

export default Newsfeed;
