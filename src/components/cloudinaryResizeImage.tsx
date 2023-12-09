import Image from "next/image";

const CloudinaryResizedImage = ({
  imageUrl,
  width,
  height,
  alt = "image",
  quality = 100,
}) => {
  // Construct the Cloudinary URL with dynamic transformations
  const resizedImageUrl = `${imageUrl.replace(
    "upload/",
    `upload/w_${width},h_${height},c_fill,q_${quality}/`
  )}`;

  return (
    <Image src={resizedImageUrl} alt={alt} width={width} height={height} />
  );
};

export default CloudinaryResizedImage;
