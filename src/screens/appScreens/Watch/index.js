import React, { useState } from 'react';
import { ImageBackground, Text, View, Image, FlatList, TouchableOpacity, StatusBar, } from 'react-native';
import styles from './styles';
import { Images, Colors, Strings } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { useNavigation } from '@react-navigation/native';

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
        customLeftImage={{ tintColor: Colors.orange }}
        SimpleView
      />
      {/* Main View */}
      <View style={styles.flexOnly}>
        <View style={styles.sliderContainer}>
          <View style={styles.itemListContiner}>
            <View style={styles.itemInnerContainer}>
              <View style={styles.itemContainer}>
                <Image
                  source={itemSelected?.img}
                  style={styles.imageIcon}
                  resizeMode={'contain'}
                />
              </View>
              <View style={styles.userNameContainer}>
                <Text style={styles.eventTxt}>{itemSelected?.companyName}</Text>
                <Text style={styles.titleTxt}>{itemSelected?.title}</Text>
                <View style={styles.itemInnerContainer}>
                  <Text
                    style={[
                      styles.eventTxt,
                      { opacity: itemSelected.live ? 1 : 0.5 },
                    ]}>
                    {itemSelected?.day}
                  </Text>
                  <Text
                    style={[
                      styles.eventTxt,
                      { opacity: itemSelected.live ? 1 : 0.5 },
                    ]}>
                    {' ' + itemSelected?.time}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.watchOptions}>{Strings.watchOptions}</Text>
        <Text style={styles.conectTxt}>{Strings.connectToWatch}</Text>
        <View style={styles.flatlistContainer}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            horizontal
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Connect', { item: itemSelected })}>
                <View style={{ alignItems: "center" }}>
                  <ImageBackground
                    source={Images.InActiveSliderBorder}
                    style={styles.imageContainer}>
                    <Image
                      source={item?.img}
                      style={styles.imageIcon}
                      resizeMode={'contain'}
                    />
                  </ImageBackground>
                  <Text style={styles.listTitleTxt}>{item?.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
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
          <Text style={styles.wayToWatch}>
            {Strings.otherWays}
          </Text>
          <View style={{ marginTop: 1, marginHorizontal: 1 }}>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              horizontal
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Connect', { item: itemSelected })
                  }
                  style={styles.listContiner}>
                  <ImageBackground
                    source={Images.InActiveSliderBorder}
                    style={styles.imageContainer}>
                    <Image
                      source={item?.img}
                      style={styles.imageIcon}
                      resizeMode={'contain'}
                    />
                  </ImageBackground>
                  <Text style={styles.listTitleTxt}>{item?.title}</Text>
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
          <Text style={styles.wayToWatch}>
            {Strings.otherWays}
          </Text>
        </ImageBackground>
      )}
    </ImageBackground>
  );
}
