import React, { useState } from 'react';
import { ImageBackground, Text, View, Image, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import styles from './styles';
import { Images, Colors } from 'src/utils';
import AppHeader from 'src/components/AppHeader';

const data = [
  { id: 1, img: Images.NBALogo, title: "Fubo" },
  { id: 2, img: Images.NBALogo, title: "ESPN" },
  { id: 3, img: Images.NBALogo, title: "Sling" },
  { id: 4, img: Images.NBALogo, title: "DAZN" },
]

export default function Watch(props) {
  const [item, setItem] = useState(props?.route?.params?.item)


  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar
        backgroundColor={Colors.mediumBlue} />
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        customLeftImage={{ tintColor: Colors.orange }}
        SimpleView
      />
      {/* Slider all pro  */}
      <View style={{ flex: 1 }}>

        <View
          style={styles.sliderContainer}>
          <View style={styles.itemListContiner}>
            <View style={styles.itemInnerContainer}>
              <View style={styles.itemContainer}>
                <Image source={item?.img} style={styles.imageIcon} resizeMode={"contain"} />
              </View>
              <View style={styles.userNameContainer}>
                <Text style={styles.eventTxt}>{item?.companyName}</Text>
                <Text style={styles.titleTxt}>{item?.title}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.eventTxt, { opacity: item.live ? 1 : 0.5 }]}>{item?.day}</Text>
                  <Text style={[styles.eventTxt, { opacity: item.live ? 1 : 0.5 }]}>{" " + item?.time}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.watchOptions}>Watch Options</Text>
        <Text style={styles.conectTxt}>Connect to Watch on These Apps or Services</Text>
        <View style={{ marginTop: 40, marginHorizontal: 20 }}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            horizontal
            renderItem={({ item, index }) => (
              <View style={[styles.listContiner]}>
                <ImageBackground source={Images.InActiveSliderBorder}
                  style={styles.imageContainer}>
                  <Image source={item?.img} style={styles.imageIcon} resizeMode={"contain"} />
                </ImageBackground>
                <Text style={styles.listTitleTxt}>{item?.title}</Text>

              </View>
            )} />
        </View>
      </View>
      <View style={{ height: 80, backgroundColor: "#1B55CF", borderTopWidth: 4, borderTopColor: Colors.lightGreen, justifyContent: "center", alignItems: "center", borderTopEndRadius: 120, borderTopStartRadius: 100 }}>
        <Image source={Images.Menu} style={{ width: 32, height: 12 }} />
        <Text style={[styles.watchOptions, { color: "white", marginTop: 12 }]}>Other ways to watch...</Text>
      </View>
    </ImageBackground>
  );
}
