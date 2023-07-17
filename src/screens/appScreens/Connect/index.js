import React, {useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  StatusBar,
  Linking,
} from 'react-native';
import styles from './styles';
import {Images, Colors, Strings} from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import GreenButton from 'src/components/GreenButton';
import dayjs from 'dayjs';

export default function Connect(props) {
  const [item, setItem] = useState(props?.route?.params?.item);
  const {holderItem,eventFlag} = props?.route?.params
  const handleClick = url => {
    if (url) {
      Linking.openURL(url);
    }
  };

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
        customLeftImage={{tintColor: Colors.orange}}
        SimpleView
      />
      {/* Main View */}
      <View style={styles.flexOnly}>
        {/* after header card */}
        <View style={styles.sliderContainer}>
          <View style={styles.itemListContainer}>
            <View style={styles.itemInnerContainer}>
              <View style={styles.itemContainer}>
                <Image
                  source={item?.logo1 ? {uri: item?.logo1} : item?.img}
                  style={styles.imageIcon}
                  resizeMode={'contain'}
                />
              </View>
              <View style={styles.userNameContainer}>
                <Text style={styles.eventTxt}>
                  {' '}
                  {item?.line1 ? item?.line1 : item?.companyName}
                </Text>
                <Text style={styles.titleTxt}>
                  {' '}
                  {item?.line2 ? item?.line2 : item?.title}
                </Text>
                <View style={styles.flexRow}>
                  <Text style={[styles.dateEventTxt]}>
                    {' '}
                    {' ' + item?.startTime
                      ? dayjs(item?.startTime).format('ddd. MM/D')
                      : item?.day}{' '}
                    {'  l  '}
                  </Text>
                  <Text style={[styles.dateEventTxt]}>
                    {' ' + item?.startTime
                      ? dayjs(item?.startTime).format('h:mma') +
                        ' - ' +
                        dayjs(item?.endTime).format('h:mma')
                      : item?.time}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Detail logo */}
        <View style={styles.imageContainer}>
          <Image
            source={Images.Logo}
            resizeMode={'contain'}
            style={styles.imageStyle}
          />
        </View>
        <Text style={styles.connectingText}>{Strings.connecting}</Text>
        <View style={styles.logoImageContainer}>
          {item?.logo1 ? (
            <Image
              source={{uri: eventFlag && holderItem?.edges?.[0]?.node?.logoUrl ? holderItem?.edges?.[0]?.node?.logoUrl : holderItem?.logoUrl || item?.logo1}}
              resizeMode={'contain'}
              style={styles.logoImageStyle}
            />
          ) : (
            <Image
              source={Images.NBALogo}
              resizeMode={'contain'}
              style={styles.logoImageStyle}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <GreenButton
            title={Strings.watchNow}
            rightIcon={true}
            onpress={() =>
              handleClick(item?.rightsHoldersConnection?.edges?.[0]?.rhVideoUrl)
            }
          />
        </View>
      </View>
      {/* Powered by sports bubble */}
      <View style={styles.sbContainer}>
        <Image
          source={Images.Sports}
          style={styles.leftArrowIcon}
          resizeMode={'contain'}
        />
        <Image
          source={Images.PoweredSB}
          style={styles.powerImage}
          resizeMode={'contain'}
        />
      </View>
    </ImageBackground>
  );
}
