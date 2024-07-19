import { SigninInput, SignupInput } from "@kshitizraj/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const State: SignupInput | SigninInput =
    type === "signup"
      ? { email: "", name: "", password: "" }
      : { email: "", password: "" };

  const [postInputs, setPostinput] = useState<typeof State>(State);

  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col ">
      <div className="flex justify-center">
        <div className="">
          <div className="px-10">
            <div className="text-3xl font-extrabold ">
              {type === "signup" ? "Create an account" : "Welcome Back, Login"}
            </div>
            <div className="text-slate-400 pl-2 pb-2">
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
              <button
                type="button" onClick={sendRequest}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 mt-5 w-full click:bg-black"
              >
                {type === "signup" ? "Signup" : "Signin"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  auth?: string;
}

function LabelInput({ label, placeholder, onChange, type }: LabelledInputType) {
  return (
    <div className="auth">
      <label className="block mb-1 mt-1 text-sm font-medium text-black">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type ? type : "text"}
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
