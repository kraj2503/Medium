import { Blog } from "../hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./Avatar";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center lg:pl-20">
        <div className="grid sm:grid-cols-1 lg:grid-cols-12 px-10  max-w-screen-2xl">
          <div className="col-span-1 lg:col-span-9  ">
            <div className="text-5xl font-extrabold pt-12 ">{blog.title}</div>
            <div className="text-slate-400 text-sm pt-3">
              Posted on 21 JULY 2024
            </div>
            <div className="pt-5">{blog.body}</div>
            <div className="max-w-screen-2xl border-b-2 py-2"></div>
          </div>
          <div className="  col-span-3 ">
            <div className="pt-10 pb-2 text-slate-600 text-md">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex justify-center flex-col">
                <Avatar type={"big"} name={blog.author.name} />
              </div>
              <div>
                <div className="text-xl font-bold pb-2">
                  {blog.author.name || "anonymous"}
                </div>
                <div className="text-slate-400 ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
