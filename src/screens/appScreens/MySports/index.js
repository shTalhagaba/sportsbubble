import React, { useEffect, useState, useCallback } from 'react';
import {
  ImageBackground,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  RefreshControl,
  Platform,
} from 'react-native';
import styles from './styles';
import { Images, Colors, Strings } from 'src/utils';
import AppHeader from 'src/components/AppHeader';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CustomMySportsModalView from 'src/components/Modal/CustomMySportsModalView';
import CustomModalView from 'src/components/Modal/CustomModal';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import ShowMessage from 'src/components/ShowMessage';
import { useMutation, useQuery } from '@apollo/client';
import {
  DELETE_CONSUMERS,
  GET_ALL_SPORTS,
  UPDATE_CONSUMERS,
  UPDATE_NOTIFICATION_CONSUMERS,
} from 'src/graphQL';
import LoaderModal from 'src/components/LoaderModal';
import { setSportsList, setUser } from 'src/store/types';
import { categoryArrMySports } from 'src/utils/list';
import {
  subscribeInterest,
  unsubscribeInterest,
  initializePusher
} from 'src/components/Pusher/PusherBeams';
import {
  checkNotifications,
  requestNotifications,
  openSettings,
} from 'react-native-permissions';
import useSportsList from 'src/services/useSportsList';
const { fontScale } = Dimensions.get('window');

export default function MySports() {
  const navigation = useNavigation();
  const reduxData = useSelector(state => state.user);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { loading, refetch, favoriteSports } = useSportsList('network-only');
  const [reminderModal, setReminderModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [fvrtModal, setFvrtModal] = useState(
    reduxData?.guest === true ? true : false,
  );
  const [mySportData, setSportData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const [categoryData, setCategoryData] = useState(categoryArrMySports);
  const [selectedCategory, setSelectedCategory] = useState('pro');
  const [filteredEventList, setFilteredEventList] = useState([]);

  const [
    deleteConsumersMutation,
    { loading: loadingDelete, error: errorDelete },
  ] = useMutation(DELETE_CONSUMERS);
  const [
    updateConsumersMutation,
    { loading: loadingFavourite, error: errorFavourite },
  ] = useMutation(UPDATE_CONSUMERS);
  const [
    updateNotificationMutation,
    { loading: loadingNotification, error: errorNotification },
  ] = useMutation(UPDATE_NOTIFICATION_CONSUMERS);

  // Initialize Pusher
  useEffect(() => {
    pusherInitalizer()
    const list = categoryData.map((item, index) => ({ ...item, selected: index === 0 }));
    setCategoryData(list);
  }, []);

  const pusherInitalizer = () => {
    checkNotifications().then(({ status, settings }) => {
      if (status === 'granted') initializePusher();
    });
  };

  // Define a function to execute the mutation
  const updateConsumers = async (sport, flag, isBellIcon) => {
    try {
      if (!sport?.name) {
        ShowMessage(Strings.invalidData);
        return;
      }
      const updateData = {
        where: {
          cognitoId: reduxData?.userData?.sub,
        },
        update: {
          favoriteSports: [
            {
              create: [
                {
                  node: {
                    notifications: flag ? false : true,
                    categories: {
                      connect: [
                        {
                          where: {
                            node: {
                              ...(selectedCategory === 'other'
                                ? { name_NOT_IN: ['pro', 'esports', 'college'] }
                                : { name: selectedCategory }),
                            },
                          },
                        },
                      ],
                    },
                    sport: {
                      connect: {
                        where: {
                          node: {
                            name: sport?.name,
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      };
      const { data } = await updateConsumersMutation({
        variables: updateData,
      });
      if (!loadingFavourite && data?.updateConsumers?.consumers) {
        ShowMessage(
          Strings.addedToFav,
          data?.updateConsumers?.consumers,
        );
        if (
          data?.updateConsumers?.consumers?.[0]?.favoriteSports &&
          data?.updateConsumers?.consumers?.[0]?.favoriteSports.length > 0
        ) {
          dispatch(
            setSportsList(
              data?.updateConsumers?.consumers?.[0]?.favoriteSports,
            ),
          );
          if (isBellIcon) {
            if (await checkPermission()) {
              initializePusher();
              const sportNamewithoutSpaces = sport?.name.replaceAll(/[^A-Z0-9]+/ig, "");
              subscribeInterest(
                (selectedCategory === 'other' ? 'others' : selectedCategory) +
                '-' +
                sportNamewithoutSpaces,
              );
            }
          }
        }
      }
    } catch (err) {
      console.error('Error updating consumer:', err);
    }
  };
  // Define a function to execute the mutation
  const deleteConsumers = async element => {
    if (element?.name) {
      const updateData = {
        where: {
          cognitoId: reduxData?.userData?.sub,
        },
        update: {
          favoriteSports: [
            {
              delete: [
                {
                  where: {
                    node: {
                      ...(selectedCategory === 'other'
                        ? {
                          categories: {
                            name_NOT_IN: ['pro', 'esports', 'college'],
                          },
                        }
                        : { categories: { name: selectedCategory } }),
                      sport: {
                        name: element?.name,
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      };
      try {
        const { data } = await updateConsumersMutation({
          variables: updateData,
        });
        if (!loadingFavourite && data?.updateConsumers?.consumers) {
          ShowMessage(Strings.removeFromFav);
          dispatch(
            setSportsList(
              data?.updateConsumers?.consumers?.[0]?.favoriteSports,
            ),
          );
          const sportNamewithoutSpaces = element?.name.replaceAll(' ', '');
          unsubscribeInterest(
            (selectedCategory === 'other' ? 'others' : selectedCategory) +
            '-' +
            sportNamewithoutSpaces,
          );
          refetch();
        }
        // Handle the response data as needed
      } catch (err) {
        console.error('Error updating consumer:', err);
      }
    } else {
      ShowMessage(Strings.invalidData);
    }
  };
  // Define a function to execute the mutation
  const updateNotificationConsumers = async (element, flag) => {
    const getElementID =
      selectedCategory === 'other'
        ? element?.sport?.name
        : element?.name || element?.sport?.name;
    try {
      if (getElementID) {
        const updateData = {
          where: {
            cognitoId: reduxData?.userData?.sub,
          },
          update: {
            favoriteSports: [
              {
                update: {
                  node: {
                    notifications: !flag,
                  },
                },
                where: {
                  node: {
                    ...(selectedCategory === 'other'
                      ? {
                        categories: {
                          name_NOT_IN: ['pro', 'esports', 'college'],
                        },
                      }
                      : { categories: { name: selectedCategory } }),
                    sport: {
                      name: getElementID,
                    },
                  },
                },
              },
            ],
          },
        };
        const { data } = await updateNotificationMutation({
          variables: updateData,
        });
        if (!loadingNotification && data?.updateConsumers?.consumers) {
          ShowMessage(
            flag === false
              ? Strings.notificationActive
              : Strings.notificationInactive,
          );
          dispatch(
            setSportsList(
              data?.updateConsumers?.consumers?.[0]?.favoriteSports,
            ),
          );
          refetch();
        }
        const sportName = element?.sport?.name;
        const sportNamewithoutSpaces = sportName.replaceAll(/[^A-Z0-9]+/ig, "");
        if (sportName) {
          if (flag) {
            unsubscribeInterest(
              (selectedCategory === 'other' ? 'others' : selectedCategory) +
              '-' +
              sportNamewithoutSpaces,
            );
            console.log('Removed consumer:', sportNamewithoutSpaces);
          } else {
            subscribeInterest(
              (selectedCategory === 'other' ? 'others' : selectedCategory) +
              '-' +
              sportNamewithoutSpaces,
            );
            console.log('Added consumer:', sportNamewithoutSpaces);
          }
        }
      } else {
        ShowMessage(Strings.invalidData);
      }
    } catch (err) {
      console.error('Error updating consumer:', err);
      // Handle the error as needed
    }
  };

  const {
    loading: listLoading,
    refetch: listRefetch,
    error: listError,
  } = useQuery(GET_ALL_SPORTS, {
    variables: {
      where: {
        showInPassport: true,
      },
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      if (
        reduxData?.user &&
        !listLoading &&
        data &&
        data?.sports &&
        data?.sports.length > 0
      ) {
        const filteredEvents = data?.sports.filter(element => {
          const { name, categories } = element;
          // Check if all required properties exist
          if (name && categories && categories.length > 0) {
            return true;
          }
          return false;
        });
        setSportData(filteredEvents);
      }
    },
    onError: error => {
      console.log(' GET_ALL_SPORTS error : ', error);
    },
  });

  useEffect(() => {
    if (isFocused) {
      if (reduxData?.guest) {
        setFvrtModal(true);
      }
      refetch();
      listRefetch();
    }
  }, [isFocused]);

  useEffect(() => {
    const filteredEvents = mySportData?.filter(sport => {
      const filteredSports = sport?.categories?.filter(category => {
        if (selectedCategory === 'other') {
          return !['pro', 'college', 'esports'].includes(category?.name);
        }
        return category?.name.toLowerCase() === selectedCategory?.toLowerCase();
      });
      return filteredSports?.length ? sport : false;
    });
    const sortedItemsDescending =
      filteredEvents?.length > 0 &&
      filteredEvents.slice().sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    setFilteredEventList(sortedItemsDescending);
  }, [selectedCategory, mySportData]);

  const handleReminder = async (item, index, favoriteFlag) => {
    // If event notification already enabled, no need to check permissions
    try {
      const toggle = reduxData?.sportsList?.filter(userSport => {
        if (selectedCategory === 'other') {
          const filteredCategories = userSport?.categories?.filter(category => {
            return !['pro', 'college', 'esports'].includes(category?.name);
          });
          return (
            filteredCategories?.length > 0 &&
            userSport?.sport?.name?.toLowerCase() === item?.name?.toLowerCase()
          );
        }
        return (
          userSport?.categories?.[0]?.name?.toLowerCase() ===
          selectedCategory?.toLowerCase() &&
          userSport?.sport?.name?.toLowerCase() === item?.name?.toLowerCase()
        );
      });
      if (toggle?.[0] && toggle?.[0]?.notifications) {
        setCurrentIndex(toggle?.[0]);
        handleNotificationAlert(toggle?.[0]);
      } else {
        if (await checkPermission()) {
          initializePusher();
          if (favoriteFlag && toggle?.[0]) {
            console.log(
              'favoriteFlag && toggle?.[0] ',
              favoriteFlag,
              toggle?.[0],
            );
            handleNotificationAlert(toggle?.[0]);
          } else {
            updateConsumers(item, item?.[0]?.notifications, true);
          }
        }
      }
    } catch (error) {
      console.log('handleFvrt error : ', error);
    }
  };

  const handleFvrt = async item => {
    try {
      const toggle =
        reduxData?.sportsList?.filter(userSport => {
          if (selectedCategory === 'other') {
            const filteredCategories = userSport?.categories?.filter(
              category => {
                return !['pro', 'college', 'esports'].includes(category?.name);
              },
            );
            return (
              filteredCategories?.length > 0 &&
              userSport?.sport?.name?.toLowerCase() ===
              item?.name?.toLowerCase()
            );
          }
          return (
            userSport?.categories?.[0]?.name?.toLowerCase() ===
            selectedCategory?.toLowerCase() &&
            userSport?.sport?.name?.toLowerCase() === item?.name?.toLowerCase()
          );
        })?.length > 0;
      if (toggle) {
        deleteConsumers(item);
      } else {
        updateConsumers(item, true, false);
      }
    } catch (error) {
      console.log('handleFvrt error : ', error);
    }
  };

  const handleNotificationAlert = selectedIndex => {
    if (selectedIndex) {
      updateNotificationConsumers(selectedIndex, selectedIndex?.notifications);
    }
  };

  const handleSelectedCategory = (e, index) => {
    let list = [...categoryData];
    const selectedCategoryValue = list[index].value;

    if (list[index].selected) {
      // If the category is already selected, do nothing
      return;
    }
    list &&
      list?.length > 0 &&
      list.forEach(element => {
        element.selected = false;
      });
    list[index].selected = true;
    let filteredEvents = [];
    if (selectedCategoryValue === 'other') {
      filteredEvents = mySportData.filter(item => {
        const categoryNames = item?.categories?.map(category =>
          category?.name?.toLowerCase(),
        );
        return (
          categoryNames &&
          categoryNames.length > 0 &&
          !categoryNames.includes('pro') &&
          !categoryNames.includes('college') &&
          !categoryNames.includes('esports')
        );
      });
    } else {
      // Handle the case when a specific category is selected
      filteredEvents = mySportData.filter(item => {
        const categoryNames = item?.categories?.map(category =>
          category?.name?.toLowerCase(),
        );
        return categoryNames && categoryNames.includes(selectedCategoryValue);
      });
    }
    setSelectedCategory(selectedCategoryValue); // Update the selected category value
    setCategoryData(list);
    const sortedItemsDescending =
      filteredEvents?.length > 0 &&
      filteredEvents.slice().sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    setFilteredEventList(sortedItemsDescending);
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  // handle to navigate to sign up for create account
  const handleCreateAccount = async () => {
    setFvrtModal(!fvrtModal);
    await dispatch(setUser(false));
    navigation.navigate('Auth', {
      screen: 'Signup',
    });
  };

  const checkPermission = () => {
    return new Promise((resolve, reject) => {
      checkNotifications().then(({ status, settings }) => {
        //UNAVAILABLE: This feature is not available (on this device / in this context)
        //DENIED: The permission has not been requested / is denied but requestable
        //BLOCKED: The permission is denied and not requestable anymore
        //GRANTED: The permission is granted
        console.log('status - ', status)
        switch (status) {
          case 'granted':
            resolve(true);
            break;
          case 'denied':
            requestNotifications(['alert', 'sound']).then(
              ({ status, settings }) => {
                if (status == 'granted') {
                  resolve(true);
                } else if (status == 'blocked') {
                  setSettingsModal(true);
                  resolve(false);
                } else {
                  resolve(false);
                }
              },
            );
            break;
          case 'blocked':
            setSettingsModal(true);
            resolve(false);
            break;
          case 'unavailable':
            ShowMessage(Strings.notSupportedNotifications);
            resolve(false);
            break;
          default:
        }
      });
    });
  };

  const goToSettings = () => {
    openSettings().catch(() => console.warn('cannot open settings'));
    setSettingsModal(false);
  };

  const isFavoriteCheck = sport => {
    if (reduxData?.sportsList && reduxData?.sportsList.length > 0) {
      return (
        reduxData?.sportsList?.filter(itemSport => {
          if (selectedCategory === 'other') {
            const filteredCategories = itemSport?.categories?.filter(
              category => {
                return !['pro', 'college', 'esports'].includes(category?.name);
              },
            );
            return (
              filteredCategories?.length > 0 &&
              itemSport?.sport?.name?.toLowerCase() ===
              sport?.name?.toLowerCase()
            );
          }
          return (
            itemSport?.categories?.[0]?.name?.toLowerCase() ===
            selectedCategory?.toLowerCase() &&
            itemSport?.sport?.name?.toLowerCase() === sport?.name?.toLowerCase()
          );
        })?.length > 0
      );
    }
    return false;
  };
  const isFavoriteNotification = item => {
    const toggle =
      reduxData?.sportsList?.filter(userSport => {
        if (selectedCategory === 'other') {
          const filteredCategories = userSport?.categories?.filter(category => {
            return !['pro', 'college', 'esports'].includes(category?.name);
          });
          return (
            filteredCategories?.length > 0 &&
            userSport?.sport?.name?.toLowerCase() ===
            item?.name?.toLowerCase() &&
            userSport?.notifications
          );
        }
        return (
          userSport?.categories?.[0]?.name?.toLowerCase() ===
          selectedCategory?.toLowerCase() &&
          userSport?.sport?.name?.toLowerCase() === item?.name?.toLowerCase() &&
          userSport?.notifications
        );
      })?.length > 0;
    return toggle;
  };

  return (
    <>
      <ImageBackground
        source={Images.Background2}
        resizeMode="cover"
        style={styles.container}>
        <StatusBar
          backgroundColor={Colors.transparent}
          translucent
          barStyle="light-content"
        />
        {/* Header with Logo only  */}
        <AppHeader centerImage={Images.Logo} />
        {/* Slider all pro  */}
        <View style={styles.sliderContainer}>
          <FlatList
            horizontal
            data={categoryData}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              fontScale > 1
                ? { justifyContent: 'center' }
                : { justifyContent: 'center', flex: 1 }
            }
            scrollEnabled={fontScale > 1 ? true : false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  reduxData?.user ? handleSelectedCategory(item, index) : {}
                }
                style={styles.sliderInnerContainer}>
                <View
                  style={[
                    styles.sliderInnerMainContainer,
                    { borderWidth: item?.selected ? moderateScale(2, 0.3) : 0 },
                  ]}>
                  {item?.selected && <View style={styles.rectangle2} />}
                  <ImageBackground
                    source={
                      item?.selected
                        ? Images.ActiveSliderBack
                        : Images.InActiveSliderBorder
                    }
                    style={styles.sliderImageBackground}
                    imageStyle={
                      Platform.OS === 'android'
                        ? {
                          borderRadius: moderateScale(22, 0.3),
                          borderWidth: item?.selected
                            ? 0
                            : moderateScale(2.5, 0.3),
                          borderColor: Colors.darkBlue,
                        }
                        : {}
                    }
                    resizeMode={'stretch'}>
                    <Image
                      source={
                        index === 0
                          ? Images.Crown
                          : index === 1
                            ? Images.College
                            : index === 2
                              ? Images.Game
                              : Images.Trophy
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
        {/*  header text */}
        <View style={styles.mangeFvrtContainer}>
          <Text style={styles.mangeFavTxt}>{Strings.manageFavorite}</Text>
        </View>
        {/* main list */}
        <FlatList
          data={filteredEventList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item, index }) => {
            const favouriteStar = isFavoriteCheck(item);
            return reduxData?.user &&
              item?.name &&
              item?.categories?.[0]?.name ? (
              <View style={styles.listContainer}>
                <View style={styles.innerContainer}>
                  <Image
                    source={item?.logo1 && item?.logo1 != 'null' ? {
                      uri: item?.logo1
                    } : Images.BaseBall}
                    style={styles.imageIcon}
                    resizeMode={'contain'}
                  />
                  <View style={styles.userNameContainer}>
                    <Text style={styles.titleTxt}>{item?.name}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleReminder(item, index, favouriteStar)}>
                    <Image
                      source={Images.Bell}
                      resizeMode={'contain'}
                      style={[
                        styles.bellIcon,
                        {
                          tintColor: isFavoriteNotification(item)
                            ? Colors.darkOrange
                            : Colors.white,
                        },
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleFvrt(item)}>
                    <Image
                      source={favouriteStar ? Images.FilledFvrt : Images.Favorite}
                      style={[
                        styles.fvrtIcon,
                        favouriteStar ? { tintColor: Colors.darkOrange } : {},
                      ]}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null;
          }}
          ListEmptyComponent={
            <View>
              <Text style={styles.emptyTxt}>
                {Strings.emptyFavoriteSportList}
              </Text>
            </View>
          }
        />
        {/* event reminder pop up  */}
        <CustomModalView
          visible={reminderModal}
          headerTxt={Strings.eventReminder}
          desTxt={Strings.eventReminderNotifications}
          headerTxtStyle={styles.headerTxtStyle}
          dexTxtStyle={styles.dexTxtStyle}
          blackBtnTxt={Strings.no}
          otherBtnTxt={Strings.yes}
          fillBefore={false}
          btn
          rowStyle={true}
          blue
          blackBtnPress={() => setReminderModal(!reminderModal)}
          otherBtnPress={() => handleNotificationAlert(currentIndex)}
        />


        <CustomModalView
          visible={settingsModal}
          headerTxt={Strings.enableNotification}
          desTxt={Strings.enableNotificationDesc}
          headerTxtStyle={styles.headerTxtStyle}
          dexTxtStyle={styles.dexNotiTxtStyle}
          blackBtnTxt={Strings.cancel}
          otherBtnTxt={Strings.settings}
          fillBefore={false}
          btn
          rowStyle={true}
          blue
          blackBtnPress={() => setSettingsModal(false)}
          otherBtnPress={() => goToSettings()}
        />

        <LoaderModal
          visible={reduxData?.user ? loading || loadingFavourite : false}
          loadingText={''}
        />
      </ImageBackground>
      {/* My Sport Popup for guest  */}
      {fvrtModal ? (
        <CustomMySportsModalView
          visible={fvrtModal}
          desTxt={Strings.accessFeatures}
          blackBtnTxt={Strings.noThanks}
          otherBtnTxt={Strings.createFreeAccount}
          btn
          rowStyle={false}
          blackBtnPress={() => {
            setFvrtModal(!fvrtModal);
            navigation.navigate('Guide');
          }}
          otherBtnPress={() => {
            handleCreateAccount();
          }}
        />
      ) : null}
    </>
  );
}
