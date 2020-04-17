import React from "react";
import Image from "../Image/Image";

interface BannerImageProps extends React.AllHTMLAttributes<HTMLElement> {
  src: string;
}

function BannerImage({ src, ...props }: BannerImageProps) {
  return (
    <Image
      src={
        src ? `${process.env.REACT_APP_THE_TV_DB_BANNER_URL}/${src}` : undefined
      }
      {...props}
    />
  );
}

export default BannerImage;
