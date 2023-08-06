import { Link } from "react-router-dom";
import location from "../assets/location.svg";

export default function Country({ country, countryId }) {
  return (
    <Link to={countryId} className="flex gap-3">
      <div className="w-12 h-12 bg-[#ebebeb] flex items-center justify-center rounded-md">
        <img src={location} className="w-6 h-6" alt="" />
      </div>
      <span className="text-lg self-center">{country}</span>
    </Link>
  );
}
