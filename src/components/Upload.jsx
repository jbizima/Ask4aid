import { openUploadWidget } from "../utils/CloudinaryService";
import upload from "../assets/upload.svg";

const ImageUpload = (props) => {
  const uploadImageWidget = (event) => {
    event.preventDefault();
    let myUploadWidget = openUploadWidget(
      {
        cloudName: props.cloud_name,
        uploadPreset: props.upload_preset,
        tags: ["myname"],
        maxImageWidth: 600,
        sources: ["local", "url", "camera"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          props.onImageUpload(result.info.url);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className={` ${props.img ? 'bg-gray-500' :'bg-[#0078FF]'} text-white text-xs py-2 px-3 flex items-center gap-1 rounded-lg`} disabled={!!props.img} onClick={uploadImageWidget}>
      <img src={upload} alt="" width={12} height={12} />
      <span className="w-max">{props.name || "Upload Image"}</span>
    </button>
  );
};

export default ImageUpload;
