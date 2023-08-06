import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ApproveContributor({ user, admin }) {
  const [state, setState] = useState("idle");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleUpvote = async () => {
    try {
      setState("pending");
      await axios.patch(
        `${process.env.REACT_APP_URL}/approve-contributors/${user.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate(0);
      setState("resolved");
    } catch (error) {
      setState("rejected");
      setError(error.message);
    }
  };
  useEffect(() => {
    if (state === "rejected") {
      alert(error);
    }
  }, [error, state]);
  return (
    <button
      disabled={user.status === "approved" ? true : false}
      className={`w-[90px] flexjustify-center ${
        user.status === "approved" ? "bg-gray-500" : "bg-[#67DA87]"
      } text-white px-4 py-2 rounded-md`}
      onClick={handleUpvote}
    >
      {state === "pending"
        ? "approving"
        : user.status === "approved"
        ? "Approved"
        : "Approve"}
    </button>
  );
}
