import React from 'react';
import {ImageBackground, Text, View, Image, FlatList} from 'react-native';
import styles from './styles';
import {Images, Colors, Fonts} from 'src/utils';
import AppHeader from 'src/components/AppHeader';

const data = [
    { id: 1, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: true, percentage: '25%' },
    { id: 2, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: true, percentage: '35%' },
    { id: 3, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: true, percentage: '45%' },
    { id: 4, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: false, percentage: '55%' },
    { id: 5, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: false, percentage: '65%'},
  ]

export default function Guide() {
  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <AppHeader centerImage={Images.Logo} />
      {/* Slider all pro  */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 1,
          backgroundColor: Colors.blueGrey,
          padding: 10,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
            alignItems: 'center',
            paddingVertical: 12,
            borderColor: 'black',
            borderWidth: 2,
            marginHorizontal: 8,
            borderRadius: 20,
          }}>
          <Image
            source={Images.Search}
            style={{height: 20, width: 20, paddingVertical: 15}}
            resizeMode={'contain'}
          />
          <Text style={{marginTop: 5}}>ALL</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'green',
            alignItems: 'center',
            paddingVertical: 12,
            borderColor: 'black',
            borderWidth: 2,
            marginHorizontal: 8,
            borderRadius: 20,
          }}>
          <Image
            source={Images.Search}
            style={{height: 20, width: 20, paddingVertical: 15}}
            resizeMode={'contain'}
          />

          <Text>PRO</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
            alignItems: 'center',
            paddingVertical: 12,
            borderColor: 'black',
            borderWidth: 2,
            marginHorizontal: 8,
            borderRadius: 20,
          }}>
          <Image
            source={Images.Search}
            style={{height: 20, width: 20, paddingVertical: 15}}
            resizeMode={'contain'}
          />

          <Text>COLLEGE</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'green',
            alignItems: 'center',
            paddingVertical: 12,
            borderColor: 'black',
            borderWidth: 2,
            marginHorizontal: 8,
            borderRadius: 20,
          }}>
          <Image
            source={Images.Search}
            style={{height: 20, width: 20, paddingVertical: 15}}
            resizeMode={'contain'}
          />

          <Text>ESPORTS</Text>
        </View>
      </View>
      {/* time slider */}
      <View style={{height: 40,backgroundColor:'red'}}></View>
      <View style={{flex: 1,}}>
      <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.listContiner}>
              <View style={styles.innerContainer}>
                <View style={styles.imageContainer}>
                  <Image source={item?.img} style={styles.imageIcon} resizeMode={"contain"} />
                </View>
                <View style={item.live? {  width: item.percentage,
        backgroundColor: Colors.green,}:{ width: item.percentage,
            backgroundColor: Colors.darkGrey,}}>
                </View>
                <View style={item.live? {  flex: 1,
        backgroundColor: Colors.darkGrey,}:{ flex: 1,
            backgroundColor: Colors.blueGrey,}}>
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
