import React, { useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider, useSelector } from 'react-redux';
import rootReducer from 'src/store/Reducers/rootReducer';
import mySaga from 'src/store/sagas';
import Navigation from 'src/navigation';
import SplashScreen from 'react-native-splash-screen'


const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

export default function App() {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000);
  }, [])

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}




