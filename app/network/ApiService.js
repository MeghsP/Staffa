import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import Strings from '../utils/res/Strings';
import UUIDGenerator from 'react-native-uuid-generator';
import moment from 'moment';

export default class ApiService {

  getUserData(uid, callBack){
    var userDataStore = firebase.firestore().collection(Strings.FS_COLLECTION_USERS).doc(uid);
    userDataStore.get()
    .then(querySnapshot => {
      if(querySnapshot.exists){
        callBack(null, querySnapshot.data());
      } else {
        callBack("Error", null);
      }
    })
  }

  signInWithEmailPassword(email,password, callBack){
    console.log("Api Service signInWithEmailPassword");
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      console.log("Api Service Login SUCCESS : " + JSON.stringify(user));
      AsyncStorage.setItem(Strings.PREF_USER_DATA, JSON.stringify(user));
      callBack(null, user);
    }).catch(error => {
      console.log("Api Service ERROR : " + error.message);
      callBack(error.message, null);
    });
  }

  sendEmailVerification(callBack){
    firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
      console.log("Api Service sendEmailVerification SUCCESS");
      callBack(null, "Success");
    }).catch(error => {
      console.log("Api Service sendEmailVerification ERROR : " + error.message);
      callBack(error.message, null);
    });
  }

  signUpWithEmailPassword(email,password, callBack){
    console.log("Api Service sendEmailVerification");
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      console.log("Api Service Sign UP SUCCESS : " + JSON.stringify(user));
      callBack(null, user);
    }).catch(error => {
      console.log("Api Service ERROR : " + error.message);
      callBack(error.message, null);
    });
  }

  sendForgotPasswordEmail(email , callBack){
    console.log("Api Service sendForgotPasswordEmail");
    firebase.auth().sendPasswordResetEmail(email)
    .then((user) => {
      console.log("SUCCESS : " + JSON.stringify(user));
      callBack(null, "success");
    }).catch(error => {
      callBack(error.message, null);
    });
  }

  signOut(callBack){
    console.log("Api Service signOut");
    firebase.auth().signOut()
    .then((data) => {
      console.log("SUCCESS : " + JSON.stringify(data));
      callBack(null, "success");
    }).catch(error => {
      callBack(error.message, null);
    });
  }

  uploadImage(filePath,imageAvatar, callBack){
    UUIDGenerator.getRandomUUID((uuid) => {
      console.log("ApiService uploadImage uuid : " + uuid);
      const ext = imageAvatar.split('.').pop(); // Extract image extension
      console.log("ApiService uploadImage ext : " + ext);
      const filename = uuid + "." + ext; // Generate unique name
      console.log("ApiService uploadImage filename : " + filename);
      firebase.storage().ref(filePath + "/" + filename)
        .putFile(imageAvatar)
        .on(firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            console.log("ApiService uploadImage state : " + firebase.storage.TaskState.SUCCESS);
            if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
              // allImages.push(snapshot.downloadURL);
              console.log("ApiService uploadImage URL : " + snapshot.downloadURL);
              callBack("", snapshot.downloadURL);
            } 
            //  else {
            //   callBack("Error", "");
            // }
          },
          error => {
            callBack("Error", "");
          }
        );
    });  
  };

  addFirestoreUserData(userID, data){
    console.log("addFirestoreUserData userID : " +userID); 
    var users = firebase.firestore().collection(Strings.FS_COLLECTION_USERS);
    var userDoc = users.doc(userID);
    userDoc.set(data);
   }

  updateFirestoreUserData(userID, data){
   console.log("updateFirestoreUserData userID : " +userID); 
   var users = firebase.firestore().collection(Strings.FS_COLLECTION_USERS);
   var userDoc = users.doc(userID);
   userDoc.update(data);
  }

  getChatUID(uid1, uid2){
    if(uid1 < uid2){
      return uid1 + uid2;  
    } else {
      return uid2 + uid1;
    }
   }

   isConversationExist(chatUID, callBack){
    var chatRef = firebase.firestore().collection(Strings.FS_COLLECTION_CONVERSATION).doc(chatUID);
    chatRef.get().then(doc => {
        if (doc.exists) {
          // this.getTopics(chatRef,doc.data(), callBack);
          var data = doc.data();
          callBack(false, {exist:true, data:{currentTopic:data.currentTopic}});
          console.log("ApiService isConversationExist data : " + JSON.stringify(data)); 
        } else {
          callBack(false, {exist:false, data:null});
        }
    }).catch(err => {
       callBack(true, null);
    });
   }

   getUserData(userID, callBack){
    var users = firebase.firestore().collection(Strings.FS_COLLECTION_USERS);
    var userDoc =  users.doc(userID);  
    userDoc.get().then(doc => {
      callBack(false, doc.data());
    }).catch(err => {
       callBack(true, null);
    });
   }


   getUserNotificationNode(userID){
      return firebase.firestore().collection(Strings.FS_COLLECTION_USERS).doc(userID).collection(Strings.FS_COLLECTION_NOTIFICATIONS);
   }

   markNotificationAsRead(userID, item){
     item.read = 1;
     var notification = getUserNotificationNode(userID);
     notification.doc(item.id).update(data);
   }

   getFormattedTime(time, format){
    return moment(time).format(format)
   }


  setNewConversation(userID, receiverID, chatUID){
    // Entry to Sender Conversation collection
    var chatDoc = this.getUserConversationNode(userID, chatUID);
    var data = {
        topics:[],
        senderID:receiverID
    };
    chatDoc.set(data);

    // Entry to Receiver Conversation collection
    chatDoc = this.getUserConversationNode(receiverID, chatUID);
    data = {
        topics:[],
        senderID:userID
    };
    chatDoc.set(data);

    // Entry to Conversation collection
    var chatUIDDoc = this.getConversationNode(chatUID);  
    chatUIDDoc.set({currentTopic:""});
  }

  addNewTopicNode(topicName, chatUID) {
    var chatUIDDoc = this.getConversationNode(chatUID); 
    chatUIDDoc.set({currentTopic:topicName});
    var conversation = chatUIDDoc.collection(Strings.FS_COLLECTION_TOPICS); 
    var topicDoc = conversation.doc(topicName); 
    var data = {
          unseenCount:0,
          lastMessageID:0,
    };
    topicDoc.set(data);
  }

  updateCurrentTopic(topicName, chatUID) {
    var chatUIDDoc = this.getConversationNode(chatUID); 
    chatUIDDoc.update({currentTopic:topicName});
  }

  getUserConversationNode(userID, chatUID) {
    var users = firebase.firestore().collection(Strings.FS_COLLECTION_USER_CONVERSATION);
    var userDoc =  users.doc(userID);  
    userDoc.set({set:true});
    var conversation = userDoc.collection(Strings.FS_COLLECTION_CONVERSATION); 
    return conversation.doc(chatUID);  
  }

  
  getConversationNode(chatUID) {
    var users = firebase.firestore().collection(Strings.FS_COLLECTION_CONVERSATION);
    return users.doc(chatUID);  
  }

  isTopicExist(topicName, topics) {
    topics.map((topic) => {
      if(topic.topicName.toLowerCase() === topicName.toLowerCase()){
        return true;
      } else {
        return false;
      }
    });
    return false;
  }

  subscribeToNotificationListeners() {
    const channel = new firebase.notifications.Android.Channel(
        'DefaultChannelStaffa',
        'Notifications',
        firebase.notifications.Android.Importance.Max
    ).setDescription('A Channel To manage the notifications related to Staffa Application');
    firebase.notifications().android.createChannel(channel);
  }
  
  displayNotification(notification) {
    const data = new firebase.notifications.Notification({sound: 'default',show_in_foreground: true})
      .setNotificationId(notification.notificationId)
      .setTitle(notification.title)
      .setBody(notification.body)
      .setData(notification.data)
      .android.setChannelId('DefaultChannelStaffa');

    firebase.notifications().displayNotification(data);
  }

  getScreenName(data) {
    if(data.addressData){
      if(data.isTermsAccepted){
        if(data.isEmploymentAccepted){
          if(data.isPrivacyAccepted){
            if(data.infoSharing){
              if(data.notificationSettings){
                if(data.docVerification){
                  if(data.dbsDocument){
                    if(data.qualification){
                      if(data.cartificates){
                        if(data.references){
                          if(data.skills){
                            if(data.bio){
                              return Strings.APP_SCREEN_HOME;
                            } else {
                              return Strings.APP_SCREEN_BIO;
                            }
                          } else {
                            return Strings.APP_SCREEN_SKILLS;
                          }
                        } else {
                          return Strings.APP_SCREEN_REFERENCES;
                        }
                      } else {
                        return Strings.APP_SCREEN_CERTIFICATE;
                      }
                    } else {
                      return Strings.APP_SCREEN_QUALIFICATION;
                    }
                  } else {
                    return Strings.APP_SCREEN_DBS;
                  }
                } else {
                  return Strings.APP_SCREEN_VERIFICATION;
                }
              } else {
                return Strings.APP_SCREEN_NOTIFICATION_SETTINGS;
              }
            } else {
              return Strings.APP_SCREEN_INFO_SHARING;
            }
          } else {
            return Strings.APP_SCREEN_PRIVACY;
          }
        } else {
          return Strings.APP_SCREEN_EMP_CONTRACT;
        }
      } else {
        return Strings.APP_SCREEN_TNC;
      }  
    } else {
      return Strings.APP_SCREEN_ADD_ADDRESS;
    }
  }
}