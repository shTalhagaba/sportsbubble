import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  StatusBar,
  Linking,
} from 'react-native';
import styles from './styles';
import { Images, Colors, Strings, Constants } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import GreenButton from 'src/components/GreenButton';
import dayjs from 'dayjs';
import ImageWithPlaceHolder from 'src/components/ImageWithPlaceHolder';
import SvgWithPlaceHolder from 'src/components/SvgWithPlaceHolder';

export default function Connect(props) {
  const [item, setItem] = useState(props?.route?.params?.item);
  const { holderItem, eventFlag } = props?.route?.params;
  const currentDate = dayjs(new Date()).toISOString(); // Get the current date and time

  useEffect(() => {
    setItem(props?.route?.params?.item)
  }, [props?.route?.params?.item]);

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
      <StatusBar
        backgroundColor={Colors.transparent}
        translucent
        barStyle="light-content"
      />
      {/* Header with Logo and back icon  */}
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        customLeftImage={{ tintColor: Colors.orange }}
        SimpleView
      // headerContainer={styles.headerContainer}
      />
      {/* Main View */}
      <View style={styles.flexOnly}>
        {/* after header card */}
        <View style={styles.sliderContainer}>
          <View style={styles.itemListContainer}>
            <View style={styles.itemInnerContainer}>
              <View style={styles.itemContainer}>
                <ImageWithPlaceHolder
                  source={item?.logo1}
                  placeholderSource={Constants.placeholder_trophy_icon}
                  style={styles.imageIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.userNameContainer}>
                <Text style={styles.eventTxt} numberOfLines={2}>
                  {item?.line1 ? item?.line1 : item?.companyName}
                </Text>
                <Text style={styles.titleTxt}>
                  {item?.line2 ? item?.line2 : item?.title}
                </Text>
                <View style={styles.flexRow}>
                  <Text style={[styles.dateEventTxt]}>
                    {' ' + item?.startTime
                      ? dayjs(item?.startTime).format('ddd. MM/D')
                      : item?.day}{' '}
                    {'  l  '}
                  </Text>
                  <Text style={[styles.dateEventTxt]}>
                    {item?.startTime
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
        <Text numberOfLines={1} style={styles.connectingText}>{Strings.connecting}</Text>
        <View style={styles.logoImageContainer}>
          {eventFlag && (holderItem?.edges?.[0]?.node?.logoUrl
            ? holderItem?.edges?.[0]?.node?.logoUrl
            : holderItem?.node?.logoUrl).includes('.svg') ?
            <SvgWithPlaceHolder
              source={
                eventFlag && holderItem?.edges?.[0]?.node?.logoUrl
                  ? holderItem?.edges?.[0]?.node?.logoUrl
                  : holderItem?.node?.logoUrl
              }
              placeholderSource={Constants.placeholder_trophy_icon}
              style={styles.logoImageStyle}
              logoUrl={true}
              resizeMode="contain"
            /> :
            <ImageWithPlaceHolder
              source={
                eventFlag && holderItem?.edges?.[0]?.node?.logoUrl
                  ? holderItem?.edges?.[0]?.node?.logoUrl
                  : holderItem?.node?.logoUrl
              }
              placeholderSource={Constants.placeholder_trophy_icon}
              style={styles.logoImageStyle}
              logoUrl={true}
              resizeMode="contain"
            />}
        </View>
        <View style={styles.buttonContainer}>
          {dayjs(currentDate).isAfter(item?.startTime) &&
            dayjs(currentDate).isBefore(item?.endTime) ? (
            <GreenButton
              title={Strings.watchNow}
              rightIcon={true}
              onpress={() =>
                handleClick(
                  eventFlag
                    ? item?.rightsHoldersConnection?.edges?.[0]?.rhVideoUrl
                    : holderItem?.rhVideoUrl,
                )
              }
            />
          ) : null}
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
