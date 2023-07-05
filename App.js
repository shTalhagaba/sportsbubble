import React, { useEffect, useState } from 'react';
import Navigation from 'src/navigation';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// apollo
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';
import Config from "react-native-config";

//Redux persist 
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider, useSelector } from 'react-redux';
import rootReducer from 'src/store/Reducers/rootReducer';
import mySaga from 'src/store/sagas';



const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['user'],
  // For Merging the data upgradation
  version: 1,
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer,
  applyMiddleware(
    sagaMiddleware,
  ))
// Middleware: Redux Saga
sagaMiddleware.run(mySaga);

// Middleware: Redux Persist Persister
const persistor = persistStore(store);



const httpLink = createHttpLink({
  uri: 'https://6953ptqg3b.execute-api.us-west-2.amazonaws.com/dev/graphql',
  // uri: Config.BASE_URL
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});




export default function App() {
  // const [loadingCache, setLoadingCache] = useState(true)

  // useEffect(() => {
  //   persistCache({
  //     cache,
  //     storage: AsyncStorage,
  //   }).then(() => setLoadingCache(false))
  // }, [])

  // if (loadingCache) {
  //   return <AppLoading />
  // }

  useEffect(() => {
    console.log("URL TESTING => ", Config.BASE_URL)
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </ApolloProvider>
  );
}
