import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    navigate("/signin");
  }
  return (
    <>
      <button
        onClick={logout}
        className="border px-2 py-1 mt-1 font-medium rounded-lg bg-slate-100 hover:bg-slate-200"
      >
        Log out
      </button>
    </>
  );
}
