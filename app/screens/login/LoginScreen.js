import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, Image,Dimensions,TouchableOpacity,Button} from 'react-native';
import Colors from '../../utils/res/Colors';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';
import { Provider,connect } from  'react-redux';
import ProgressView from '../../customViews/ProgressView';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import Toast, {DURATION} from 'react-native-easy-toast';
import ApiService from '../../network/ApiService';

type Props = {};
class LoginScreen extends Component {
 constructor(args) {
   super(args);
   let { width } = Dimensions.get("window");
   apiService = new ApiService();
   this.state = {
      screenWidth: width,
      username:'',
      password:'',
      isUserLoggedIn:false,
      isLoading:false,
    }
 }
 componentWillMount = () => {
 }
 componentDidMount(){
 }

 onLoginClick(){
  if(this.state.username === ""){
    this.refs.toast.show("Please enter email");
     return;
  }
  if(this.state.password === ""){
    this.refs.toast.show("Please enter password");
     return;
  }
  this.setState({isLoading:true});
  var myScreen = this;
  firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
  .then((user) => {
    console.log("Login SUCCESS : " + JSON.stringify(user));
    AsyncStorage.setItem(Strings.PREF_USER_DATA, JSON.stringify(user));
    
    if(user.user.emailVerified){
      this.ref = firebase.firestore().collection(Strings.FS_COLLECTION_USERS).doc(user.user.uid);
      this.ref.get()
        .then(querySnapshot => {
        if(querySnapshot.exists){
          console.log("login data exists : " + JSON.stringify(querySnapshot.data()));
          var data = querySnapshot.data();
          console.log("login 1: ");
          var screen = apiService.getScreenName(data);
          console.log("Login screen" + screen);
          myScreen.setState({isLoading:false});
          console.log("login 2: ");
          myScreen.props.navigation.replace(screen);
          console.log("login 3: ");
        } else {
          this.setState({isLoading:false});
          this.refs.toast.show("Something went wrong");
        }
      })
    } else {
      this.setState({isLoading:false});
      this.refs.toast.show("Please verify your email address");
    }
    
  }).catch(error => {
    this.setState({isLoading:false});
    console.log("ERROR : " + error.message);
    this.refs.toast.show(error.message);
  });
 }
 onForgotPasswordClick(){
  var {navigate} = this.props.navigation;
  navigate("ForgotPasswordScreen");
 }
 onRegisterClick(){
  var {navigate} = this.props.navigation;
  navigate("SignUpScreen");
 }

 render() {
   return (
     <View style={Styles.root}>
        <View style={{alignItems:'center', marginTop:10, width:this.state.screenWidth}}>
            <Text style = {Styles.headerLogoTextStyle}>{Strings.appName}</Text>
            <Text style = {Styles.headerInfoTextStyle}>Jobs</Text>
        </View>
        <View style = {Styles.baseStyle1}>
            <View style = {{width:this.state.screenWidth}}>
                    <View style = {Styles.InputTextBoxStyle}>
                        <TextInput
                           ref = 'inputUsername'
                           style = {this.state.username === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Username"
                           onChangeText = {(text) => {this.setState({username:text})}}
                           returnKeyType= { "next" }
                           keyboardType = {"email-address"}
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.username}
                           onSubmitEditing = {() => {this.refs.inputPassword.focus()}}
                         />
                    </View>
                    <View style = {Styles.InputTextBoxStyle}>
                        <TextInput
                           ref = 'inputPassword'
                           style = {this.state.password === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Password"
                           onChangeText = {(text) => {this.setState({password:text})}}
                           returnKeyType= { "done" }
                           secureTextEntry = {true}
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.password}
                           onSubmitEditing = {() => {this.onLoginClick()}}
                         />
                    </View>

                    <TouchableOpacity onPress={()=>{this.onForgotPasswordClick()}}>
                      <Text style = {Styles.ForgotPasswordLinkTextStyle}>Forgot your password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ () => this.onLoginClick()}>
                      {/* <View style = {Styles.LoginButtonBackgroundStyle}> */}
                        <Text style = {Styles.LoginButtonEnableTextStyle}>LOGIN</Text>
                      {/* </View> */}
                    </TouchableOpacity>

                    <Text style = {Styles.NewToAppTextStyle}>New to STAFFA App?</Text>
                    <TouchableOpacity onPress={()=>{this.onRegisterClick()}} style = {{marginTop:5, justifyContent:'center',alignItems:'center', textAlign:'center'}}>
                      <Text style = {Styles.RegisterLinkTextStyle}>REGISTER HERE</Text>
                    </TouchableOpacity>
              </View>      
        </View>
        {this.state.isLoading && <ProgressView/> }
        <Toast ref="toast"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
