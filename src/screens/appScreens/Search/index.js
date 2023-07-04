import React, {useState} from 'react';
import {
  FlatList,
  ImageBackground,
  View,
  Image,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {Images, Colors} from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import AppSearch from 'src/components/AppSearch';
import {useQuery} from '@apollo/client';
import {SEARCH_EVENTS_QUERY} from './queries';
import dayjs from 'dayjs';

const data = [
  {
    id: 1,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
  },
  {
    id: 2,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
  },
  {
    id: 3,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
  },
  {
    id: 4,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
  },
  {
    id: 5,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
  },
];

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [startTime, setStartTime] = useState(
    dayjs(new Date()).subtract(2, 'day').toISOString(),
  );
  const [endTime, setEndTime] = useState(
    dayjs(new Date()).add(1, 'day').toISOString(),
  );

  const {loading, refetch, error,data} = useQuery(SEARCH_EVENTS_QUERY, {
    variables: {
      searchString: searchText,
      startTime: startTime,
      endTime: endTime,
      // startTime: '2023-06-04T20:30:00.000Z',
      // endTime: '2023-06-04T22:30:00.000Z',
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: error => {
      console.log('error : ', error);
    },
  });

  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar backgroundColor={Colors.mediumBlue} />
      {/* Header with Logo and back icon  */}
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        customLeftImage={{tintColor: Colors.orange}}
        SimpleView
      />
      <View style={styles.mainContainer}>
        {/* Search text box */}
        <AppSearch
          searchImage={Images.Search}
          placeHolderColor={Colors.white}
          placeHolder={'Search...'}
          closeImage={Images.Cross}
          onPressCloseImage={()=>setSearchText('')}
          value={searchText}
          onChangeText={(text)=>setSearchText(text)}
        />
        {/* list showing after search */}
        {!loading ? (
          <FlatList
            data={data && data?.searchEvent && data?.searchEvent.length > 0 ? data?.searchEvent : data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.listContiner}>
                <View style={styles.innerContainer}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={item?.logo1 ? {uri: item?.logo1} : item?.img}
                      style={styles.imageIcon}
                      resizeMode={'contain'}
                    />
                  </View>
                  <View style={styles.userNameContainer}>
                    <Text style={styles.eventTxt}>{item?.line1 ? item?.line1 : item?.companyName}</Text>
                    <Text style={styles.titleTxt}>{item?.line2 ? item?.line2 : item?.title}</Text>
                    <View style={styles.innerContainer}>
                      <Text style={styles.eventTxt}>{' ' + item?.startTime
                        ? dayjs(item?.startTime).format('ddd. MM/D')
                        : item?.day}{' '}</Text>
                      <Text style={styles.eventTxt}>  {' ' + item?.startTime
                        ? dayjs(item?.startTime).format('h:mm A') +
                          ' - ' +
                          dayjs(item?.endTime).format('h:mm A')
                        : item?.time}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item,index)=>item?.id}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </ImageBackground>
  );
}
