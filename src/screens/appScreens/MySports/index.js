import React, { useState } from 'react';
import { ImageBackground, Text, View, Image, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import styles from './styles';
import { Images, Colors, Strings } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import CustomModalView from 'src/components/Modal/CustomModal';
import { sportDummyList } from 'src/utils/list';

export default function Guide() {
  const navigation = useNavigation();

  const [allFlag, setAllFlag] = useState(true);
  const [proFlag, setProFlag] = useState(false);
  const [collegeFlag, setCollegeFlag] = useState(false);
  const [sportFlag, setSportFlag] = useState(false);
  const [reminderModal, setRemaindarModal] = useState(false);
  const [fvrtModal, setFvrtModal] = useState(false);
  const [mySportData, setSportData] = useState(sportDummyList);
  const [curremItem, setCurrentItem] = useState({});
  const [curremIndex, setCurrentIndex] = useState();

  const handleAll = () => {
    setAllFlag(true);
    setProFlag(false);
    setCollegeFlag(false);
    setSportFlag(false);
  };
  const handlePro = () => {
    setAllFlag(false);
    setProFlag(true);
    setCollegeFlag(false);
    setSportFlag(false);
  };
  const handleCollege = () => {
    setAllFlag(false);
    setProFlag(false);
    setCollegeFlag(true);
    setSportFlag(false);
  };
  const handleSport = () => {
    setAllFlag(false);
    setProFlag(false);
    setCollegeFlag(false);
    setSportFlag(true);
  };
  const handleReminder = (item, index) => {
    setCurrentItem(item);
    setCurrentIndex(index);
    setRemaindarModal(!reminderModal);
  };
  const handleFvrt = (item, index) => {
    console.log(item);
    setCurrentItem(item);
    setCurrentIndex(index);
    setFvrtModal(!fvrtModal);
  };
  const handleNotificationAlert = () => {
    let list = [...mySportData];
    list[curremIndex].notifcationFlag = !list[curremIndex].notifcationFlag;
    setSportData(list);
    setRemaindarModal(!reminderModal);
  };
  const handleFvrtAlert = () => {
    let list = [...mySportData];
    list[curremIndex].fvrtFlag = !list[curremIndex].fvrtFlag;
    setSportData(list);
    setFvrtModal(!fvrtModal);
    navigation.navigate("withoutBottomtab", { screen: "UpgradeAccount" })

  };

  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar backgroundColor={Colors.mediumBlue} />
      {/* Header with Logo only  */}
      <AppHeader centerImage={Images.Logo} />
      {/* Slider all pro  */}
      <View style={styles.sliderContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleAll()}
          style={styles.sliderInnerContainer}>
          <ImageBackground
            source={
              allFlag ? Images.ActiveSliderBack : Images.InActiveSliderBorder
            }
            style={styles.sliderImageBackground}
            resizeMode={'contain'}>
            <Image
              source={Images.Trophy}
              style={styles.sliderIcon}
              resizeMode={'contain'}
            />
            <Text style={styles.sliderTxt}>{Strings.all}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handlePro()}
          style={styles.sliderInnerContainer}>
          <ImageBackground
            source={
              proFlag ? Images.ActiveSliderBack : Images.InActiveSliderBorder
            }
            style={styles.sliderImageBackground}
            resizeMode={'contain'}>
            <Image
              source={Images.Crown}
              style={styles.sliderIcon}
              resizeMode={'contain'}
            />
            <Text style={styles.sliderTxt}>{Strings.pro}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleCollege()}
          style={styles.sliderInnerContainer}>
          <ImageBackground
            source={
              collegeFlag
                ? Images.ActiveSliderBack
                : Images.InActiveSliderBorder
            }
            style={styles.sliderImageBackground}
            resizeMode={'contain'}>
            <Image
              source={Images.College}
              style={styles.sliderIcon}
              resizeMode={'contain'}
            />
            <Text style={styles.sliderTxt}>{Strings.college}</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleSport()}
          style={styles.sliderInnerContainer}>
          <ImageBackground
            source={
              sportFlag ? Images.ActiveSliderBack : Images.InActiveSliderBorder
            }
            style={styles.sliderImageBackground}
            resizeMode={'contain'}>
            <Image
              source={Images.Game}
              style={styles.sliderIcon}
              resizeMode={'contain'}
            />
            <Text style={styles.sliderTxt}>{Strings.esports}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      {/*  header text */}
      <View style={styles.mangeFvrtContainer}>
        <Text style={styles.mangeFavTxt}>{Strings.manageFavorite}</Text>
      </View>
      {/* main list */}
      <FlatList
        data={mySportData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.listContainer}>
            <View style={styles.innerContainer}>
              <Image
                source={item?.img}
                style={styles.imageIcon}
                resizeMode={'contain'}
              />
              <View style={styles.userNameContainer}>
                <Text style={styles.titleTxt}>{item?.title}</Text>
              </View>
              <TouchableOpacity onPress={() => handleReminder(item, index)}>
                <Image
                  source={Images.Bell}
                  style={[
                    styles.fvrtIcon,
                    {
                      tintColor: item?.notifcationFlag
                        ? '#FF9900'
                        : Colors.white,
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFvrt(item, index)}>
                <Image
                  source={item?.fvrtFlag ? Images.FilledFvrt : Images.Favorite}
                  style={styles.fvrtIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* event reminder pop up  */}
      <CustomModalView
        visible={reminderModal}
        headerTxt={Strings.eventReminder}
        desTxt={Strings.eventReminderNotifications}
        blackBtnTxt={Strings.no}
        otherBtnTxt={Strings.yes}
        btn
        rowStyle={true}
        blue
        blackBtnPress={() => setRemaindarModal(!reminderModal)}
        otherBtnPress={() => handleNotificationAlert()}
      />
      {/* Access Features pop up  */}
      <CustomModalView
        visible={fvrtModal}
        desTxt={Strings.accessFeatures}
        blackBtnTxt={Strings.noThanks}
        otherBtnTxt={Strings.createFreeAccount}
        btn
        rowStyle={false}
        blackBtnPress={() => setFvrtModal(!fvrtModal)}
        otherBtnPress={() => handleFvrtAlert()}
      />
    </ImageBackground>
  );
}
