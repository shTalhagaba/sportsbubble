import React, { useEffect } from 'react';
import Navigation from 'src/navigation';
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
import Toast from "react-native-toast-message";
import { toastConfig } from "src/components/ToastConfig";
// import Amplify, { Auth } from 'aws-amplify';
// import awsConfig from './src/utils/aws-exports';

// Amplify.configure(awsConfig);

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);
const persistor = persistStore(store);

const httpLink = createHttpLink({
  uri: 'https://cpbubzqq92.execute-api.us-west-2.amazonaws.com/dev/graphql', // same web link
  // uri: 'https://6953ptqg3b.execute-api.us-west-2.amazonaws.com/dev/graphql',
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

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
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
