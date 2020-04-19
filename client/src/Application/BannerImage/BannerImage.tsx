import React from "react";
import Image from "../Image/Image";
import "./BannerImage.css";

interface BannerImageProps extends React.AllHTMLAttributes<HTMLElement> {
  src: string | undefined;
}

function BannerImage({ src, ...props }: BannerImageProps) {
  return (
    <Image
      className="BannerImage"
      src={
        src ? `${process.env.REACT_APP_THE_TV_DB_BANNER_URL}/${src}` : undefined
      }
      {...props}
    />
  );
}

export default BannerImage;
