import RNPusherPushNotifications from 'react-native-pusher-push-notifications';
import Config from 'react-native-config';
import { Notifications } from 'react-native-notifications';
import Toast from 'react-native-toast-message';
import { navigateUsingRef } from '../../../App';

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
  // RNPusherPushNotifications.setInstanceId(Config?.INSTANCE_ID)
  RNPusherPushNotifications.setInstanceId('ebda95ad-6fd1-4517-9034-4f1a02ac8364')
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
        navigateUsingRef('GuideMain')
      case 'background':
        navigateUsingRef('GuideMain')
      case 'active':
        showToast(notification?.userInfo?.aps?.data?.title, notification?.userInfo?.aps?.data?.body);
      default:
        break;
    }
  } else {
    console.log("android handled notification...");
    showToast(notification.title, notification.body);
    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
      console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
      navigateUsingRef('GuideMain')
      completion({ alert: false, sound: false, badge: false });
    });

    Notifications.events().registerNotificationOpened((notification, completion) => {
      navigateUsingRef('GuideMain')
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