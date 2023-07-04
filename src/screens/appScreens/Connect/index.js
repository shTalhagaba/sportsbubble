import React, { useState } from 'react';
import { ImageBackground, Text, View, Image, StatusBar } from 'react-native';
import styles from './styles';
import { Images, Colors, Strings } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import GreenButton from 'src/components/GreenButton';

export default function Connect(props) {
  const [item, setItem] = useState(props?.route?.params?.item);
  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar backgroundColor={Colors.mediumBlue} />
      {/* Header with Logo and back icon  */}
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        customLeftImage={{ tintColor: Colors.orange }}
        SimpleView
      />
      <View style={styles.flexOnly}>
        <View style={styles.sliderContainer}>
          <View style={styles.itemListContiner}>
            <View style={styles.itemInnerContainer}>
              <View style={styles.itemContainer}>
                <Image
                  source={item?.img}
                  style={styles.imageIcon}
                  resizeMode={'contain'}
                />
              </View>
              <View style={styles.userNameContainer}>
                <Text style={styles.eventTxt}>{item?.companyName}</Text>
                <Text style={styles.titleTxt}>{item?.title}</Text>
                <View style={styles.flexRow}>
                  <Text
                    style={[styles.eventTxt]}>
                    {item?.day}
                  </Text>
                  <Text
                    style={[styles.eventTxt]}>
                    {' ' + item?.time}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={Images.Logo}
            resizeMode={'contain'}
            style={styles.imageStyle}
          />
        </View>
        <Text style={styles.connectingText}>{Strings.connecting}</Text>
        <View style={styles.buttonContainer}>
          <GreenButton title={Strings.watchNow} rightIcon={true} />
        </View>
      </View>
      {/* Powered by sports bubble */}
      <View style={styles.sbContainer}>
        <Image source={Images.Sports} style={styles.leftArrowIcon} resizeMode={"contain"} />
        <Image source={Images.PoweredSB} style={styles.powerImage} resizeMode={"contain"} />
      </View>
    </ImageBackground>
  );
}
