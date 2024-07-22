import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useGetName } from "../hooks";
import Logout from "./Logout";

export const AppBar = () => {
  const { authName } = useGetName();
  return (
    <div className="border-b flex justify-between px-5 lg:px-10 py-1 pt-2">
      <Link
        to={"/blogs"}
        className="flex justify-center flex-col cursor-pointer text-xl text-zinc-500 font-serif font-extrabold" 
      >
        BlogIt
      </Link>
      <div className="flex">
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            New
          </button>
        </Link>
        <Avatar name={authName} type={"big"} />
        <div className="pl-2">
          <Logout />
        </div>
      </div>
    </div>
  );
};
