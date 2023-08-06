import { Link } from "react-router-dom";

export default function CountryCard({ name, id, img }) {
  return (
    <Link to={`/${id}`} className="flex items-end w-[268px] aspect-square relative ">
      <img src={img} alt={name} className="w-full h-full absolute inset-0" />
      <div className="h-[76px] bg-gradient relative z-10 w-full flex items-center pl-6">
        <span className="text-white text-[40px] font-bold">{name}</span>
      </div>
    </Link>
  );
}
