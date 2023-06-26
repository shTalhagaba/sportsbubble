import React, { useEffect, useState } from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider, useSelector } from 'react-redux';
import rootReducer from 'src/store/Reducers/rootReducer';
import mySaga from 'src/store/sagas';
import Navigation from 'src/navigation';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
// apollo 
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { persistCache } from 'apollo3-cache-persist'

const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: 'https://api.graphql.guide/graphql',
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

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
    setTimeout(() => {
      SplashScreen.hide()
    }, 1000);
  }, [])

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </NavigationContainer>
    </ApolloProvider>
  );
}




