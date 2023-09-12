import CustomSvg from 'src/assets/images/PlaceholderIcon';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { SvgCssUri } from 'react-native-svg';

const SvgWithPlaceHolder = ({
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
        <>
          {!imageError && source && source != 'null' ?
            <SvgCssUri
              width={widthLogo ? widthLogo : 100}
              height={heightLogo ? heightLogo : 120}
              uri={source}
            /> :
            <Image
              source={{
                uri: placeholderSource,
              }}
              style={style}
              onError={handleImageError}
              {...otherProps}
            />}
        </>)}
    </>
  );
};

export default SvgWithPlaceHolder;
