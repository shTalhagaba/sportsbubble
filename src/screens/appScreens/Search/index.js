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

export default function Search() {
  const navigation = useNavigation();
  const textInputRef = useRef();
  const [searchText, setSearchText] = useState('');
  const [startTime, setStartTime] = useState(
    dayjs(new Date()).subtract(2, 'day').toISOString(),
  );
  const [endTime, setEndTime] = useState(
    dayjs(new Date()).add(1, 'day').toISOString(),
  );

  useEffect(() => {
    if (textInputRef.current) {
      const unsubscribe = navigation.addListener('focus', () => {
        textInputRef.current?.focus();
      });
      return unsubscribe;
    }
  }, [navigation, textInputRef.current]);

  const {loading, refetch, error, data} = useQuery(SEARCH_EVENTS_QUERY, {
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
          refInner={textInputRef}
          onPressCloseImage={() => setSearchText('')}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        {/* list showing after search */}
        {!loading ? (
          <FlatList
            data={
              searchText.length > 0 &&
              data &&
              data?.searchEvent &&
              data?.searchEvent.length > 0
                ? data?.searchEvent
                : []
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
                    <Text style={styles.titleTxt}>
                      {item?.line2 ? item?.line2 : item?.title}
                    </Text>
                    <View style={styles.innerContainer}>
                      <Text style={styles.eventTxt}>
                        {' ' + item?.startTime
                          ? dayjs(item?.startTime).format('ddd. MM/D')
                          : item?.day}{' '}
                      </Text>
                      <Text style={styles.eventTxt}>
                        {' '}
                        {' ' + item?.startTime
                          ? dayjs(item?.startTime).format('h:mm A') +
                            ' - ' +
                            dayjs(item?.endTime).format('h:mm A')
                          : item?.time}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item?.id}
          />
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator color={'#fff'} size={'large'} />
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
