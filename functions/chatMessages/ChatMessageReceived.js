const functions = require('firebase-functions');
const admin = require('firebase-admin');

const FS_COLLECTION_CONVERSATION = "Conversations";
const FS_COLLECTION_USERS = "Users";
const FS_COLLECTION_USER_NOTIFICATIONS = "Notifications";

exports.addChatMessage = functions.firestore
  .document(FS_COLLECTION_CONVERSATION + "/{docID}/Topics/{topicID}/Messages/{id}")
  .onCreate(event => {
    console.log("function addChatMessage event : " + JSON.stringify(event));

    const newValue = event.data();
    console.log("function addChatMessage newValue : " + JSON.stringify(newValue));

    // const parentOne = event.data.ref;
    
    console.log("function addChatMessage parentOne : " + JSON.stringify(event.data.previous));
    
    // Add Notification to user's data
    var notificationDoc = admin.firestore().collection(FS_COLLECTION_USERS).doc(newValue.sender).collection(FS_COLLECTION_USER_NOTIFICATIONS).doc();
    var notificationData = {
      type: "ChatMessage",
      screen: "ChatScreen",
      message: newValue.message,
      read: 0,
      time: newValue.time,
    }
    notificationDoc.set(notificationData);

    // Get sender information
    return admin.firestore().collection(FS_COLLECTION_USERS).doc(newValue.sender).get()
      .then(doc => {
        var docData = doc.data();
        var senderName = docData.registerData.firstName + " " + docData.registerData.lastName;

        // Get receiver's FCM Token
        admin.firestore().collection(FS_COLLECTION_USERS).doc(newValue.receiver).get()
          .then(receiverDoc => {
            var receiverData = receiverDoc.data();

            // Get receiver's notification count
            admin.firestore().collection(FS_COLLECTION_USERS).doc(newValue.receiver).collection(FS_COLLECTION_USER_NOTIFICATIONS).get()
              .then(snapshots => {
                console.log("function addChatMessage snapshots size: " + snapshots.size);
                var badgeCount = "" + (snapshots.size + 1);
                if (receiverData.FCMToken) {
                  console.log("function addChatMessage pushToken : " + receiverData.FCMToken);
                  let payload = {
                    notification: {
                      title: senderName,
                      body: newValue.message,
                      badge: badgeCount,
                      sound: 'default'
                    },
                    data:{
                      type: "ChatMessage",
                      screen: "ChatScreen",
                    },
                  }
                  return admin.messaging().sendToDevice(receiverData.FCMToken, payload);
                }
              });
          });
      });
  });
