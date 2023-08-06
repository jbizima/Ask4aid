import { Link } from "react-router-dom";

export default function LocationCard({ name, location, id, img}) {
  return (
    <Link to={`/destination/${id}`} className="flex-1 group">
      <div className="aspect-square rounded-xl relative overflow-hidden">
        <img src={img} alt="" className="w-full h-full absolute object-cover" />
      </div>
      <div className="mt-2">
        <h4 className="font-bold group-hover:underline duration-200">{name}</h4>
        <p className="text-[#717171]">{location}</p>
      </div>
    </Link>
  );
}
