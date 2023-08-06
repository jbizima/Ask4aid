import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Upvote({ location, user }) {
  const [state, setState] = useState("idle");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userAlreadyUpvoted = location.upvotes.includes(user.id);
  const handleUpvote = async () => {
    try {
      setState("pending");
      await axios.patch(
        `${process.env.REACT_APP_URL}/upvote-locations/${location.id}`,
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
      disabled={userAlreadyUpvoted}
      className={`w-[90px] flexjustify-center ${
        userAlreadyUpvoted ? "bg-gray-500" : "bg-[#67DA87]"
      } text-white px-4 py-2 rounded-md`}
      onClick={handleUpvote}
    >
      {state === "pending"
        ? "upvoting"
        : userAlreadyUpvoted
        ? "upvoted"
        : "Upvote"}
    </button>
  );
}
