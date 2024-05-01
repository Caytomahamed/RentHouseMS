const { Expo } = require('expo-server-sdk');
const expo = new Expo();

async function sendExpoPushNotification(expoPushToken, title, body) {
  const messages = [
    {
      to: expoPushToken,
      sound: 'default',
      title: title,
      body: body,
    },
  ];

  try {
    await expo.sendPushNotificationsAsync(messages);
    console.log('Push notification sent successfully!');
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw new Error('Failed to send push notification');
  }
}

module.exports = { sendExpoPushNotification };
