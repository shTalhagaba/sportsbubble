import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import AppHeader from 'src/components/AppHeader';
import {Images, Colors} from 'src/utils';
import Strings from 'src/utils/strings';
import AppSearch from 'src/components/AppSearch';
import { sportStreamingList } from 'src/utils/list';


export default function SportStreaming() {
  const [mySportData, setSportData] = useState(sportStreamingList);
  const handleSelectSports = (item, index) => {
    let list = [...mySportData];
    list[index].selected = !list[index].selected;
    setSportData(list);
  };

  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar backgroundColor={Colors.mediumBlue} />
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        customLeftImage={{tintColor: Colors.darkOrange}}
        SimpleView
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTxt}>{Strings.sportStreaming}</Text>
        <Text style={styles.desTxt}>{Strings.sportStreamingDes}</Text>
        {/* Search text box */}
        <View style={styles.innerContainer}>
          <AppSearch
            searchImage={Images.Search}
            placeHolderColor={Colors.white}
            placeHolder={'Search...'}
            closeImage={Images.Cross}
          />
          {/* main list */}
          <FlatList
            data={mySportData}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View style={styles.listContainer}>
                <View style={styles.innerListContainer}>
                  <Image
                    source={item?.img}
                    style={styles.imageIcon}
                    resizeMode={'contain'}
                  />
                  <View style={styles.userNameContainer}>
                    <Text style={styles.titleTxt}>{item?.title}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleSelectSports(item, index)}
                    style={styles.uncheckBox}>
                    {item?.selected && (
                      <Image source={Images.Tick} style={styles.tickImage} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
