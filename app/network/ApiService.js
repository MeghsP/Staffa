import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import Strings from '../utils/res/Strings';
import UUIDGenerator from 'react-native-uuid-generator';
export default class ApiService {

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

  updateFirestoreData(data){
   var currentUser = firebase.auth().currentUser;
   var userID = currentUser.uid;
   console.log("updateFirestoreData user : " + JSON.stringify(currentUser)); 
   console.log("updateFirestoreData userID : " +userID); 
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