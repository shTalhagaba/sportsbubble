/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider, useSelector} from 'react-redux';
import rootReducer from './src/store/Reducers/rootReducer';
import mySaga from './src/store/sagas';
import Navigation from './src/navigation/Navigation';


const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

// function App(): JSX.Element {
  export default function App() {
  // const user = useSelector((state:any) => state);

  return (
    <Provider store={store}>
      <Navigation />
   {/* <View>
      <Text>{user.email}</Text>
    <Text>hello</Text>
   </View> */}
   </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

// export default App;
