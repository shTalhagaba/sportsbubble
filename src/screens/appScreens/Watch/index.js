import React, { useState } from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from './styles';
import { Images, Colors, Strings } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

const data = [
  { id: 1, img: Images.NBALogo, title: 'Fubo' },
  { id: 2, img: Images.NBALogo, title: 'ESPN' },
  { id: 3, img: Images.NBALogo, title: 'Sling' },
  { id: 4, img: Images.NBALogo, title: 'DAZN' },
];

export default function Watch(props) {
  const navigation = useNavigation();
  const [itemSelected, setItemSelected] = useState(props?.route?.params?.item);
  const [bottomMenu, setBottomMenu] = useState(false);

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
        // customLeftImage={{tintColor: Colors.orange}}
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
                  source={
                    itemSelected?.logo1
                      ? { uri: itemSelected?.logo1 }
                      : itemSelected?.img
                  }
                  style={styles.imageIcon}
                  resizeMode={'contain'}
                />
              </View>
              <View style={styles.userNameContainer}>
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
            <Text style={styles.conectTxt}>{Strings.connectToWatch}</Text>
            <FlatList
              data={itemSelected?.rightsHoldersConnection?.edges || data}
              showsVerticalScrollIndicator={false}
              horizontal
              contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('withoutBottomtab', {
                      screen: 'Connect',
                      params: { item: itemSelected },
                    })
                  }>
                  <View style={{ alignItems: 'center', marginTop: 25, }}>
                    <ImageBackground
                      source={Images.InActiveSliderBorder}
                      resizeMode="cover"
                      style={styles.backImageContainer}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={
                            item?.node?.logoUrl
                              ? { uri: item?.node?.logoUrl }
                              : Images.NBALogo
                          }
                          style={styles.imageRightsIcon}
                          resizeMode={'contain'}
                        />
                      </View>
                    </ImageBackground>
                    <Text style={styles.listTitleTxt} numberOfLines={1}>
                      {item?.node?.name || item?.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <Text style={styles.orangeTxt}>{Strings.connectToWatchEmpty}</Text>
        )}
      </View>
      {/* Bottom Menu circle */}
      {bottomMenu ? (
        <ImageBackground
          source={Images.CircleBGLarge}
          resizeMode={'stretch'}
          style={styles.largeMenuImage}>
          <TouchableOpacity onPress={() => setBottomMenu(false)}>
            <Image source={Images.Menu} style={styles.menuBtn} />
          </TouchableOpacity>
          <Text style={styles.wayToWatch}>{Strings.otherWays}</Text>
          <View style={{ marginTop: 1, marginHorizontal: 1 }}>
            <FlatList
              data={itemSelected?.rightsHolders || data}
              showsVerticalScrollIndicator={false}
              horizontal
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('withoutBottomtab', {
                      screen: 'Connect',
                      params: { item: itemSelected },
                    })
                  }
                  style={styles.listBottomContainer}>
                  <ImageBackground
                    source={Images.InActiveSliderBorder}
                    style={styles.backImageContainer}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={
                          item?.logoUrl ? { uri: item?.logoUrl } : Images.NBALogo
                        }
                        style={styles.imageRightsIcon}
                        resizeMode={'contain'}
                      />
                    </View>
                  </ImageBackground>
                  {/* <Text style={styles.listTitleTxt}>
                    {item?.name || item?.title}
                  </Text> */}
                </TouchableOpacity>
              )}
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
      )}
    </ImageBackground>
  );
}
