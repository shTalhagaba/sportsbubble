import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  View,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Platform,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import { Images, Colors, Constants, Strings } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { useQuery } from '@apollo/client';
import { SEARCH_EVENTS_QUERY } from './queries';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ImageWithPlaceHolder from 'src/components/ImageWithPlaceHolder';
import strings from 'src/utils/strings';
import Config from 'react-native-config';
import { getCurrent7DaysTime } from 'src/utils/functions';
const expireTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function Search(props) {
  const navigation = useNavigation();
  const reduxData = useSelector(state => state.user);
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  // const [startTime, setStartTime] = useState(dayjs(new Date()));
  // const [endTime, setEndTime] = useState(
  //   dayjs(new Date()).add(7, 'day'),
  // );
  const [isFocused, setIsFocused] = useState(true);
  const [searchFlag, setSearchFlag] = useState(true);
  const stageToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJodHRwczovL2Rldi0zNTM5MjYyLm9rdGEuY29tL29hdXRoMi92MS90b2tlbiIsImlzcyI6IjBvYTlrN2RpYWRqOUxJN0tkNWQ2Iiwic3ViIjoiMG9hOWs3ZGlhZGo5TEk3S2Q1ZDYifQ.sJCxcymR_X_OtWCZxJ5_AfUbWvKkd1ML8JW-Wl91xV8uJ2paw067kEgfR7QYz6dk3-1-egBjyf1Mifm1cTN1S8JPpkd1NN1Aw6uuky3lt5jmjeHwwqL-XHzIkSjLN_t8zdO5OpDqtlbEqyNGtJFCONJ9K-hCjp7u5FWCZ1nKwIK3X1w-FVjRDLbvJrTrh8IJriqPhiWHfkGbz-jm6yStYXMw3uhcKd164RA2l8utz4jnVRn9ebcOiN_BQb3yvtqBc0CsxB6YKQmmW7Rbpg8cRU3B1zfLfMMu2QVPLYr5vDD2mhK1PwixUZ6UnYrYirXWNNTqyZquGZPQWpIlY9sIwA'
  const { startTime, endTime } = getCurrent7DaysTime()

  const { loading, refetch, error, data } = useQuery(SEARCH_EVENTS_QUERY, {
    variables: {
      searchString: searchText,
      startTime: startTime,
      endTime: endTime,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    context: {
      headers: {
        authorization:
          Platform.OS === "android" ? `Bearer ${stageToken}` :
            Config?.BEARER_TOKEN
              ? `Bearer ${Config?.BEARER_TOKEN}`
              : '',
      },
    },
    onError: error => {
      console.log('error : ', error);
    },
  });

  useEffect(() => {
    if (searchText && searchText.length > 0) {
      refetch()
    }
  }, [searchText])


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputRef = useRef(null);

  // useEffect(() => {
  //   const currentTime = Date.now();
  //   if (
  //     (reduxData && reduxData?.expire === currentTime) ||
  //     (reduxData && reduxData?.eventList && reduxData?.eventList.length <= 0)
  //   ) {
  //     const { loading, refetch, error, data } = useQuery(SEARCH_EVENTS_QUERY, {
  //       variables: {
  //         searchString: searchText,
  //         startTime: startTime,
  //         endTime: endTime,
  //       },
  //       onCompleted: data => {
  //         if (data && data?.sortedEvents.length > 0) {
  //           dispatch(setStoreEventList(data?.sortedEvents));
  //           dispatch(setExpire(expireTime));
  //         }
  //       },
  //       fetchPolicy: 'network-only',
  //       notifyOnNetworkStatusChange: true,
  //       context: {
  //         headers: {
  //           authorization:
  //             Platform.OS === "android" ? `Bearer ${stageToken}` :
  //               Config?.BEARER_TOKEN
  //                 ? `Bearer ${Config?.BEARER_TOKEN}`

  //                 : '',
  //         },
  //       },
  //       onError: error => {
  //         console.log('error : ', error);
  //       },
  //     });
  //   }
  // }, [navigation]);

  const handleInputChange = text => {
    setSearchText(text);
    // if (
    //   text &&
    //   text.length > 0 &&
    //   reduxData &&
    //   reduxData.eventList &&
    //   reduxData.eventList.length > 0
    // ) {
    //   const filtered = reduxData.eventList.filter(item => {
    //     for (const key in item) {
    //       const value = item[key];
    //       if (
    //         value !== null &&
    //         typeof value === 'string' &&
    //         value.toLowerCase().includes(text.toLowerCase())
    //       ) {
    //         return true;
    //       }
    //     }
    //     return false;
    //   });
    //   console.log('filtered: ', filtered);
    //   setList(filtered);
    // }
  };
  const handleDone = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    onPressTouch();
  }, [isFocused]);
  const onPressTouch = () => {
    if (!isFocused) {
      setTimeout(() => {
        inputRef?.current?.focus();
        // setIsFocused(false)

        Keyboard.dismiss();
      }, 100); // Delay the focus call to ensure proper rendering
    }
  };

  const handleClear = () => {
    setSearchText('');
    setIsFocused(false);
    setSearchFlag(false);
  };

  return (
    <ImageBackground
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar
        backgroundColor={Colors.transparent}
        translucent
        barStyle="light-content"
      />
      {/* Header with Logo and back icon  */}
      <AppHeader
        centerImage={Images.Logo}
        LeftImage={Images.LeftIcon}
        onPressBack={() =>
          navigation.navigate('Guide', {
            screen: 'Guide',
          })
        }
        SimpleView
      />
      <View style={styles.mainContainer}>
        {/* Search text box */}
        <TouchableOpacity
          onPress={() => setIsFocused(true)}
          style={[
            styles.searchContainer,
            isFocused ? styles.focus : styles.blur,
          ]}>
          <View style={{ flex: 1 }}>
            {isFocused && (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: Platform.OS === 'ios' ? -5 : 5,
                  marginLeft: 15,
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.Search}
                  style={styles.searchImageTwo}
                  resizeMode={'contain'}
                />
                <Text style={styles.searchTxt}>{strings.search}</Text>
              </View>
            )}
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                marginLeft: 12,
              }}>
              {!isFocused && (
                <Image
                  source={Images.Search}
                  style={styles.searchImage}
                  resizeMode={'contain'}
                />
              )}
              <TextInput
                style={styles.inputField}
                onFocus={handleFocus}
                autoFocus={true}
                placeholder={!isFocused ? 'Search' : ''}
                placeholderTextColor={Colors.white}
                value={searchText}
                onChangeText={handleInputChange}
                onSubmitEditing={handleDone}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleClear}>
            <Image
              source={Images.Cross}
              style={styles.crossImage}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        {/* list showing after search */}
        {searchText.length > 0 && loading ?
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator color={'#fff'} size={'large'} />
          </View> :
          <FlatList
            data={searchText.length > 0 ? data?.searchEvent : []}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View>
                <Text style={styles.emptyTxt}>
                  {searchText.length > 0 && data?.searchEvent && data?.searchEvent.length <= 0
                    ? Strings.emptyEventsSearchList
                    : Strings.emptySearchList}
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              new Date(item?.endTime) >= new Date() &&
              <TouchableOpacity
                style={styles.listContainer}
                onPress={() => {
                  if (
                    item &&
                    item?.rightsHoldersConnection &&
                    item?.rightsHoldersConnection?.totalCount === 1
                  ) {
                    navigation.navigate('withoutBottomtab', {
                      screen: 'Connect',
                      params: {
                        item: item,
                        holderItem: item?.rightsHoldersConnection,
                        eventFlag: true,
                      },
                    });
                  } else {
                    navigation.navigate('Watch', {
                      item: item,
                      searchFlag: true,
                    });
                  }
                }}>
                <View style={styles.innerContainer}>
                  <View style={styles.imageContainer}>
                    <ImageWithPlaceHolder
                      source={item?.logo1}
                      placeholderSource={Constants.placeholder_trophy_icon}
                      style={styles.imageIcon}
                      resizeMode="contain"
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
                          : item?.day}
                        {'  l '}
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
          />}
      </View>
    </ImageBackground>
  );
}
