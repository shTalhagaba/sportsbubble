import React, { useEffect } from 'react';
import Navigation from 'src/navigation';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { persistCache } from 'apollo3-cache-persist';
import Config from 'react-native-config';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import rootReducer from 'src/store/Reducers/rootReducer';
import mySaga from 'src/store/sagas';
import { LogBox, Platform } from 'react-native';
import Toast from "react-native-toast-message";
import { toastConfig } from "src/components/ToastConfig";
import { stageToken } from 'src/utils/list';
import { setContext } from 'apollo-link-context';

const blacklist = ['signup']; // Add the keys of slices to exclude
const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist, // Apply the blacklist
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);
const persistor = persistStore(store);

const httpLink = createHttpLink({
  // uri: 'https://9oa4ll4zp8.execute-api.us-west-2.amazonaws.com/stage/graphql',  // sb3 staging
  // uri: 'https://cpbubzqq92.execute-api.us-west-2.amazonaws.com/dev/graphql', // same web link
  // uri: 'https://6953ptqg3b.execute-api.us-west-2.amazonaws.com/dev/graphql', // sb2 watch sport dev
  uri: 'https://09a84a77s4.execute-api.us-west-2.amazonaws.com/dev/graphql', // sb5 dev passport 
  // uri: Config.BASE_URL
});

const authLink = setContext((_, { headers }) => {
  const token = Platform.OS === 'android' ? `Bearer ${stageToken}` : `Bearer ${Config.BEARER_TOKEN}`;
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

const theme = {
  ...DefaultTheme,
  colors
    : {
    ...DefaultTheme.colors,
    background: 'black'
    ,
  },
};

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
            <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
