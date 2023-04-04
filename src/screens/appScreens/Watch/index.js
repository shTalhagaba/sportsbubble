import React, { useState } from 'react';
import { ImageBackground, Text, View, Image, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import styles from './styles';
import { Images, Colors } from 'src/utils';
import AppHeader from 'src/components/AppHeader';

const data = [
  { id: 1, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: true, percentage: '25%' },
  { id: 2, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: true, percentage: '35%' },
  { id: 3, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: true, percentage: '45%' },
  { id: 4, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: false, percentage: '55%' },
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
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        horizontal
        renderItem={({ item, index }) => (
          <View style={[styles.listContiner]}>
            <View style={styles.innerContainer}>
              <View style={styles.imageContainer}>
                <Image source={item?.img} style={styles.imageIcon} resizeMode={"contain"} />
              </View>
            </View>
          </View>
        )} />
    </ImageBackground >
  );
}
