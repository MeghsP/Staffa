/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet,Text, View, Image,Dimensions,TouchableOpacity,Button} from 'react-native';
import Colors from './utils/res/Colors';
import Styles from './utils/res/Styles';
import Strings from './utils/res/Strings';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { createUser } from './my_redux/actions/index';
import ApiService from './network/ApiService';

type Props = {};
// export default class SplashScreen extends Component<Props> {
class SplashScreen extends Component {
  
 constructor(props) {
   super(props);
   let { width } = Dimensions.get("window");
   apiService = new ApiService();
   this.state = {
      screenWidth: width,
      isUserLoggedIn:false,
    }
 }
 componentWillMount = () => {
   console.log("Staffa","AppJS componentWillMount");
 }
 componentDidMount(){
  this.fireBaseListener = firebase.auth().onAuthStateChanged(user => {
      console.log("USER : " + user);
      var screen = "";
      if(user){
        console.log("USER : " + JSON.stringify(user));
        console.log("USER ID : " + user.uid);
        if(user.emailVerified){
          // .collection(Strings.FS_COLLECTION_REGISTER_USET_DATA)
          this.ref = firebase.firestore().collection(Strings.FS_COLLECTION_USERS).doc(user.uid);
          this.ref.get()
              .then(querySnapshot => {
                if(querySnapshot.exists){
                  console.log("data exists : " + JSON.stringify(querySnapshot.data()));
                  var data = querySnapshot.data();
                  screen = apiService.getScreenName(data);
                  console.log("Screen : " + screen);
                } else {
                  screen = "LoginScreen";
                  console.log("data not exists");
                }
                this.setScreenTimeout(screen);
          })
          // this.props.navigation.replace('HomeScreen')
        } else {
          screen = "LoginScreen";
          this.setScreenTimeout(screen);
          // this.props.navigation.replace('LoginScreen')
        }
      } else {
        screen = "LoginScreen";
        this.setScreenTimeout(screen);
        // this.props.navigation.replace('LoginScreen')
      }
      
    })
 }

 setScreenTimeout(screen){
  this.timeoutHandle = setTimeout(()=>{
    this.props.navigation.replace(screen)
  }, 2500);
 }

 componentWillUnmount() {
  clearTimeout(this.timeoutHandle);
  this.fireBaseListener && this.fireBaseListener();
  // this.fireBaseListener = undefined;
}

 render() {
   return (
     <View style={Styles.root}>
        <View style = {Styles.baseStyle1}>
            <Text style = {Styles.splashLogoTextStyle}>STAFFA</Text>
        </View>
     </View>
   );
 }
}

export const mapStateToProps = ({ auth}) =>
  ({
    auth,
  });

const mapDispatchToProps = dispatch => {
  return {
      createUser
  }
}
// export default compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   firebaseConnect()
// )(SplashScreen)
export default connect(mapStateToProps, {createUser})(SplashScreen)
