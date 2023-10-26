import RNPusherPushNotifications from 'react-native-pusher-push-notifications';
import Config from 'react-native-config';
import { Notifications } from 'react-native-notifications';
import Toast from 'react-native-toast-message';

const defaultIntrests = [];
var listener = null

const showToast = (title, body) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: body
  });
}

export const initializePusher = () => {
  RNPusherPushNotifications.setInstanceId("9f629623-f580-41c5-b792-70ab87a1a047")
  listener = RNPusherPushNotifications.on('registered', (response) => {
    console.log('response: ', response)
    defaultIntrests.map((item) => {
      subscribeInterest(item);
    })
  });
  RNPusherPushNotifications.on('notification', handleNotification);
  RNPusherPushNotifications.setOnSubscriptionsChangedListener(onSubscriptionsChanged);

};
const onSubscriptionsChanged = (interests) => {
  console.log("CALLBACK: onSubscriptionsChanged");
  console.log(interests);
}

export const removeListener = () => {
  if (listener) {
    listener.remove()
  }
}

const handleNotification = notification => {
  console.log("notification: ", notification);
  if (Platform.OS === 'ios') {
    switch (notification?.appState) {
      case 'inactive':
        console.log("Notification recieved inactive =====")
      // inactive: App came in foreground by clicking on notification.
      //           Use notification.userInfo for redirecting to specific view controller
      case 'background':
        console.log("Notification recieved background =====")
      // background: App is in background and notification is received.
      //             You can fetch required data here don't do anything with UI
      case 'active':
        console.log("Notification recieved active =====")
        showToast(notification?.userInfo?.aps?.data?.title, notification?.userInfo?.aps?.data?.body);
      // App is foreground and notification is received. Show a alert or something.
      default:
        break;
    }
  } else {
    console.log("android handled notification...");
    showToast(notification.title, notification.body);
    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
      console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
      completion({ alert: false, sound: false, badge: false });
    });

    Notifications.events().registerNotificationOpened((notification, completion) => {
      console.log(`Notification opened: ${notification.payload}`);
      completion();
    });
  }
};

export const subscribeInterest = interest => {
  console.log("interest => ", interest)
  console.log("RNPusherPushNotifications => ", RNPusherPushNotifications)
  RNPusherPushNotifications.subscribe(
    interest,
    (statusCode, response) => {
      console.error(statusCode, response);
    },
    () => {
      console.log('Success subscribeInterest');
    }
  );
};

export const unsubscribeInterest = interest => {
  RNPusherPushNotifications.unsubscribe(
    interest,
    (statusCode, response) => {
      console.log(statusCode, response);
    },
    () => {
      console.log('Success unsubscribeInterest');
    }
  );
};