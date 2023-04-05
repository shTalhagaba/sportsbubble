import React, { useState } from 'react';
import { ImageBackground, Text, View, Image, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import styles from './styles';
import { Images, Colors } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: 1, img: Images.NBALogo, title: "Fubo" },
  { id: 2, img: Images.NBALogo, title: "ESPN" },
  { id: 3, img: Images.NBALogo, title: "Sling" },
  { id: 4, img: Images.NBALogo, title: "DAZN" },
]

export default function Watch(props) {
  const navigation = useNavigation()
  const [itemSelected, setItemSelected] = useState(props?.route?.params?.item)
  const [bottomMenu, setBottomMenu] = useState(false)


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
                <Image source={itemSelected?.img} style={styles.imageIcon} resizeMode={"contain"} />
              </View>
              <View style={styles.userNameContainer}>
                <Text style={styles.eventTxt}>{itemSelected?.companyName}</Text>
                <Text style={styles.titleTxt}>{itemSelected?.title}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.eventTxt, { opacity: itemSelected.live ? 1 : 0.5 }]}>{itemSelected?.day}</Text>
                  <Text style={[styles.eventTxt, { opacity: itemSelected.live ? 1 : 0.5 }]}>{" " + itemSelected?.time}</Text>
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
              <TouchableOpacity onPress={()=>navigation.navigate('Connect',{item:itemSelected})} style={[styles.listContiner]}>
                <ImageBackground source={Images.InActiveSliderBorder}
                  style={styles.imageContainer}>
                  <Image source={item?.img} style={styles.imageIcon} resizeMode={"contain"} />
                </ImageBackground>
                <Text style={styles.listTitleTxt}>{item?.title}</Text>

              </TouchableOpacity>
            )} />
        </View>
      </View>
      {bottomMenu?
      <ImageBackground 
      source={Images.CircleBGLarge}
      resizeMode={'stretch'}
      style={{width:'100%',height:250, alignItems: "center",justifyContent:'flex-start', paddingTop: 20}}>
        <TouchableOpacity onPress={()=>setBottomMenu(false)}>
        <Image source={Images.Menu} style={{ width: 32, height: 12 }} />
        </TouchableOpacity>
        <Text style={[styles.wayToWatch, { color: "white", marginTop: 12 }]}>Other ways to watch...</Text>
        <View style={{ marginTop: 1, marginHorizontal: 1 }}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            horizontal
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={()=>navigation.navigate('Connect',{item:itemSelected})} style={[styles.listContiner]}>
                <ImageBackground source={Images.InActiveSliderBorder}
                  style={styles.imageContainer}>
                  <Image source={item?.img} style={styles.imageIcon} resizeMode={"contain"} />
                </ImageBackground>
                <Text style={styles.listTitleTxt}>{item?.title}</Text>
              </TouchableOpacity>
            )} />
        </View>
      </ImageBackground>
      :
      <ImageBackground 
      source={Images.CircleBG}
      resizeMode={'stretch'}
      style={{width:'100%',height: 80, justifyContent: "center", alignItems: "center",}}>
        <TouchableOpacity onPress={()=>setBottomMenu(true)}>
        <Image source={Images.Menu} style={{ width: 32, height: 12 }} />
        </TouchableOpacity>
        <Text style={[styles.wayToWatch, { color: "white", marginTop: 12 }]}>Other ways to watch...</Text>
      </ImageBackground>}
    </ImageBackground>
  );
}
