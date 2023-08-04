import React, {useEffect, useState} from 'react';
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
import {Images, Colors, Strings, Constants} from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import ImageWithPlaceHolder from 'src/components/ImageWithPlaceHolder';
const screenWidth = Dimensions.get('window').width;

const data = [
  {id: 1, img: Images.NBALogo, title: 'Fubo'},
  {id: 2, img: Images.NBALogo, title: 'ESPN'},
  {id: 3, img: Images.NBALogo, title: 'Sling'},
  {id: 4, img: Images.NBALogo, title: 'DAZN'},
];

export default function Watch(props) {
  const navigation = useNavigation();
  const currentDate = dayjs(); // Get the current date and time
  const [itemSelected, setItemSelected] = useState(props?.route?.params?.item);
  const [bottomMenu, setBottomMenu] = useState(false);
  const [bottomShow, setBottomShow] = useState(false);
  const {searchFlag} = props?.route?.params;

  useEffect(() => {
    setItemSelected(props?.route?.params?.item);
    if (
      props?.route?.params?.item &&
      props?.route?.params?.item?.rightsHoldersConnection?.totalCount > 1
    ) {
      let list =
        props?.route?.params?.item?.rightsHoldersConnection?.edges.filter(
          item => {
            const rightsHolder = item?.node;
            return rightsHolder && rightsHolder.weight > 1000;
          },
        );
      if (list && list.length > 0) {
        setBottomShow(true);
      }
    }
  }, [props?.route?.params?.item]);

  return (
    <ImageBackground
      source={Images.Background}
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
        onPressBack={searchFlag ? () => navigation.navigate('Search') : null}
        SimpleView
      />
      {/* Main View */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        style={styles.flexOnly}>
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
                <Text style={styles.eventTxt}>
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
        {itemSelected &&
        itemSelected?.rightsHoldersConnection?.edges &&
        itemSelected?.rightsHoldersConnection?.totalCount > 1 ? (
          <View style={styles.flatlistContainer}>
            <Text style={styles.conectTxt}>
              {dayjs(itemSelected?.startTime).isAfter(currentDate)
                ? 
                //Strings.connectToWatchFuture +
                  ' ' 
                  //dayjs(itemSelected?.startTime).format('dddd MM/D [at] h:mma')
                : Strings.connectToWatch}
            </Text>
            <FlatList
              data={itemSelected?.rightsHoldersConnection?.edges || data}
              showsVerticalScrollIndicator={false}
              horizontal
              contentContainerStyle={{flex: 1, justifyContent: 'center'}}
              renderItem={({item, index}) => {
                return item?.node?.weight === null ||
                  item?.node?.weight < 1000 ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('withoutBottomtab', {
                        screen: 'Connect',
                        params: {item: itemSelected, holderItem: item},
                      });
                    }}
                    style={styles.listMainContainer}>
                    <View style={styles.listInnerContainer}>
                      <View style={styles.listBackground} />
                      <View style={styles.imageContainer}>
                        <ImageWithPlaceHolder
                          source={item?.node?.logoUrl}
                          placeholderSource={Constants.placeholder_trophy_icon}
                          style={styles.imageRightsIcon}
                          logoUrl={true}
                          widthLogo={50}
                          heightLogo={50}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                    <Text style={styles.listTitleTxt} numberOfLines={1}>
                      {item?.node?.name || item?.title}
                    </Text>
                  </TouchableOpacity>
                ) : null;
              }}
            />
          </View>
        ) : (
          <Text style={styles.orangeTxt}>{Strings.connectToWatchEmpty}</Text>
        )}
      </ScrollView>
      {bottomShow &&
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
              <FlatList
                data={itemSelected?.rightsHoldersConnection?.edges || data}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{justifyContent: 'center'}}
                horizontal
                renderItem={({item, index}) => {
                  return item?.node?.weight > 1000 ? (
                    <View style={styles.bottomListContainer}>
                      <View style={styles.bottomInnerContainer}>
                        <View style={styles.bottomListBackground} />
                        <View style={styles.imageContainer}>
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
                          />
                        </View>
                      </View>
                      <Text style={styles.listTitleTxt2} numberOfLines={1}>
                        {item?.node?.name || item?.title}
                      </Text>
                    </View>
                  ) : null;
                }}
              />
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
    </ImageBackground>
  );
}
