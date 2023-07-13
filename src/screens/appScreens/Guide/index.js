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

// Sample data for the time slider
const timeArr = [
  {
    id: 1,
    title: 'Live',
    selected: true,
    datetime: dayjs(new Date()).toISOString(),
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

export default function Guide() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reduxData = useSelector(state => state.user);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categoryFlag, setCategoryFlag] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [liveMatchModal, setLiveMatchModal] = useState(false);
  const [timeData, setTimeData] = useState(timeArr);
  const [categoryData, setCategoryData] = useState(categoryArr);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [eventList, setEventList] = useState();
  const [filteredEventList, setFilteredEventList] = useState([]);
  const [startTime, setStartTime] = useState(dayjs(new Date()).toISOString());
  const [endTime, setEndTime] = useState(
    dayjs(new Date()).add(1, 'day').toISOString(),
  );

  // Fetch data from API using Apollo useQuery hook
  const {loading, refetch, error} = useQuery(GET_SORTED_EVENTS, {
    variables: {
      startTime: startTime,
      endTime: endTime,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      if(data && data?.sortedEvents){
        const filteredEvents = data?.sortedEvents.filter(event => {
          const { line1, line2, startTime, endTime, logo1, rightsHolders } = event;
          // Check if all required properties exist
          if (!line1 || !line2 || !startTime || !endTime || !logo1 || !rightsHolders) {
            return false;
          }
          // Check if at least one rightsholder has a logoUrl
          const hasLogoUrl = rightsHolders.some(rightsholder => rightsholder.logoUrl);
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
        dispatch(setStoreEventList(data?.sortedEvents));
        dispatch(setExpire(expireTime));
      }
    },
    onError: error => {
      console.log('error : ', error);
    },
  });

  const getCategoryList = () => {
    const categorySet = new Set(eventList.map(item => item.category.name));
    const categoryList = Array.from(categorySet);
    console.log('categoryList ; ', categoryList);
    let list = [
      {
        id: 1,
        title: 'all',
        value: 'all',
        selected: true,
      },
      ...categoryList.map((element, index) => ({
        id: index + 2,
        title: element,
        value: element,
      })),
    ];
    // setCategoryData(list);
    setCategoryFlag(false);
  };

  const getTimeList = () => {
    const currentHour = dayjs().hour(); // Get the current hour
    const hoursList = [...timeArr];

    for (let i = 1; i < 6; i++) {
      const hour = currentHour + i;
      const hourDatetime = dayjs().hour(hour).toISOString();
      const hourObject = {
        id: i + 1,
        title: dayjs().hour(hour).format('h a'),
        selected: false,
        datetime: hourDatetime,
      };
      hoursList.push(hourObject);
    }
    setTimeData(hoursList);
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
      // static list required only
      // if (categoryFlag) {
      //   getCategoryList();
      // }
    }
  }, [eventList]);

  const handleSelectedCategory = (e, index) => {
    let list = [...categoryData];
    const selectedTime = timeData[selectedTimeIndex].datetime;
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

  const handleSelectTime = (item, index) => {
    const selectedTime = timeData[index].datetime;
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

  const liveTimeProgress = (start, end) => {
    const currentTime = dayjs();
    const startTime = dayjs(start);
    const endTime = dayjs(end);
    const isLive =
      currentTime.isAfter(startTime) && currentTime.isBefore(endTime);
    const timeDifference = endTime.diff(startTime); // Calculate the total time difference in milliseconds
    const timeProgress = Math.max(currentTime.diff(startTime), 0); // Calculate the current time progress in milliseconds, ensuring a minimum value of 0
    const progressPercentage = Math.round(
      (timeProgress / timeDifference) * 100,
    ); // Calculate the progress percentage

    return {
      isLive: isLive,
      progressPercentage: isNaN(progressPercentage) ? 0 : progressPercentage, // Ensure a valid progress percentage value
    };
  };

  const waitTimeProgress = (start, end) => {
    const currentTime = dayjs();
    const startTime = dayjs(start);
    const endTime = dayjs(end);
    const isWaiting = currentTime.isBefore(startTime); // Check if current time is before the start time
    const timeDifference = endTime.diff(startTime); // Calculate the total time difference in milliseconds
    const timeRemaining = endTime.diff(currentTime); // Calculate the remaining time in milliseconds
    const waitPercentage = Math.round((timeRemaining / timeDifference) * 100); // Calculate the wait percentage
    return {
      isWaiting: isWaiting,
      waitPercentage: isNaN(waitPercentage) ? 0 : waitPercentage, // Ensure a valid progress percentage value
    };
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
                params: {item: item,eventFlag:true},
              })
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
              style={
                liveTimeProgress(item?.startTime, item?.endTime)?.isLive
                  ? {
                      width: item?.startTime
                        ? liveTimeProgress(item?.startTime, item?.endTime)
                            ?.progressPercentage || 0
                        : 0,
                      backgroundColor: Colors.mediumGreen,
                    }
                  : {
                      width: item?.startTime
                        ? waitTimeProgress(item?.startTime, item?.endTime)
                            ?.waitPercentage || 0
                        : 0,
                      backgroundColor: Colors.darkBlue,
                    }
              }></View>
            <View
              style={
                liveTimeProgress(item?.startTime, item?.endTime)?.isLive
                  ? {
                      flex: 1,
                      backgroundColor: Colors.darkBlue,
                    }
                  : {
                      flex: 1,
                      backgroundColor: Colors.mediumBlue,
                    }
              }></View>
            <View style={styles.userNameContainer}>
              <Text style={[styles.eventTxt, {marginTop: 5}]} numberOfLines={1}>
                {item?.line1 ? item?.line1 : item?.companyName}{' '}
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
      source={Images.Background2}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar backgroundColor={Colors.mediumBlue} />
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
                  {borderWidth: item?.selected ? 2 : 0},
                ]}>
                <ImageBackground
                  source={
                    item?.selected
                      ? Images.ActiveSliderBack
                      : Images.InActiveSliderBorder
                  }
                  style={styles.sliderImageBackground}
                  resizeMode={'stretch'}>
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
        <View style={styles.timeSliderInnerContainer}>
          <FlatList
            horizontal
            data={timeData}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => handleSelectTime(item, index)}
                style={[
                  styles.timeContainer,
                  {
                    backgroundColor: item?.selected
                      ? Colors?.mediumGreen
                      : Colors.mediumBlue,
                  },
                ]}>
                <Text
                  style={
                    item?.selected
                      ? styles.sliderActiveTimeTxt
                      : styles.sliderInactiveTimeTxt
                  }>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <TouchableOpacity style={styles.nextContainer}>
          <Image
            source={Images.Arrow}
            style={styles.rightIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      {/* main list  */}
      {!loading ? (
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
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator color={'#fff'} size={'large'} />
        </View>
      )}
      <LiveMatchView
        setLiveMatchModal={setLiveMatchModal}
        liveMatchModal={liveMatchModal}
      />
    </ImageBackground>
  );
}
