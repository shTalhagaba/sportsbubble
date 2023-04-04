import React, { useState } from 'react';
import { ImageBackground, Text, View, Image, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import styles from './styles';
import { Images, Colors } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: 1, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: true, percentage: '25%' },
  { id: 2, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: true, percentage: '35%' },
  { id: 3, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: true, percentage: '45%' },
  { id: 4, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: false, percentage: '55%' },
  { id: 5, img: Images.NBALogo, companyName: "NCAA Women's Soccer", title: "Oregon at Washington", day: "Thu. 2/9", time: "5:00pm - 7:30pm", live: false, percentage: '65%' },
]
const timeArr = [
  { id: 1, title: "Live", selected: true },
  { id: 2, title: "5 pm", selected: false },
  { id: 3, title: "6 pm", selected: false },
  { id: 4, title: "7 pm", selected: false },
  { id: 5, title: "8 pm", selected: false },
]

export default function Guide() {
  const navigation = useNavigation();

  const [allFlag, setAllFlag] = useState(true)
  const [proFlag, setProFlag] = useState(false)
  const [collegeFlag, setCollegeFlag] = useState(false)
  const [sportFlag, setSportFlag] = useState(false)
  const [timeData, setTimeData] = useState(timeArr)

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
  const handleSelectTime = (item, index) => {
    let list = [...timeData]
    list.map((element) => {
      element.selected = false
    })
    list[index].selected = !list[index].selected
    setTimeData(list)



  }
  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar
        backgroundColor={Colors.mediumBlue} />
      <AppHeader centerImage={Images.Logo} />
      {/* Slider all pro  */}
      <View
        style={styles.sliderContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleAll()}
          style={styles.sliderInnerContainer}>
          <ImageBackground source={allFlag ? Images.ActiveSliderBack : Images.InActiveSliderBorder} style={styles.sliderImageBackground} resizeMode={"contain"}>
            <Image
              source={Images.Trophy}
              style={styles.sliderIcon}
              resizeMode={'contain'} />
            <Text style={styles.sliderTxt}>ALL</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handlePro()}
          style={styles.sliderInnerContainer}>
          <ImageBackground source={proFlag ? Images.ActiveSliderBack : Images.InActiveSliderBorder} style={styles.sliderImageBackground} resizeMode={"contain"}>
            <Image
              source={Images.Crown}
              style={styles.sliderIcon}
              resizeMode={'contain'} />
            <Text style={styles.sliderTxt}>PRO</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleCollege()}
          style={styles.sliderInnerContainer}>
          <ImageBackground source={collegeFlag ? Images.ActiveSliderBack : Images.InActiveSliderBorder} style={styles.sliderImageBackground} resizeMode={"contain"}>
            <Image
              source={Images.College}
              style={styles.sliderIcon}
              resizeMode={'contain'} />
            <Text style={styles.sliderTxt}>COLLEGE</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleSport()}
          style={styles.sliderInnerContainer}>
          <ImageBackground source={sportFlag ? Images.ActiveSliderBack : Images.InActiveSliderBorder} style={styles.sliderImageBackground} resizeMode={"contain"}>
            <Image
              source={Images.Game}
              style={styles.sliderIcon}
              resizeMode={'contain'} />
            <Text style={styles.sliderTxt}>ESPORTS</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      {/* time slider */}
      <View style={styles.timeSliderContainer}>
        <View style={styles.timeSliderInnerContainer}>
          <FlatList
            horizontal
            data={timeData}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleSelectTime(item, index)}
                style={[styles.timeContainer, { backgroundColor: item?.selected ? Colors?.mediumGreen : Colors.mediumBlue }]}>
                <Text style={
                  item?.selected ?
                    styles.sliderActiveTimeTxt :
                    styles.sliderInactiveTimeTxt
                }>{item?.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <TouchableOpacity style={styles.nextContainer}>
          <Image source={Images.Arrow} style={styles.rightIcon} resizeMode={"contain"} />
        </TouchableOpacity>
      </View>
      {/* main list  */}
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.listContiner} onPress={()=>navigation.navigate('Watch',{item:item})}>
            <View style={styles.innerContainer}>
              <View style={styles.imageContainer}>
                <Image source={item?.img} style={styles.imageIcon} resizeMode={"contain"} />
              </View>
              <View style={item.live ? {
                width: item.percentage,
                backgroundColor: Colors.mediumGreen,
              } : {
                width: item.percentage,
                backgroundColor: Colors.darkBlue,
              }}>
              </View>
              <View style={item.live ? {
                flex: 1,
                backgroundColor: Colors.darkBlue,
              } : {
                flex: 1,
                backgroundColor: Colors.mediumBlue,
              }}>
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
          </TouchableOpacity>
        )} />


    </ImageBackground >
  );
}
