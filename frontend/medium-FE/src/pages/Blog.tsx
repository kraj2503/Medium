import { useParams } from "react-router-dom";
// import { AppBar } from "../Components/AppBar";
import { FullBlog } from "../Components/FullBlog";
import { useBlog } from "../hooks";
import { Spinner } from "../Components/Spinner";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div className=" flex flex-col justify-center h-screen">
        <div className="flex justify-center">
         <Spinner/>
        </div>
      </div>
    );
  }
  if (!blog) {
    return <div>Blog not found</div>;
  }
  return (
    <div>
      {/* {blog.author.name} */}
      <FullBlog blog={blog} />
      {/* </div> */}
    </div>
  );
};
