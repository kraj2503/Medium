import { AppBar } from "../Components/AppBar";
import { BlogCard } from "../Components/BlogsCard";
import { Skeleton } from "../Components/Skeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <div>
          <AppBar />
        </div>
        <div>
          <div className=" flex justify-center pr-72 ">
            <div className="border-b border-slate-400 pb-2 pr-36 pt-10 max-w-screen-lg ">
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <AppBar />
      <div className="flex justify-center pr-72  ">
        <div className=" ">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.body}
              publishedDate="20-July-2024"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
