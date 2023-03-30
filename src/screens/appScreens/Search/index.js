import React from 'react';
import { FlatList, ImageBackground, View, Image, Text } from 'react-native';
import styles from './styles';
import { Images, Colors, Fonts } from 'src/utils';
import AppHeader from 'src/components/AppHeader'
import AppSearch from 'src/components/AppSearch';

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
        <AppSearch
          searchImage={Images.Search}
          placeHolderColor={Colors.white}
          placeHolder={"Search..."}
          closeImage={Images.Cross} />
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.listContiner}>
              <View style={styles.innerContainer}>
                <View style={styles.imageContainer}>
                  <Image source={item?.img} style={styles.imageIcon} resizeMode={"contain"} />
                </View>
                <View style={styles.userNameContainer}>
                  <Text style={{ color: 'white' }}>{item?.companyName}</Text>
                  <Text style={styles.titleTxt}>{item?.title}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: 'white' }}>{item?.day}</Text>
                    <Text style={{ color: 'white' }}>{" " + item?.time}</Text>
                  </View>
                </View>
              </View>
            </View>
          )} />
      </View>


    </ImageBackground>
  );
}
