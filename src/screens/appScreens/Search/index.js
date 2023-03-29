import React from 'react';
import { FlatList, ImageBackground, View, Image, Text } from 'react-native';
import styles from './styles';
import { Images, Colors, Fonts } from 'src/utils';
import AppHeader from 'src/components/AppHeader'

const data = [
  { id: 1, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm" },
  { id: 2, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm" },
  { id: 3, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm" },
  { id: 4, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm" },
  { id: 5, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm" },
]


export default function Search() {
  return (
    <ImageBackground source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        customLeftImage={{ tintColor: Colors.orange }}
        SimpleView />
      <View style={{ flex: 1, marginHorizontal: 20 }}>


        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.listContiner}>
              <View style={styles.innerContainer}>
                <View style={{ height: 80, width: 80, backgroundColor: "#22364f", justifyContent: "center", alignItems: "center" }}>
                  <Image source={item?.img} style={{ height: 50, width: 50 }} />
                </View>
                <View style={styles.userNameContainer}>
                  <Text>{item?.companyName}</Text>
                  <Text >{item?.title}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text>{item?.day}</Text>
                    <Text>{item?.time}</Text>

                  </View>
                </View>
              </View>
            </View>
          )} />
      </View>


    </ImageBackground>
  );
}
