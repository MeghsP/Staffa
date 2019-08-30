import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,ToastAndroid, Image,Dimensions,TouchableOpacity,Button} from 'react-native';
import Colors from '../../utils/res/Colors';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';
import { Provider,connect } from  'react-redux';
import ProgressView from '../../customViews/ProgressView';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import Toast, {DURATION} from 'react-native-easy-toast'

type Props = {};
class ForgotPasswordScreen extends Component {
 constructor(args) {
   super(args);
   let { width } = Dimensions.get("window");
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

 onForgotPasswordClick(){
  this.setState({isLoading:true});
  firebase.auth().sendPasswordResetEmail(this.state.username)
  .then((user) => {
    console.log("SUCCESS : " + JSON.stringify(user));
    this.setState({isLoading:false});
    this.refs.toast.show("Reset passowrd email has been sent");
    setTimeout(()=>{
      this.props.navigation.goBack();
    }, 1000);
    
  }).catch(error => {
    this.setState({isLoading:false});
    console.log("ERROR : " + error.message);
    this.refs.toast.show(error.message);
  });
  
 }
 

 render() {
   return (
     <View style={Styles.root}>
        <View style={{alignItems:'center', marginTop:10, width:this.state.screenWidth}}>
            <Text style = {Styles.headerLogoTextStyle}>{Strings.appName}</Text>
            <Text style = {Styles.headerInfoTextStyle}>Forgot Password</Text>
        </View>
        <View style = {Styles.baseStyle1}>
            <View style = {{width:this.state.screenWidth}}>
                    <View style = {Styles.InputTextBoxStyle}>
                        <TextInput
                           ref = 'inputUsername'
                           style = {this.state.username === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Username"
                           onChangeText = {(text) => {this.setState({username:text})}}
                           returnKeyType= { "done" }
                           keyboardType = {"email-address"}
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.username}
                           onSubmitEditing = {() => {this.onForgotPasswordClick()}}
                         />
                    </View>

                    <TouchableOpacity onPress={ () => this.onForgotPasswordClick()}>
                        <Text style = {Styles.LoginButtonEnableTextStyle}>RESET PASSWORD</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
