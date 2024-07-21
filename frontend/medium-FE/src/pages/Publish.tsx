import axios from "axios";
import { AppBar } from "../Components/AppBar";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigte = useNavigate();
  const handlePublish = async () => {
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
      console.log(res.data);
      if (res.data.id) {
        navigte(`/blog/${res.data.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      >
        Publish
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
