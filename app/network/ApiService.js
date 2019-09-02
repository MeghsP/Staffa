import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import Strings from '../utils/res/Strings';
import UUIDGenerator from 'react-native-uuid-generator';
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
                              return "HomeScreen";
                            } else {
                              return "BioScreen";
                            }
                          } else {
                            return "SkillsScreen";
                          }
                        } else {
                          return "ReferencesScreen";
                        }
                      } else {
                        return "CertificateScreen";
                      }
                    } else {
                      return "QualificationScreen";
                    }
                  } else {
                    return "DBSScreen";
                  }
                } else {
                  return "VerificationScreen";
                }
              } else {
               return "NotificationsScreen";
              }
            } else {
              return "InfoSharingScreen";
            }
          } else {
            return "PrivacyScreen";
          }
        } else {
          return "EmploymentContractScreen";
        }
      } else {
        return "TermsConditionScreen";
      }  
    } else {
      return "AddAddressScreen";
    }
  }
}