import { AppBar } from "../Components/AppBar";
import { BlogCard } from "../Components/BlogsCard";
import { DateFormat } from "../Components/DateFormat";
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
          <div className=" flex justify-center pl-10 lg:pr-72 ">
            <div className="border-b px-2 border-slate-400 pb-2 lg:pr-36 pt-10 max-w-screen-lg ">
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
      <div className="flex justify-center lg:pr-72  px-3 ">
        <div className=" ">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.body}
              publishedDate={DateFormat(blog.createdAt)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
