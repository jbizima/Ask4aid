import { useState } from "react";
import CloudinaryUploadWidget from "../components/Upload";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewLocation() {
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
  const [imgs, setImgs] = useState([]);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    country: "",
    description: "",
    city: "",
  });
  const handleChanges = (event) => {
    const { name, value } = event.target;
    const newData = { ...userData, [name]: value };
    setUserData(newData);
  };
  const cld = new Cloudinary({
    cloud: {
      cloud_name: process.env.REACT_APP_CLOUDINARY_NAME, //Your cloud name
      upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET, //Create an unsigned upload preset and update this
      folder: "afri-nomad", //Folder name on cloudinary
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!img) {
      setError("Please upload the main image");
      return;
    }
    if (imgs.some((img) => !img) || imgs.length < 1 || imgs.length < 4) {
      const missingImages = imgs.filter((img) => img);
      setError(`Please upload ${4 - missingImages.length} missing images`);
      return;
    }
    const data = {
      name: userData.name,
      countryId: userData?.country.toLowerCase(),
      description: userData.description,
      imgs: imgs,
      img: img,
      country: userData?.country,
      location: `${userData.city}, ${userData.country}`,
    };
    try {
        await axios.post(`${process.env.REACT_APP_URL}/add_locations`, data);
        setError("")
        navigate("/contribute");
    } catch(err) {
        setError("Something went wrong, please try again");
    }
  };

  return (
    <div className="ml-[18px]">
      <div className="flex items-center justify-between pr-[18px]">
        <h3 className="text-xl font-medium mt-[22px] mb-8 ">
          Add new location
        </h3>
        <h5 className="text-red-500 text-lg font-medium">{error}</h5>
      </div>

      <form
        action=""
        onSubmit={handleSubmit}
        className="border border-[#ECECEC] p-8 rounded-md max-w-[819px]"
      >
        <label htmlFor="" className="flex justify-between items-center">
          <span className="text-[#4D4D4D] font-medium">Name</span>
          <input
            type="text"
            placeholder="Name"
            onChange={handleChanges}
            name="name"
            required
            className="border border-[#E4E3E3] h-[44px] rounded-[12px] w-full max-w-[481px] px-3"
          />
        </label>
        <label htmlFor="" className="flex justify-between items-center mt-4">
          <span className="text-[#4D4D4D] font-medium">Country</span>
          <input
            type="text"
            placeholder="Country"
            onChange={handleChanges}
            name="country"
            required
            className="border border-[#E4E3E3] h-[44px] rounded-[12px] w-full max-w-[481px] px-3"
          />
        </label>
        <label htmlFor="" className="flex justify-between items-center mt-4">
          <span className="text-[#4D4D4D] font-medium">City</span>
          <input
            type="text"
            placeholder="City"
            onChange={handleChanges}
            name="city"
            required
            pattern="[A-Za-z]{3,}"
            className="border border-[#E4E3E3] h-[44px] rounded-[12px] w-full max-w-[481px] px-3"
          />
        </label>
        <label htmlFor="" className="flex justify-between mt-4">
          <span className="text-[#4D4D4D] font-medium">description</span>
          <textarea
            placeholder="Description"
            onChange={handleChanges}
            name="description"
            required
            minLength={50}
            className="border border-[#E4E3E3] h-[174px] rounded-[12px] w-full max-w-[481px] p-3"
          />
        </label>
        <label htmlFor="" className="flex justify-between mt-10">
          <span className="text-[#4D4D4D] font-medium">Upload</span>
          <div className="flex gap-1">
            <CloudinaryUploadWidget
              cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
              upload_preset={cld.cloudinaryConfig.cloud.upload_preset}
              onImageUpload={(url) => setImg(url)}
              name={"Main image"}
              img={img}
            />
            <CloudinaryUploadWidget
              cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
              upload_preset={cld.cloudinaryConfig.cloud.upload_preset}
              onImageUpload={(url) => {
                const newArr = [...imgs];
                newArr[0] = url;
                setImgs(newArr);
              }}
              name={"image 2"}
              img={imgs[0]}
            />
            <CloudinaryUploadWidget
              cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
              upload_preset={cld.cloudinaryConfig.cloud.upload_preset}
              onImageUpload={(url) => {
                const newArr = [...imgs];
                newArr[1] = url;
                setImgs(newArr);
              }}
              name={"image 3"}
              img={imgs[1]}
            />
            <CloudinaryUploadWidget
              cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
              upload_preset={cld.cloudinaryConfig.cloud.upload_preset}
              onImageUpload={(url) => {
                const newArr = [...imgs];
                newArr[2] = url;
                setImgs(newArr);
              }}
              name={"image 4"}
              img={imgs[2]}
            />
            <CloudinaryUploadWidget
              cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
              upload_preset={cld.cloudinaryConfig.cloud.upload_preset}
              onImageUpload={(url) => {
                const newArr = [...imgs];
                newArr[3] = url;
                setImgs(newArr);
              }}
              name={"image 5"}
              img={imgs[3]}
            />
          </div>
        </label>
        <div className="flex justify-end">
          <button className="bg-[#0078FF] text-white font-medium px-10 pt-3 pb-3.5 rounded-[12px] mt-10">
            Create location
          </button>
        </div>
      </form>
    </div>
  );
}
