import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import styles from './styles';
import {Images, Colors, Strings} from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import {useNavigation} from '@react-navigation/native';
import LiveMatchView from 'src/components/Modal/LiveMatchModal';
import {useQuery} from '@apollo/client';
import dayjs from 'dayjs';
import {GET_SORTED_EVENTS} from './queries';
import {useDispatch, useSelector} from 'react-redux';
import {setExpire, setStoreEventList} from 'src/store/types';
import {moderateScale} from 'react-native-size-matters';

// Sample data for the list
const list = [
  {
    id: 1,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
    live: true,
    percentage: '25%',
  },
  {
    id: 2,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
    live: true,
    percentage: '35%',
  },
  {
    id: 3,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
    live: true,
    percentage: '45%',
  },
  {
    id: 4,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
    live: false,
    percentage: '55%',
  },
  {
    id: 5,
    img: Images.NBALogo,
    companyName: "NCAA Women's Soccer",
    title: 'Oregon at Washington',
    day: 'Thu. 2/9',
    time: '5:00pm - 7:30pm',
    live: false,
    percentage: '65%',
  },
];

// Sample data for the category slider
const categoryArr = [
  {
    id: 1,
    title: 'all',
    value: 'all',
    selected: true,
  },
  {
    id: 2,
    title: 'pro',
    value: 'pro',
  },
  {
    id: 3,
    title: 'college',
    value: 'college',
  },
  {
    id: 4,
    title: 'esports',
    value: 'e-sports',
  },
];

const expireTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function Guide(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.user);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categoryFlag, setCategoryFlag] = useState(true);
  const [isLive, setIsLive] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [liveMatchModal, setLiveMatchModal] = useState(false);
  const [timeData, setTimeData] = useState([]);
  const [categoryData, setCategoryData] = useState(categoryArr);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [eventList, setEventList] = useState(
    reduxData &&
      reduxData?.splashEventList &&
      reduxData?.splashEventList.length > 0
      ? reduxData?.splashEventList
      : [],
  );
  const [filteredEventList, setFilteredEventList] = useState([]);
  const [startTime, setStartTime] = useState(dayjs(new Date()).toISOString());
  const [startSearchTime, setStartSearchTime] = useState(
    dayjs(new Date()).toISOString(),
  );
  const [endSearchTime, setEndSearchTime] = useState(
    dayjs(new Date()).add(7, 'day').toISOString(),
  );

  // Fetch data from API using Apollo useQuery hook
  const {loading, refetch, error} = useQuery(GET_SORTED_EVENTS, {
    variables: {
      startTime: startTime,
      endTime: dayjs(startTime).add(4, 'hours').toISOString(),
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      if (data && data?.sortedEvents) {
        const filteredEvents = data?.sortedEvents.filter(event => {
          const {line1, line2, startTime, endTime, logo1, rightsHolders} =
            event;
          // Check if all required properties exist
          if (
            !line1 ||
            !line2 ||
            !startTime ||
            !endTime ||
            !logo1 ||
            !rightsHolders
          ) {
            return false;
          }
          // Check if at least one rightsholder has a logoUrl
          const hasLogoUrl = rightsHolders.some(
            rightsholder => rightsholder.logoUrl,
          );
          if (!hasLogoUrl) {
            return false;
          }

          return true;
        });
        setEventList(filteredEvents);
      }
      setIsRefreshing(false);
      const currentTime = Date.now();
      if (
        ((reduxData && reduxData?.expire === currentTime) ||
          (reduxData &&
            reduxData?.eventList &&
            reduxData?.eventList.length <= 0)) &&
        data &&
        data?.sortedEvents.length > 0
      ) {
        const filteredEvents = data?.sortedEvents.filter(event => {
          const {line1, line2, startTime, endTime, logo1, rightsHolders} =
            event;
          // Check if all required properties exist
          if (
            !line1 ||
            !line2 ||
            !startTime ||
            !endTime ||
            !logo1 ||
            !rightsHolders
          ) {
            return false;
          }
          // Check if at least one rightsholder has a logoUrl
          const hasLogoUrl = rightsHolders.some(
            rightsholder => rightsholder.logoUrl,
          );
          if (!hasLogoUrl) {
            return false;
          }

          return true;
        });
        dispatch(setStoreEventList(filteredEvents));
        dispatch(setExpire(expireTime));
      }
    },
    onError: error => {
      console.log('error : ', error);
    },
  });

  useQuery(GET_SORTED_EVENTS, {
    variables: {
      startTime: startSearchTime,
      endTime: endSearchTime,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      const currentTime = Date.now();
      if (
        ((reduxData && reduxData?.expire === currentTime) ||
          (reduxData &&
            reduxData?.eventList &&
            reduxData?.eventList.length <= 0)) &&
        data &&
        data?.sortedEvents.length > 0
      ) {
        const filteredEvents = data?.sortedEvents.filter(event => {
          const {line1, line2, startTime, endTime, logo1, rightsHolders} =
            event;
          // Check if all required properties exist
          if (
            !line1 ||
            !line2 ||
            !startTime ||
            !endTime ||
            !logo1 ||
            !rightsHolders
          ) {
            return false;
          }
          // Check if at least one rightsholder has a logoUrl
          const hasLogoUrl = rightsHolders.some(
            rightsholder => rightsholder.logoUrl,
          );
          if (!hasLogoUrl) {
            return false;
          }

          return true;
        });
        dispatch(setStoreEventList(filteredEvents));
        dispatch(setExpire(expireTime));
      }
    },
    onError: error => {
      console.log('error : ', error);
    },
  });

  const getTimeList = () => {
    const currentDate = dayjs(); // Get the current date and time
    const daysList = [];

    const currentHour = currentDate.hour(); // Get the current hour
    const currentDay = currentDate.startOf('day'); // Start from the beginning of the current day
    const hoursList = [];

    for (let i = 0; i < 7; i++) {
      const day = currentDay.add(i, 'day');

      if (i === 0) {
        for (let j = currentHour + 1; j < 24; j++) {
          const hour = day.hour(j);
          const hourDatetime = hour.toISOString();
          const hourObject = {
            id: i * 24 + j + 1,
            title: hour.format('h a'),
            selected: false,
            datetime: hourDatetime,
          };
          hoursList.push(hourObject);
        }
      } else {
        for (let j = 0; j < 24; j++) {
          const hour = day.hour(j);
          const hourDatetime = hour.toISOString();
          const hourObject = {
            id: i * 24 + j + 1,
            title: hour.format('h a'),
            selected: false,
            datetime: hourDatetime,
          };
          hoursList.push(hourObject);
        }
      }

      daysList.push(hoursList);
    }

    const timeData = daysList.flat();
    setTimeData(timeData);

    return timeData;
  };

  useEffect(() => {
    getTimeList();
  }, []);

  useEffect(() => {
    if (eventList && eventList.length > 0) {
      let filteredEvents;
      if (selectedTimeIndex >= 0 && selectedCategory != 'all') {
        filteredEvents = eventList.filter(
          event => event.category.name === selectedCategory,
        );
      }
      setFilteredEventList(filteredEvents);
    }
  }, [eventList]);

  const handleSelectedCategory = (e, index) => {
    let list = [...categoryData];
    const selectedTime = timeData?.[selectedTimeIndex]?.datetime;
    const formattedTime = dayjs(selectedTime).format(
      'YYYY-MM-DDTHH:mm:ss.SSSZ',
    );

    if (index === 0) {
      // Toggle the selected category
      list[index].selected = !list[index].selected;

      // Deselect all other categories
      list.forEach((element, idx) => {
        if (idx !== 0) {
          element.selected = false;
        }
      });
    } else {
      // Toggle the selected category
      list[index].selected = !list[index].selected;

      // Check if all other categories are deselected
      const otherSelected = list.slice(1).some(element => element.selected);
      if (!otherSelected) {
        list[0].selected = true;
      } else {
        list[0].selected = false;
      }
    }

    // Filter events based on selected categories and time
    let filteredEvents = [];
    if (list[0].selected) {
      filteredEvents =
        selectedTimeIndex === 0
          ? eventList
          : eventList.filter(event =>
              dayjs(event.startTime).isAfter(formattedTime),
            );
    } else {
      filteredEvents =
        selectedTimeIndex === 0
          ? eventList.filter(event =>
              list.some(
                category =>
                  category.selected && category.value === event.category.name,
              ),
            )
          : eventList.filter(
              event =>
                list.some(
                  category =>
                    category.selected && category.value === event.category.name,
                ) && dayjs(event.startTime).isAfter(formattedTime),
            );
    }

    setCategoryData(list);
    setSelectedCategory(e?.value);
    setFilteredEventList(filteredEvents);
  };

  const handleSelectTime = index => {
    const selectedTime = timeData[index]?.datetime;
    if (index === 0) {
      setStartTime(dayjs(new Date()).toISOString());
    } else {
      setStartTime(selectedTime);
    }

    const updatedTimeData = timeData.map((element, i) => ({
      ...element,
      selected: i === index,
    }));
    setTimeData(updatedTimeData);
    setSelectedTimeIndex(index);
  };

  const endTimeWidth = end => {
    const startTime = dayjs(timeData[currentIndex]?.datetime);
    const endTime = dayjs(end);
    const timeDifference = endTime.diff(startTime); // Calculate the total time difference in milliseconds
    const minutesDiffference = Math.round(timeDifference / (1000 * 60));
    if (minutesDiffference <= 0) {
      let w =
        minutesDiffference < 0 ? 60 + minutesDiffference : minutesDiffference;
      return w === 0 ? '26%' : `${w / 2 - 4}%`;
    } else {
      let wid = minutesDiffference / 2 + 22;
      return `${wid}%`;
    }
  };

  const startTimeWidth = start => {
    const currentTime = dayjs();
    const matchTime = dayjs(timeData[currentIndex]?.datetime);
    const startTime = dayjs(start);
    const timeDifference = startTime.diff(matchTime); // Calculate the total time difference in milliseconds
    const minutesDifference = Math.round(timeDifference / (1000 * 60));
    if (isLive && minutesDifference <= 0) {
      let w = minutesDifference * -1;
      if (w === 0) {
        return `26%`;
      } else if (w < 60) {
        return `${w / 2}%`;
      } else {
        return 0; // Return 0 for the live match time
      }
    } else if (minutesDifference > 0) {
      let wid = minutesDifference / 2 + 22;
      return `${wid}%`;
    } else {
      return 0; // Return 0 for any other cases
    }
  };

  const handleNext = () => {
    if (isLive) {
      handleSelectTime(currentIndex);
      setIsLive(false);
    } else {
      handleSelectTime(currentIndex + 1);
      setCurrentIndex(prevIndex => prevIndex + 1);
      setIsLive(false);
    }
  };

  const handleLive = () => {
    handleSelectTime(0);
    setCurrentIndex(0);
    setIsLive(true);
  };

  const ItemComponent = React.memo(({item}) => {
    return (
      // Render your item component here
      selectedCategory === 'all' ||
        item?.category?.name === selectedCategory ? (
        <TouchableOpacity
          style={styles.listContiner}
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
              navigation.navigate('Watch', {item: item});
            }
          }}>
          <View style={styles.innerContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={item?.logo1 ? {uri: item?.logo1} : item?.img}
                style={styles.imageIcon}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                width: item?.startTime ? startTimeWidth(item?.startTime) : 0,
                backgroundColor: Colors.darkBlue,
              }}></View>
            <View
              style={{
                width: endTimeWidth(item?.endTime),
                backgroundColor: Colors.mediumGreen,
              }}></View>
            <View
              style={
                // startTimeWidth(item?.startTime)
                //   ? {
                //       flex: 1,
                //       backgroundColor: Colors.mediumBlue,
                //     }
                //   :
                {
                  flex: 1,
                  backgroundColor: Colors.darkBlue,
                }
              }></View>
            <View style={styles.userNameContainer}>
              <Text style={[styles.eventTxt, {marginTop: 5}]} numberOfLines={1}>
                {item?.line1 ? item?.line1 : item?.companyName}
              </Text>
              <Text style={styles.titleTxt} numberOfLines={1}>
                {item?.line2 ? item?.line2 : item?.title}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.eventDateTxt]}>
                  {' '}
                  {item?.startTime
                    ? dayjs(item?.startTime).format('ddd. MM/D')
                    : item?.day}
                  {'  l '}
                </Text>
                <Text style={[styles.eventDateTxt]}>
                  {' '}
                  {item?.startTime
                    ? `${dayjs(item?.startTime).format('h:mma')} - ${dayjs(
                        item?.endTime,
                      ).format('h:mma')}`
                    : item?.time}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : null
    );
  });

  return (
    <ImageBackground
      source={Images.Background}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar backgroundColor={Colors.mediumBlue} barStyle="light-content" />
      {/* Header with Logo only  */}
      <AppHeader centerImage={Images.Logo} />
      {/* Slider all pro  */}
      <View style={styles.sliderContainer}>
        <FlatList
          horizontal
          data={categoryData}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => handleSelectedCategory(item, index)}
              style={styles.sliderInnerContainer}>
              <View
                style={[
                  styles.sliderInnerMainContainer,
                  {borderWidth: item?.selected ? moderateScale(2, 0.3) : 0},
                ]}>
                {item?.selected && <View style={styles.rectangle2} />}
                <ImageBackground
                  source={
                    item?.selected
                      ? Images.ActiveSliderBack
                      : Images.InActiveSliderBorder
                  }
                  style={styles.sliderImageBackground}
                  imageStyle={{
                    borderRadius: moderateScale(20, 0.3),
                    borderWidth: moderateScale(1, 0.3),
                  }}
                  resizeMode={'cover'}>
                  <Image
                    source={
                      index === 0
                        ? Images.Trophy
                        : index === 1
                        ? Images.Crown
                        : index === 2
                        ? Images.College
                        : Images.Game
                    }
                    style={styles.sliderIcon}
                    resizeMode={'contain'}
                  />
                  <Text style={styles.sliderTxt}>
                    {item?.title.toUpperCase()}
                  </Text>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* time slider */}
      <View style={styles.timeSliderContainer}>
        <View style={{width: '20%'}}>
          <TouchableOpacity
            onPress={() => handleLive()}
            style={[
              styles.liveTimeContainer,
              {
                backgroundColor: isLive
                  ? Colors?.mediumGreen
                  : Colors.mediumBlue,
              },
            ]}>
            <Text
              style={
                isLive
                  ? styles.sliderActiveTimeTxt
                  : styles.sliderInactiveTimeTxt
              }>
              {'Live'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.timeSliderInnerContainer}>
          <FlatList
            horizontal
            data={timeData}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={[styles.timeSliderInnerContainer]}
            renderItem={({item, index}) => {
              const adjustedIndex = index + currentIndex; // Calculate the adjusted index based on the current index
              return (
                <TouchableOpacity
                  // onPress={() => handleSelectTime(item, index)}
                  style={[
                    styles.timeContainer,
                    {
                      backgroundColor: Colors.mediumBlue,
                    },
                  ]}>
                  <Text style={styles.sliderInactiveTimeTxt}>
                    {timeData[adjustedIndex]?.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={{width: '20%'}}>
          <TouchableOpacity
            onPress={() => handleNext()}
            style={[
              styles.liveTimeContainer,
              {
                backgroundColor: Colors.brandBlue,
              },
            ]}>
            <Image
              source={Images.Arrow}
              style={styles.rightIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* main list  */}
      {/* {!loading ? ( */}
      <FlatList
        data={
          selectedCategory === 'all' && selectedTimeIndex >= 0
            ? eventList && eventList.length > 0
              ? eventList
              : selectedTimeIndex > 0
              ? filteredEventList
              : list
            : filteredEventList
        }
        showsVerticalScrollIndicator={true}
        renderItem={({item}) => <ItemComponent item={item} />}
        keyExtractor={item => item?.id}
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={50} // Reduce initial render amount
        maxToRenderPerBatch={20} // Reduce number in each render batch
        updateCellsBatchingPeriod={20} // Increase time between renders
        windowSize={20} // Reduce the window size
      />
      {/* ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator color={'#fff'} size={'large'} />
        </View>
      )} */}
      <LiveMatchView
        setLiveMatchModal={setLiveMatchModal}
        liveMatchModal={liveMatchModal}
      />
    </ImageBackground>
  );
}
