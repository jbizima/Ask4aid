import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {

  const [user, setUser] = useState(null);
  const [state, setState] = useState("idle");
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getUser = async () => {
      try {
        setState("loading");
        const res = await axios.get(`${process.env.REACT_APP_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        setState("success");
      } catch (error) {
        navigate("/login")
      }
    };
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return state === "success" ? (
    <div className="flex h-screen">
      <div className="w-[300px] h-full border-r border-r-[#EDE7E7]">
        <NavBar role={user.role} />
      </div>
      <div className="flex-1 flex flex-col h-full">
        <div className="h-[86px] flex items-center justify-end px-[26px] border-b border-b-[#E0E0E0]">
          <div className="flex items-center gap-1.5">
            <div className="w-[34px] h-[34px] rounded-full bg-[#D9D9D9]"></div>
            <div>
              <h3 className="text-[15px] font-medium">{user.first_name}</h3>
              <p className="text-[12px] text-[#A78F8F] font-medium">
                {user.role}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Outlet context={user} />{" "}
        </div>
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
}
