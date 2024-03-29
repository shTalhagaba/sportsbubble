import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CustomSvg = ({width,height}) => {
  return (
      <Svg height={height} width={width} viewBox="0 -960 960 960">
        <Path
          d="m407-391 202-129-202-129v258Zm-32 219v-80H186q-22.775 0-38.387-15.612Q132-283.225 132-306v-428q0-22.775 15.613-38.388Q163.225-788 186-788h588q22.775 0 38.388 15.612Q828-756.775 828-734v428q0 22.775-15.612 38.388Q796.775-252 774-252H585v80H375ZM186-274h588q12 0 22-10t10-22v-428q0-12-10-22t-22-10H186q-12 0-22 10t-10 22v428q0 12 10 22t22 10Zm-32 0v-492 492Z"
          fill="#ADB1B3" // You can specify a fill color if needed
        />
      </Svg>
  );
};

export default CustomSvg;
