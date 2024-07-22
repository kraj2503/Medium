import axios from "axios";
import { AppBar } from "../Components/AppBar";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const Publish: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [PublishButton, setHandleButton] = useState(false);
  const navigte = useNavigate();
  const handlePublish = async () => {
    if (!title.trim()) {
      alert("Title cannot be empty.");
      return; 
    }
    
    if (!body.trim()) {
      alert("Tell us more in description box.");
      return; 
    }

    setHandleButton(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog/post`,
        {
          title,
          body,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      // console.log(res.data);
      // setHandleButton(false)
      if (res.data.id) {
        navigte(`/blog/${res.data.id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setHandleButton(false);
    }
  };
  const buttonText = PublishButton ? (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-6 my-1  text-gray-200 animate-spin  fill-gray-700"
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
  ) : (
    "Publish"
  );

  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="max-w-screen-lg w-full pt-10">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-gray-800 block p-2.5"
            placeholder="Title"
          />
        </div>
      </div>
      <TextEditor value={body} onChange={(e) => setBody(e.target.value)} />
      <button
        onClick={handlePublish}
        className="bg-blue-600 px-4 py-1 ml-44 mt-3 rounded-2xl text-white active:bg-blue-900"
        disabled={PublishButton}
      >
        {buttonText}
      </button>
    </div>
  );
};

interface TextEditorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  return (
    <div className="flex justify-center">
      <div className="max-w-screen-lg w-full pt-5">
        <textarea
          value={value}
          onChange={onChange}
          className="block p-3 max-h-screen-lg w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-800"
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>
    </div>
  );
};
