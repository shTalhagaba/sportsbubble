import React, { useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import styles from './styles';
import { Images, Colors, Strings } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import CustomModalView from 'src/components/Modal/CustomModal';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
const screenWidth = Dimensions.get('window').width;
const { fontScale } = Dimensions.get('window');

const data = [
  {
    id: 1,
    img: Images.BaseBall,
    title: 'Baseball',
    notifcationFlag: false,
    fvrtFlag: false,
  },
  {
    id: 2,
    img: Images.BasketBall,
    title: 'Basketball',
    notifcationFlag: false,
    fvrtFlag: false,
  },
  {
    id: 3,
    img: Images.BaseBall,
    title: 'Boxing',
    notifcationFlag: false,
    fvrtFlag: false,
  },
  {
    id: 4,
    img: Images.BasketBall,
    title: 'Baseball',
    notifcationFlag: false,
    fvrtFlag: false,
  },
  {
    id: 5,
    img: Images.BaseBall,
    title: 'Basketball',
    notifcationFlag: false,
    fvrtFlag: false,
  },
  {
    id: 6,
    img: Images.BasketBall,
    title: 'Basketball',
    notifcationFlag: false,
    fvrtFlag: false,
  },
  {
    id: 7,
    img: Images.BaseBall,
    title: 'Boxing',
    notifcationFlag: false,
    fvrtFlag: false,
  },
  {
    id: 8,
    img: Images.BasketBall,
    title: 'Baseball',
    notifcationFlag: false,
    fvrtFlag: false,
  },
  {
    id: 9,
    img: Images.BaseBall,
    title: 'Basketball',
    notifcationFlag: false,
    fvrtFlag: false,
  },
];

// Sample data for the category slider
const categoryArr = [
  {
    id: 1,
    title: 'all',
    value: 'all',
    selected: true,
  },
  {
    id: 2,
    title: 'pro',
    value: 'pro',
  },
  {
    id: 3,
    title: 'college',
    value: 'college',
  },
  {
    id: 4,
    title: 'esports',
    value: 'e-sports',
  },
];

export default function Guide() {
  const navigation = useNavigation();
  const reduxData = useSelector(state => state.user);

  const [categoryData, setCategoryData] = useState(categoryArr);
  const [reminderModal, setRemaindarModal] = useState(false);
  const [fvrtModal, setFvrtModal] = useState(false);
  const [mySportData, setSportData] = useState(data);
  const [curremItem, setCurrentItem] = useState({});
  const [curremIndex, setCurrentIndex] = useState();

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
    navigation.navigate('withoutBottomtab', { screen: 'UpgradeAccount' });
  };

  const handleSelectedCategory = (e, index) => { };

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
      {/* Header with Logo only  */}
      <AppHeader centerImage={Images.Logo} />
      {/* Slider all pro  */}
      <View style={styles.sliderContainer}>
        <FlatList
          horizontal
          data={categoryData}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            fontScale > 1
              ? { justifyContent: 'center' }
              : { justifyContent: 'center', flex: 1 }
          }
          scrollEnabled={fontScale > 1 ? true : false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleSelectedCategory(item, index)}
              style={styles.sliderInnerContainer}>
              <View
                style={[
                  styles.sliderInnerMainContainer,
                  { borderWidth: item?.selected ? moderateScale(2, 0.3) : 0 },
                ]}>
                {item?.selected && <View style={styles.rectangle2} />}
                <ImageBackground
                  source={
                    item?.selected
                      ? Images.ActiveSliderBack
                      : Images.InActiveSliderBorder
                  }
                  style={styles.sliderImageBackground}
                  imageStyle={
                    Platform.OS === 'android'
                      ? {
                        borderRadius: moderateScale(22, 0.3),
                        borderWidth: item?.selected
                          ? 0
                          : moderateScale(2.5, 0.3),
                        borderColor: Colors.darkBlue,
                      }
                      : {}
                  }
                  resizeMode={'stretch'}>
                  <Image
                    source={
                      index === 0
                        ? Images.Trophy
                        : index === 1
                          ? Images.Crown
                          : index === 2
                            ? Images.College
                            : Images.Game
                    }
                    style={styles.sliderIcon}
                    resizeMode={'contain'}
                  />
                  <Text style={styles.sliderTxt}>
                    {item?.title.toUpperCase()}
                  </Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          )}
        />
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
          <View style={styles.listContiner}>
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
                  resizeMode={'contain'}
                  style={[
                    styles.bellIcon,
                    {
                      tintColor: item?.notifcationFlag
                        ? Colors.darkOrange
                        : Colors.white,
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFvrt(item, index)}>
                <Image
                  source={item?.fvrtFlag ? Images.FilledFvrt : Images.Favorite}
                  style={[
                    styles.fvrtIcon,
                    { tintColor: item?.fvrtFlag && Colors.orange },
                  ]}
                  resizeMode={'contain'}
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
        headerTxtStyle={styles.headerTxtStyle}
        dexTxtStyle={styles.dexTxtStyle}
        blackBtnTxt={Strings.no}
        otherBtnTxt={Strings.yes}
        fillBefore={false}
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
        fillBefore={false}
        btn
        rowStyle={false}
        blackBtnPress={() => setFvrtModal(!fvrtModal)}
        otherBtnPress={() => handleFvrtAlert()}
      />
    </ImageBackground>
  );
}
