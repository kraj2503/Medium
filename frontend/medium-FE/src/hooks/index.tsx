import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export interface Blog {
  title: string;
  body: string;
  id: string;
  createdAt:string;
  author: {
    name: string;
    about:string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setblog] = useState<Blog>();

  useEffect(() => {
    getBlog(id);
  }, [id]);

  async function getBlog(id: string) {
    const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setblog(res.data.blog);
    setLoading(false);
  }
  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setblogs] = useState<Blog[]>([]);

  useEffect(() => {
    // console.log(localStorage.getItem("token"));
    getBlogs();
  }, []);

  async function getBlogs() {
    const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setblogs(res.data.blogs);
    setLoading(false);
  }
  return {
    loading,
    blogs,
  };
};

export const useGetName = () => {
  const [authName, setName] = useState("");
  useEffect(() => {
    getName();
  }, []);

  async function getName() {
    const response = await axios.get(`${BACKEND_URL}/api/v1/user/name`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setName(response.data.author.name);
  }
  return { authName };
};
