import React, { useEffect } from 'react';
import Navigation from 'src/navigation';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';
import Config from 'react-native-config';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import rootReducer from 'src/store/Reducers/rootReducer';
import mySaga from 'src/store/sagas';
import { LogBox } from 'react-native';

const expireTime = 20 * 1000; // 20 seconds * 1000 in milliseconds

const expireCacheTransform = createTransform(
  // Modify the data on its way to being stored
  (inboundState, key) => ({
    data: inboundState,
    expire: Date.now() + expireTime, // Add expiration timestamp to the data
  }),

  // Modify the data on its way out of storage
  (outboundState, key) => {
    const currentTime = Date.now();
    if (currentTime > outboundState.expire) {
      console.log('outboundState:', currentTime, outboundState.expire);
      // The data has expired, return null to trigger a refresh
      return null;
    }
    // The data is still valid, remove the expiration timestamp
    const { expire, ...data } = outboundState;
    return data;
  },
);

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['user'],
  version: 1,
  // transforms: [expireCacheTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);
const persistor = persistStore(store);

const httpLink = createHttpLink({
  uri: 'https://6953ptqg3b.execute-api.us-west-2.amazonaws.com/dev/graphql',
  // uri: Config.BASE_URL
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  const handleAppReload = async () => {
    const isCacheExpired = await checkCacheExpiration();
    console.log('isCacheExpired: before', isCacheExpired);
    if (isCacheExpired) {
      console.log('isCacheExpired: after', isCacheExpired);
      // Fetch new data or perform any necessary operations to get the updated data
      // You can use Redux actions and middleware to handle this

      // Once you have the new data, you can update the cache by dispatching an action
      // For example:
      // await dispatch(updateCacheDataAction(newData));
    }
  };

  const checkCacheExpiration = async () => {
    const cachedData = await AsyncStorage.getItem('persist:root');

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = Date.now();
      const expireTime = parsedData.expire;
      return currentTime > expireTime;
    }

    return true;
  };

  useEffect(() => {
    persistCache({
      cache: client.cache,
      storage: AsyncStorage,
    }).then(() => {
      handleAppReload();
    });
  }, []);

  useEffect(() => {
    console.log('URL TESTING => ', Config.BASE_URL);
    SplashScreen.hide();
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor} onBeforeLift={handleAppReload}>
            <Navigation />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
