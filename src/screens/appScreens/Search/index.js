import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  View,
  Image,
  Text,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {Images, Colors} from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import AppSearch from 'src/components/AppSearch';
import {useQuery} from '@apollo/client';
import {SEARCH_EVENTS_QUERY} from './queries';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const expireTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function Search() {
  const navigation = useNavigation();
  const textInputRef = useRef();
  const reduxData = useSelector(state => state.user);
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  const [startTime, setStartTime] = useState(dayjs(new Date()).toISOString());
  const [endTime, setEndTime] = useState(
    dayjs(new Date()).add(7, 'day').toISOString(),
  );

  useEffect(() => {
    if (textInputRef.current) {
      const unsubscribe = navigation.addListener('focus', () => {
        textInputRef.current?.focus();
      });
      return unsubscribe;
    }
  }, [navigation, textInputRef.current]);

  useEffect(() => {
    const currentTime = Date.now();
    if (
      (reduxData && reduxData?.expire === currentTime) ||
      (reduxData && reduxData?.eventList && reduxData?.eventList.length <= 0)
    ) {
      const {loading, refetch, error, data} = useQuery(SEARCH_EVENTS_QUERY, {
        variables: {
          searchString: searchText,
          startTime: startTime,
          endTime: endTime,
        },
        onCompleted: data => {
          if (data && data?.sortedEvents.length > 0) {
            dispatch(setStoreEventList(data?.sortedEvents));
            dispatch(setExpire(expireTime));
          }
        },
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,

        onError: error => {
          console.log('error : ', error);
        },
      });
    }
  }, [navigation]);

  const handleInputChange = text => {
    setSearchText(text);
    console.log('eventList: ', reduxData?.eventList.length);
    if (
      text &&
      text.length > 0 &&
      reduxData &&
      reduxData.eventList &&
      reduxData.eventList.length > 0
    ) {
      const filtered = reduxData.eventList.filter(item => {
        for (const key in item) {
          const value = item[key];
          if (
            value !== null &&
            typeof value === 'string' &&
            value.toLowerCase().includes(text.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
      console.log('filtered: ', filtered);
      setList(filtered);
    }
  };

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
        SimpleView
      />
      <View style={styles.mainContainer}>
        {/* Search text box */}
        <AppSearch
          searchImage={Images.Search}
          placeHolderColor={Colors.white}
          placeHolder={'Search...'}
          closeImage={Images.Cross}
          refInner={textInputRef}
          onPressCloseImage={() => setSearchText('')}
          value={searchText}
          onChangeText={text => handleInputChange(text)}
        />
        {/* list showing after search */}
        <FlatList
          data={
            searchText.length > 0 ? list : []
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View>
              <Text style={styles.emptyTxt}>
                {
                  'Search by Event, Team, League or Sport to Find Event Watch Information'
                }
              </Text>
            </View>
          }
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.listContiner}
              onPress={() => navigation.navigate('Watch', {item: item})}>
              <View style={styles.innerContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    source={item?.logo1 ? {uri: item?.logo1} : item?.img}
                    style={styles.imageIcon}
                    resizeMode={'contain'}
                  />
                </View>
                <View style={styles.userNameContainer}>
                  <Text style={styles.eventTxt}>
                    {item?.line1 ? item?.line1 : item?.companyName}
                  </Text>
                  <Text style={styles.titleTxt} numberOfLines={1}>
                    {item?.line2 ? item?.line2 : item?.title}
                  </Text>
                  <View style={styles.innerContainer}>
                    <Text style={styles.eventTxt}>
                      {' ' + item?.startTime
                        ? dayjs(item?.startTime).format('ddd. MM/D')
                        : item?.day}{'  l '}
                    </Text>
                    <Text style={styles.eventTxt}>
                      {' '}
                      {' ' + item?.startTime
                        ? dayjs(item?.startTime).format('h:mma') +
                          ' - ' +
                          dayjs(item?.endTime).format('h:mma')
                        : item?.time}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item?.id}
        />
        {/* ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator color={'#fff'} size={'large'} />
          </View>
        )} */}
      </View>
    </ImageBackground>
  );
}
