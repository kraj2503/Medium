import { SigninInput, SignupInput } from "@kshitizraj/common";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { LabelInput } from "./LabelInput";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const State: SignupInput | SigninInput =
    type === "signup"
      ? { email: "", name: "", password: "" ,about:""}
      : { email: "", password: "" };

  const [postInputs, setPostinput] = useState<typeof State>(State);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function sendRequest() {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const { token } = response.data;
      console.log(token);
      localStorage.setItem("token", "Bearer " + token);
      navigate("/blogs");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/auth`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        if (response.status === 200) {
          setLoading(false);
          navigate("/blogs");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
        setLoading(false);
        
      }
    }

    fetchData();
  }, []);

  return (
    <div className="h-screen  flex justify-center flex-col ">
      <div className="flex justify-center">
        <div className="  w-4/5 lg:w-3/5">
          <div className=" lg:px-10 ">
            <div className="text-3xl font-extrabold text-center ">
              {type === "signup" ? "Create an account" : "Welcome Back, Login"}
            </div>
            <div className="flex justify-center pb-3">

            <div className="text-slate-400 ">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an Account?"}
              <Link
                className="pl-2 underline"
                to={type === "signup" ? "/signin" : "/signup"}
              >
                {type === "signup" ? "Log in" : "Signup"}
              </Link>
            </div>
            </div>
          </div>
          <div>
            <div className={`${type == "signup" ? "" : "hidden"}`}>
              <LabelInput
                label={"Name"}
                placeholder={"John Davis"}
                onChange={(e) => {
                  setPostinput({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
              <LabelInput
                label={"About"}
                placeholder={"About Yourself"}
                onChange={(e) => {
                  setPostinput({
                    ...postInputs,
                    about: e.target.value,
                  });
                }}
              />
            </div>
            <LabelInput
              label={"Email"}
              placeholder={"Johndavis@gmail.com"}
              onChange={(e) => {
                setPostinput({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />

            <LabelInput
              label={"Password"}
              placeholder={"Password"}
              type={"password"}
              onChange={(e) => {
                setPostinput({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <div>
              <div className="flex justify-center h-4">
                {error && (
                  <div className="text-red-500 text-sm pt-1 ">{error}</div>
                )}
              </div>
              <button
                type="button"
                onClick={sendRequest}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 mt-5 w-full click:bg-black"
              >
                {loading ? (
                  <Spinner />
                ) : type === "signup" ? (
                  "Signup"
                ) : (
                  "Signin"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Spinner() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="inline w-6 h-6 text-gray-200 animate-spin  fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
