import React, { useState } from 'react';
import { ImageBackground, Text, View, Image, FlatList, StatusBar } from 'react-native';
import styles from './styles';
import { Images, Colors } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import GreenButton from 'src/components/GreenButton';

export default function Connect(props) {
  const [item, setItem] = useState(props?.route?.params?.item)
  console.log('SettingNavigation : ',props?.route?.params?.item)
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
        <View style={{ alignItems: "center",justifyContent:'center',}}>
          <Image 
          source={Images.Logo}
          resizeMode={"contain"}
          style={{height:100, marginTop: 40,}} />
        </View>
        <Text style={styles.connectingText}>Connecting You To:</Text>
        <View style={{ marginTop: 40, marginHorizontal: 20 }}>
        <GreenButton title={'Watch Now'} rightIcon={true} />
        </View>
      </View>
      <View style={{ alignItems: "center",justifyContent:'center',}}>
      <Image 
      source={Images.PoweredBySB}
      style={{height:150, alignItems: "center",justifyContent:'center', paddingTop: 20,}} />
    </View>
    </ImageBackground>
  );
}
