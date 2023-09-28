import CustomSvg from 'src/assets/images/PlaceholderIcon';
import React, { useEffect, useState } from 'react';
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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const fetchAndParseSVG = async (source) => {
      try {
        const response = await fetch(source);
        const svgText = await response.text();
        setDimensions(getSVGDimensions(svgText));
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    };
    if (!imageError && source && source != 'null') {
      fetchAndParseSVG(source);
    }
  }, [source]);

  const getSVGDimensions = (svgText) => {
    const widthMatch = svgText.match(/width="(\d*(?:\.\d*)?)"/);
    const heightMatch = svgText.match(/height="(\d*(?:\.\d*)?)"/);
    const width = widthMatch ? parseFloat(widthMatch[1]) : 0;
    const height = heightMatch ? parseFloat(heightMatch[1]) : 0;
    return { width, height };
  };

  const handleImageError = () => {
    setImageError(true);
  };
  console.log('dimensions : ', dimensions)

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
            dimensions && dimensions?.width > 150 ?
              <SvgCssUri
              width={26}
              height={26}
                // width={dimensions && dimensions?.width ? dimensions?.width : widthLogo ? widthLogo : 100}
                // height={dimensions && dimensions?.height ? dimensions?.height : heightLogo ? heightLogo : 120}
                uri={source}
                      style={{ aspectRatio: 16/9 }}
                // style={{ aspectRatio: dimensions?.height < 500 
                //   && dimensions?.height < dimensions?.width ? 0.5 : 0.1, 
                //   width: '100%', height: '100%', 
                // }}
                // viewBox={`0 0 786 786`}
                viewBox={`0 0 ${dimensions && dimensions?.width > 0 ? dimensions?.width : widthLogo ? widthLogo : 100} ${dimensions && dimensions?.height > 0 ? dimensions?.height : heightLogo ? heightLogo : 120}`} // Specify the viewBox dimensions (min-x, min-y, width, height)
              // preserveAspectRatio="xMaxYMax meet" // Preserve aspect ratio
              /> :
              <SvgCssUri
                width={widthLogo ? widthLogo : 100}
                height={heightLogo ? heightLogo : 120}
                style={{ aspectRatio: 16/9 }}
                uri={source}
              />
            :
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
