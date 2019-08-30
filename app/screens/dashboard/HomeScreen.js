import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,Dimensions,TouchableOpacity,Button} from 'react-native';
import Colors from '../../utils/res/Colors';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';
import firebase from 'react-native-firebase';
import { Provider,connect } from  'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

type Props = {};
class HomeScreen extends Component {
 constructor(args) {
   super(args);
   let { width } = Dimensions.get("window");
   this.state = {
      screenWidth: width,
      isUserLoggedIn:false,
    }
 }
 componentWillMount = () => {
 }
 componentDidMount(){
  // var userID =  "ck0XemugljUFbaaT0DNsov1eRmq1";
  // console.log("UserID : " + userID);
  // var users = firebase.firestore().collection(Strings.FS_COLLECTION_USERS);
  // var userDoc = users.doc(userID);
  // var registerCollection = userDoc.collection(Strings.FS_COLLECTION_REGISTER_USET_DATA);
  // registerCollection.add({
  //   // registerData:{username:"Megha",firstName:'Meghs'}
  //   username:"Megha",firstName:'Meghs'
  //   // firstName: this.state.firstName, 
  //   // lastName: this.state.lastName,
  //   // dob:this.state.dobDate,
  //   // nationalIDNumber:this.state.nationalIDNumber,
  //   // mobileNumber:this.state.mobileNumber,
  //   // regNumber:this.state.regNumber,
  //   // gender:this.state.gender,
  //   // isSecurePay:this.state.checked
  // });
  // users.doc(userID)
  // .collection(Strings.FS_COLLECTION_REGISTER_USET_DATA)
  // .add({
  //   username:"Megha",firstName:'Meghs'
  // });
 }

 componentWillUnmount(){
 }
 render() {
   return (
     <View style={Styles.root}>
        <View style = {Styles.baseStyle1}>
            <Text style = {Styles.splashLogoTextStyle}>Welcome to STAFFA</Text>
        </View>
     </View>
   );
 }
}

const mapStateToProps = state => {
  return {
    // places: state.places.places
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // add: (name) => {
    //   dispatch(addPlace(name))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
