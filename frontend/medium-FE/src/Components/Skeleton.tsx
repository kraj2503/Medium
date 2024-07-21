import { Circle } from "./BlogsCard";

export const Skeleton = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse  mb-2">
      <div className="border-b border-slate-400  pr-80 max-w-screen-lg cursor-pointer">
        <div className="flex">
          <div className="">
            <div className="h-6 w-6 bg-gray-200 rounded-full   mb-3"></div>
          </div>
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            <div className="h-3 w-14 bg-gray-200 rounded-full  mb-2.5"></div>
            {/* {authorName} */}
          </div>
          <div className="pl-1 flex justify-center flex-col">
            <Circle />
          </div>
          <div className="font-thin pl-1 text-slate-500 text-sm flex justify-center flex-col">
            <div className="h-3 w-20 bg-gray-200 rounded-full  mb-2.5"></div>
            {/* {publishedDate} */}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">
          <div className="h-4  bg-gray-200 rounded-full max-w-36  mb-3"></div>
        </div>
        <div className="text-md font-thin">
          {/* {content.slice(0, 100) + `${content.length > 100 ? "..." : ""}`} */}
          <div className="h-2 bg-gray-200 rounded-full  max-w-44 mb-2 "></div>
          <div className="h-2 bg-gray-200 rounded-full  max-w-72  mb-3"></div>
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
          <div className="h-2 bg-gray-200 rounded-full  max-w-14 mb-2.5"></div>
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
