import { Link, useOutletContext, useParams } from "react-router-dom";
import back from "../assets/back.svg";

export default function Destination() {
  const { id } = useParams();
  const {locations: data} = useOutletContext()

  const destination = data.find((el) => {
    return el.id === +id;
  });
  const { name, location, description, countryId, img, imgs } = destination;
  return (
    <div className="px-4 pt-10">
      <div className="ml-2 flex gap-2 items-center mb-6">
        <img src={back} className="w-3 h-3 -mb-0.5" alt="" />
        <Link to={`/${countryId}`} className="text-lg">
          Back
        </Link>
      </div>
      <div>
        <div className="grid md:grid-cols-2 gap-2.5 h-96">
          <div className="rounded-l-3xl h-96 rounded-sm relative ">
            <img
              src={img}
              className={"h-full block w-full object-cover"}
              alt=""
            />
          </div>
          <div className="md:grid grid-cols-2 gap-2 hidden h-96">
            {imgs.map((el, i) => {
              return (
                <div
                  className={` rounded-sm overflow-hidden relative ${
                    i === 1 && "rounded-tr-2xl"
                  } ${i === 3 && "rounded-br-2xl"}`}
                >
                  <img
                    src={el}
                    key={i}
                    className={"h-full absolute w-full object-cover"}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
        <h2 className="mt-5 text-2xl text-[#161616]">{name}</h2>
        <h4 className="text-[#717171]">{location}</h4>
        <div className="bg-gray-300 h-[1px] w-1/2 my-3"></div>
        <p className="md:max-w-[70%]  lg:max-w-[50%] leading-[1.3] -tracking-tight">
          {description}
        </p>
      </div>
    </div>
  );
}
