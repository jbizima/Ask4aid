import { useState } from "react";
import Form from "../components/Form";
import Popup from "../components/Popup";
import desert from "../assets/desert.png";
import nigeria from "../assets/nigeria.png";
import rwanda from "../assets/rwanda.png";
import kenya from "../assets/kenya.png";
import burundi from "../assets/burundi.png";
import contribute from "../assets/contribute.jpg";
import { Link, useOutletContext } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import HomeLocation from "../components/HomeLocation";

export default function Home() {
  const [text, setText] = useState("");
  const { locations } = useOutletContext();
  const countries = [
    ...new Set(
      locations.map((el) => {
        const countryObj = { country: el.country, countryId: el.countryId };
        if (el.country === "Nigeria") {
          countryObj.img = nigeria;
        }
        if (el.country === "Rwanda") {
          countryObj.img = rwanda;
        }
        if (el.country === "Kenya") {
          countryObj.img = kenya;
        }
        if (el.country === "Burundi") {
          countryObj.img = burundi;
        }
        return JSON.stringify(countryObj);
      })
    ),
  ].map((el) => JSON.parse(el));
  const handleChange = (event) => {
    const { value } = event.target;
    setText(value);
  };
  const homeLocations = [
    locations.find((el) => el.country === "Nigeria"),
    locations.find((el) => el.country === "Rwanda"),
    locations.find((el) => el.country === "Kenya"),
    locations.find((el) => el.country === "Burundi"),
  ];
  return (
    <div className="bg-[#FCF8F7]">
      <div className="h-screen pt-10 px-5 max-w-[1176px] mx-auto">
        <div className="flex justify-between">
          <h1 className="text-[#5A5858] text-[30px] font-semibold">
            <Link to="/">Afri-nomad</Link>
          </h1>
          <Link to="/contribute" className="text-[24px] text-[#333] underline">
            Contribute
          </Link>
        </div>
        <div className="relative h-[350px] mt-4 flex justify-center pt-[122px]">
          <div className="relative z-10 w-full max-w-[512px]">
            <Form text={text} handleChange={handleChange} />
            {text && <Popup locations={locations} text={text} />}
          </div>
          <img
            src={desert}
            alt=""
            className="absolute inset-0 object-cover h-full w-full"
          />
        </div>
        <div className="mt-16">
          <div>
            <h3 className="text-2xl">Find destination by country</h3>
            <p className="text-[#333]">
              Get destination to countries in Africa
            </p>
          </div>
          <div className="flex mt-4 justify-between">
            {countries
              .filter((el) =>
                ["burundi", "rwanda", "nigeria", "kenya"].includes(el.countryId)
              )
              .map((country) => {
                return (
                  <CountryCard
                    name={country.country}
                    img={country.img}
                    id={country.countryId}
                  />
                );
              })}
          </div>
        </div>
        <div className="mt-16">
          <div>
            <h3 className="text-2xl">Find a destination that suites you </h3>
            <p className="text-[#333]">
              We have various destination that will amaze you
            </p>
          </div>
          <div className="flex mt-4 justify-between">
            {homeLocations.map((location) => {
              return (
                <HomeLocation
                  key={location.id}
                  name={location.name}
                  img={location.img}
                  id={location.id}
                  location={location.location}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-16 bg-[#F4BB93] flex gap-6 h-[450px] p-6">
          <img src={contribute} alt="contribute" className="h-full flex-1" />
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl max-w-[90%]">
              Do you have a destination you want to share
            </h2>
            <p className="text-[#333] max-w-[310px] mt-3 mb-3">
              Do you have an amazing destination you would like to share with
              the community.
            </p>
            <Link
              className="bg-[#302E2E] w-[150px] h-[42px] flex justify-center items-center rounded-[24px] text-white"
              to="/contribute"
            >
              Contribute
            </Link>
          </div>
        </div>
        <div className="py-6 mt-6">
          <p>© 2023 Afri-Nomad</p>
        </div>
      </div>
    </div>
  );
}
