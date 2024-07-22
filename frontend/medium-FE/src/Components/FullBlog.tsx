import { Blog } from "../hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./Avatar";
import { DateFormat } from "./DateFormat";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const date = DateFormat(blog.createdAt);
  return (
    <div>
      <AppBar />
      {/* <div className="flex justify-center lg:pl-20 bg-slate-800"> */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-12 px-6 max-w-screen-2xl ">
          <div className=" col-span-1  border-r pr-4 border-b mb-6 shadow hover:shadow-2xl lg:col-span-9 lg:mr-5 lg:ml-5 pl-4 lg:pl-8 mt-5 ">
            <div className=" text-3xl underline md:text-4xl lg:text-5xl font-extrabold pt-12 ">{blog.title}</div>
            <div className="text-slate-400 text-md pt-3">Created on {date}</div>
            <div className="pt-5">{blog.body}</div>
            <div className="max-w-screen-2xl  py-2 mb-5"></div>
          </div>
          <div className=" col-span-1 lg:col-span-3  min-h-54 mb-8  pl-7  ">
            <div className=" lg:pt-10 mt-5  pb-2 text-slate-600 text-md">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex justify-center flex-col ">
                <Avatar type={"big"} name={blog.author.name} />
              </div>
              <div>
                <div className="text-xl font-bold pb-2">
                  {blog.author.name || "anonymous"}
                </div>
                <div className="text-slate-400  h-fit ">{blog.author.about||"Anonymous"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};
