import { Link, NavLink, useNavigate } from "react-router-dom";
import lightNewLocation from "../assets/light-new-location.svg";
import lightLocation from "../assets/new-location.svg";
import pendingLocation from "../assets/pending-location.svg";
import lightPendingLocation from "../assets/light-pending-location.svg";
import lightContributors from "../assets/light-contributors.svg";
import contributors from "../assets/contributors.svg";
import lightLogout from "../assets/light-logout.svg";

export default function NavBar({ role }) {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/")
  }
  return (
    <div className="w-full pl-6">
      <h1 className="text-[#5A5858] text-[36px] font-bold my-[32px]">
        <Link to="/">Afri-nomad</Link>
      </h1>
      <div className="flex flex-col gap-6">
        <NavLink
          to="."
          end
          children={({ isActive }) => (
            <span
              className={`flex items-center gap-1 font-medium hover:underline ${
                isActive ? "text-[#2E4A81]" : "text-[#B7B9BB]"
              }`}
            >
              <img
                src={!isActive ? lightPendingLocation : pendingLocation}
                className="h-[26px] w-[26px]"
                alt=""
              />
              Pending Location
            </span>
          )}
        />
        {role === "admin" && <NavLink
          to="contributors"
          end
          children={({ isActive }) => (
            <span
              className={`flex items-center gap-1 font-medium hover:underline ${
                isActive ? "text-[#2E4A81]" : "text-[#B7B9BB]"
              }`}
            >
              <img
                src={!isActive ? lightContributors : contributors}
                className="h-[26px] w-[26px]"
                alt=""
              />
              Contributors
            </span>
          )}
        />}

        <NavLink
          to="new-location"
          children={({ isActive }) => (
            <span
              className={`flex items-center gap-1 font-medium hover:underline ${
                isActive ? "text-[#2E4A81]" : "text-[#B7B9BB]"
              }`}
            >
              <img
                src={!isActive ? lightLocation : lightNewLocation}
                className="h-[26px] w-[26px]"
                alt=""
              />
              New location
            </span>
          )}
        />
        <button className="text-[#B7B9BB] hover:underline flex items-center gap-1 font-medium" onClick={handleLogout}><img src={lightLogout} alt="" />Logout</button>

      </div>
    </div>
  );
}
