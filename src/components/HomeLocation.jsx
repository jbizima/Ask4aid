import { Link } from "react-router-dom";

export default function HomeLocation({ name, id, img, location }) {
  return (
    <Link to={`/destination/${id}`}>
      <div className="w-[268px] aspect-square relative">
        <img
          src={img}
          alt={name}
          className=" object-cover block absolute inset-0 w-full h-full"
        />
      </div>

      <div>
        <h4 className=" text-[20px]">{name}</h4>
        <p className="text-[#818080] -mt-1">{location}</p>
      </div>
    </Link>
  );
}
