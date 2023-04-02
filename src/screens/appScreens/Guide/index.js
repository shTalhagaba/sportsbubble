import React, { useState } from 'react';
import { ImageBackground, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Images, Colors, Fonts } from 'src/utils';
import AppHeader from 'src/components/AppHeader';

const data = [
  { id: 1, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: true, percentage: '25%' },
  { id: 2, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: true, percentage: '35%' },
  { id: 3, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: true, percentage: '45%' },
  { id: 4, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: false, percentage: '55%' },
  { id: 5, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: false, percentage: '65%' },
]

export default function Guide() {

  const [allFlag, setAllFlag] = useState(true)
  const [proFlag, setProFlag] = useState(false)
  const [collegeFlag, setCollegeFlag] = useState(false)
  const [sportFlag, setSportFlag] = useState(false)

  const handleAll = () => {
    setAllFlag(true)
    setProFlag(false)
    setCollegeFlag(false)
    setSportFlag(false)
  }
  const handlePro = () => {
    setAllFlag(false)
    setProFlag(true)
    setCollegeFlag(false)
    setSportFlag(false)
  }
  const handleCollege = () => {
    setAllFlag(false)
    setProFlag(false)
    setCollegeFlag(true)
    setSportFlag(false)
  }
  const handleSport = () => {
    setAllFlag(false)
    setProFlag(false)
    setCollegeFlag(false)
    setSportFlag(true)
  }
  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <AppHeader centerImage={Images.Logo} />
      {/* Slider all pro  */}
      <View
        style={styles.sliderContainer}>
        <TouchableOpacity onPress={() => handleAll()}
          activeOpacity={0.8}
          style={[styles.sliderInnerContainer,
          {
            borderColor: allFlag ? "#094db1" : '#152232',
            backgroundColor: allFlag ? "#072971" : '#21334b',
          }]}>
          <Image
            source={Images.Trophy}
            style={styles.sliderIcon}
            resizeMode={'contain'} />
          <Text style={styles.sliderTxt}>ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePro()}
          activeOpacity={0.8}
          style={[styles.sliderInnerContainer,
          {
            borderColor: proFlag ? "#094db1" : '#152232',
            backgroundColor: proFlag ? "#072971" : '#21334b',
          }]}>
          <Image
            source={Images.Crown}
            style={styles.sliderIcon}
            resizeMode={'contain'} />
          <Text style={styles.sliderTxt}>PRO</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCollege()}
          activeOpacity={0.8}
          style={[styles.sliderInnerContainer,
          {
            borderColor: collegeFlag ? "#094db1" : '#152232',
            backgroundColor: collegeFlag ? "#072971" : '#21334b',
          }]}>
          <Image
            source={Images.College}
            style={styles.sliderIcon}
            resizeMode={'contain'} />
          <Text style={styles.sliderTxt}>COLLEGE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSport()}
          activeOpacity={0.8}
          style={[styles.sliderInnerContainer,
          {
            borderColor: sportFlag ? "#094db1" : '#152232',
            backgroundColor: sportFlag ? "#072971" : '#21334b',
          }]}>
          <Image
            source={Images.Game}
            style={styles.sliderIcon}
            resizeMode={'contain'} />
          <Text style={styles.sliderTxt}>ESPORTS</Text>
        </TouchableOpacity>
      </View>
      {/* time slider */}
      <View style={{ height: 40, backgroundColor: Colors.darkGrey }}></View>
      <View style={{ flex: 1, }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.listContiner}>
              <View style={styles.innerContainer}>
                <View style={styles.imageContainer}>
                  <Image source={item?.img} style={styles.imageIcon} resizeMode={"contain"} />
                </View>
                <View style={item.live ? {
                  width: item.percentage,
                  backgroundColor: Colors.green,
                } : {
                  width: item.percentage,
                  backgroundColor: Colors.darkGrey,
                }}>
                </View>
                <View style={item.live ? {
                  flex: 1,
                  backgroundColor: Colors.darkGrey,
                } : {
                  flex: 1,
                  backgroundColor: Colors.blueGrey,
                }}>
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
    </ImageBackground >
  );
}
