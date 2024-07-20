import { BlogCard } from "../Components/BlogsCard";

export const Blogs = () => {
  return (
    <div className="flex justify-center ">

    <div className="max-w-xl">
      <BlogCard
        authorName={"Kshitiz "}
        title={"loremipsum dolor sit amet"}
        content={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae voluptates, omnis ducimus consectetur aspernatur perspiciatis exercitationem quis, illo dicta ciis exercitationem quis dolorum, voluptatem laudantium atque, est consectetur cupiditate quisquam harum unde et aliquam error doloremque quia fugit impedit"
        }
        publishedDate="20-July-2024"
        />
      <BlogCard
        authorName={"Kshitiz"}
        title={"lorem ipsum dolor sit amet"}
        content={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae voluptates, omnis ducimus consectetur aspernatur perspiciatis exercitationem quis, illo dicta ciis exercitationem quis dolorum, voluptatem laudantium atque, est consectetur cupiditate quisquam harum unde et aliquam error doloremque quia fugit impedit"
        }
        publishedDate="20-July-2024"
        />
      <BlogCard
        authorName={"Kshitiz"}
        title={"lorem"}
        content={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae voluptates, omnis ducimus consectetur aspernatur perspiciatis exercitationem quis, illo dicta ciis exercitationem quis dolorum, voluptatem laudantium atque, est consectetur cupiditate quisquam harum unde et aliquam error doloremque quia fugit impedit"
        }
        publishedDate="20-July-2024"
        />
    </div>
        </div>
  );
};
