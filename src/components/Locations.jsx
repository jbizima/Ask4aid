import { useParams, Link, useOutletContext } from "react-router-dom";
import LocationCard from "./LocationCard";
import back from "../assets/back.svg";

export default function Locations() {
  const { countryId } = useParams();
  const {locations: data} = useOutletContext()
  const destination = data.find((el) => el.countryId === countryId);
  return (
    <div className="pt-10 px-5">
      <div>
      <div className="ml-2 flex gap-2 items-center mb-6">
        <img src={back} className="w-3 h-3 -mb-0.5" alt="" />
        <Link to={`/`} className="text-lg">
          Back
        </Link>
      </div>
        <h2 className="text-3xl text-[#161616] font-bold">
          {destination.country}
        </h2>
        <div className="bg-gray-300 h-[1px] w-[35%] my-4"></div>
      </div>
      <div className="grid min-[440px]:grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data
          .filter((el) => el.countryId === countryId)
          .map((destination) => {
            return <LocationCard key={destination.id} {...destination} />;
          })}
      </div>
    </div>
  );
}
