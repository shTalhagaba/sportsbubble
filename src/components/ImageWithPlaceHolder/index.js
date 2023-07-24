import CustomSvg from 'src/assets/images/PlaceholderIcon';
import React, { useState } from 'react';
import { Image, View } from 'react-native';

const ImageWithPlaceHolder = ({
  source,
  placeholderSource,
  style,
  logoUrl,
  widthLogo,
  heightLogo,
  ...otherProps
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      {logoUrl && (imageError || source === null) ? (
        <CustomSvg
          width={widthLogo ? widthLogo : 100}
          height={heightLogo ? heightLogo : 120}
        />
      ) : (
        <Image
          source={{
            uri:
              !imageError && source && source != 'null'
                ? source
                : placeholderSource
          }}
          style={style}
          onError={handleImageError}
          {...otherProps}
        />
      )}
    </>
  );
};

export default ImageWithPlaceHolder;
