import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import styles from './styles';
import { Images, Colors, Strings, Constants } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import ImageWithPlaceHolder from 'src/components/ImageWithPlaceHolder';
import GestureRecognizer from 'react-native-swipe-gestures';
import SvgRenderer from 'src/components/SvgRenderer';
import { useSelector } from 'react-redux';
const screeHeight = Dimensions.get('window').height;

export default function Watch(props) {
  const navigation = useNavigation();
  const DMA = useSelector((state) => state.dma)
  const currentDate = dayjs(); // Get the current date and time
  const [itemSelected, setItemSelected] = useState(props?.route?.params?.item);
  const [bottomMenu, setBottomMenu] = useState(false);
  const [bottomShow, setBottomShow] = useState(false);
  const [partnerlist, setPartnerList] = useState([]);
  const [otherList, setOtherList] = useState([]);

  useEffect(() => {
    setItemSelected(props?.route?.params?.item);
    if (
      (props?.route?.params?.item &&
        props?.route?.params?.item?.rightsHoldersConnection?.edges.length > 0) ||
      props?.route?.params?.item?.rightsHoldersConnection?.totalCount > 0
    ) {
      let others =
        props?.route?.params?.item?.rightsHoldersConnection?.edges.filter(
          item => {
            if (['NFL'].includes(itemSelected?.league?.name)) {
              return item?.node?.weight < 1000 && (item?.dmaCodes.includes(DMA?.code) || item?.dmaCodes.includes('000') || !item?.dmaCodes?.length)
            }
            const rightsHolder = item?.node;
            return rightsHolder && rightsHolder.weight < 1000;
          },
        );
      others.sort((a, b) => b.node.weight - a.node.weight);
      let partners =
        props?.route?.params?.item?.rightsHoldersConnection?.edges.filter(
          item => {
            if (['NFL'].includes(itemSelected?.league?.name)) {
              return item?.node?.weight > 1000 && (item?.dmaCodes.includes(DMA?.code) || item?.dmaCodes.includes('000') || !item?.dmaCodes?.length)
            }
            const rightsHolder = item?.node;
            return rightsHolder && rightsHolder.weight > 1000;
          },
        );
      partners.sort((a, b) => b.node.weight - a.node.weight);
      setOtherList(others)
      setPartnerList(partners)
      if (others && others.length > 0) {
        setBottomShow(true);
      }
    }
  }, [props?.route?.params?.item]);

  const mainView = () => {
    return (
      <>
        {/* after header card */}
        <View style={styles.sliderContainer}>
          <View style={styles.itemListContainer}>
            <View style={styles.itemInnerContainer}>
              <View style={styles.itemContainer}>
                <ImageWithPlaceHolder
                  source={itemSelected?.logo1}
                  placeholderSource={Constants.placeholder_trophy_icon}
                  style={styles.imageIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={[styles.userNameContainer]}>
                <Text style={styles.eventTxt} numberOfLines={1}>
                  {itemSelected?.line1
                    ? itemSelected?.line1
                    : itemSelected?.companyName}
                </Text>
                <Text style={styles.titleTxt}>
                  {itemSelected?.line2
                    ? itemSelected?.line2
                    : itemSelected?.title}
                </Text>
                <View style={styles.itemInnerContainer}>
                  <Text style={[styles.dateEventTxt]}>
                    {' ' + itemSelected?.startTime
                      ? dayjs(itemSelected?.startTime).format('ddd. MM/D')
                      : itemSelected?.day}
                    {'  l '}
                  </Text>
                  <Text style={[styles.dateEventTxt]}>
                    {' ' + itemSelected?.startTime
                      ? dayjs(itemSelected?.startTime).format('h:mma') +
                      ' - ' +
                      dayjs(itemSelected?.endTime).format('h:mma')
                      : itemSelected?.time}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Watch option text */}
        <Text style={styles.watchOptions}>{Strings.watchOptions}</Text>
        {/* right holder connection list */}
        <View style={styles.flatlistContainer}>
          <Text style={styles.conectTxt}>
            {dayjs(itemSelected?.startTime).isAfter(currentDate)
              ? ' '
              : Strings.connectToWatch}
          </Text>
          <FlatList
            data={partnerlist}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.flatContainer}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  pointer
                  onPress={() => {
                    navigation.navigate('withoutBottomtab', {
                      screen: 'Connect',
                      params: {
                        item: itemSelected, holderItem: item,
                        eventFlag: false,
                      },
                    })
                  }}
                  style={[styles.listMainContainer, (dayjs(currentDate).isAfter(itemSelected?.startTime) &&
                    dayjs(currentDate).isBefore(itemSelected?.endTime) ? {} : { pointerEvents: 'none' })]}>
                  {item?.node && item?.node?.logoUrl && (item?.node?.logoUrl.includes('.svg')) ?
                    <SvgRenderer url={item?.node?.logoUrl} />
                    :
                    <View style={styles.listInnerContainer}>
                      <View style={styles.listBackground} />
                      <View style={styles.imageContainer}>
                        <ImageWithPlaceHolder
                          source={item?.node?.logoUrl}
                          placeholderSource={Constants.placeholder_trophy_icon}
                          style={styles.imageRightsIcon}
                          logoUrl={true}
                          widthLogo={48}
                          heightLogo={48}
                          resizeMode="contain"
                        />
                      </View>
                    </View>}
                </TouchableOpacity>
              )
            }}
            ListEmptyComponent={
              <Text style={styles.orangeTxt}>{Strings.connectToWatchEmpty}</Text>
            }
          />
        </View>
      </>)
  }
  const ItemComponent = React.memo(({ item }) => {
    return (
      <View style={styles.bottomListContainer}>
        <View style={styles.bottomInnerContainer}>
          <View style={styles.bottomListBackground} />
          <View style={styles.imageContainer}>
            {item?.node && item?.node?.logoUrl && (item?.node?.logoUrl.includes('.svg')) ?
              <SvgRenderer url={item?.node?.logoUrl} />
              :
              <ImageWithPlaceHolder
                source={item?.node?.logoUrl}
                placeholderSource={
                  Constants.placeholder_trophy_icon
                }
                style={styles.imageRightsIcon}
                logoUrl={true}
                widthLogo={50}
                heightLogo={50}
                resizeMode="contain"
              />}
          </View>
        </View>
      </View>
    )
  })

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
        SimpleView
      />
      {/* Main View */}
      {screeHeight < 600 ?
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          scrolc
          style={styles.flexOnly}>
          {mainView()}
        </ScrollView>
        :
        <View
          style={styles.flexOnly}>
          {mainView()}
        </View>
      }
      <GestureRecognizer
        style={{
          // flex: 1,
        }}
        onSwipeDown={state => {
          setBottomMenu(false);
        }}
        onSwipeUp={state => {
          setBottomMenu(true);
        }}
        config={{
          velocityThreshold: 0.1,
          directionalOffsetThreshold: 100,
          gestureIsClickThreshold: 20,
        }}>
        {bottomShow && otherList.length > 0 &&
          (bottomMenu ? (
            <ImageBackground
              source={Images.CircleBGLarge}
              resizeMode={'stretch'}
              style={styles.largeMenuImage}>
              <TouchableOpacity onPress={() => setBottomMenu(false)}>
                <Image source={Images.Menu} style={styles.menuBtn2} />
              </TouchableOpacity>
              <Text style={styles.wayToWatch}>{Strings.otherWays}</Text>
              <View style={styles.bottomFlatlist}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                  {otherList.map((item, index) => (
                    <ItemComponent key={index} item={item} />
                  ))}
                </ScrollView>
              </View>
            </ImageBackground>
          ) : (
            <ImageBackground
              source={Images.CircleBG}
              resizeMode={'stretch'}
              style={styles.smallMenuImage}>
              <TouchableOpacity onPress={() => setBottomMenu(true)}>
                <Image source={Images.Menu} style={styles.menuBtn} />
              </TouchableOpacity>
              <Text style={styles.wayToWatch}>{Strings.otherWays}</Text>
            </ImageBackground>
          ))}
      </GestureRecognizer>
    </ImageBackground>
  );
}
