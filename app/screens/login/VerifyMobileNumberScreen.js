import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,ToastAndroid, Image,Dimensions,TouchableOpacity,Button} from 'react-native';
import Colors from '../../utils/res/Colors';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';
import { Provider,connect } from  'react-redux';
import ProgressView from '../../customViews/ProgressView';
import AsyncStorage from '@react-native-community/async-storage';
import Toast, {DURATION} from 'react-native-easy-toast';
import firebase from 'react-native-firebase';

type Props = {};
class VerifyMobileNumberScreen extends Component {
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

 onSubmitClick(){
  this.setState({isLoading:true});
  // firebase.auth().sendPasswordResetEmail(this.state.username)
  // .then((user) => {
  //   console.log("SUCCESS : " + JSON.stringify(user));
  //   this.setState({isLoading:false});
  //   this.refs.toast.show("Reset passowrd email has been sent");
  //   this.props.navigation.goBack();
  // }).catch(error => {
  //   console.log("ERROR : " + error.message)
  // });
  
 }
 

 render() {
   return (
     <View style={Styles.root}>
        <View style={{alignItems:'center', marginTop:10, width:this.state.screenWidth}}>
            <Text style = {Styles.headerLogoTextStyle}>{Strings.appName}</Text>
            <Text style = {Styles.headerInfoTextStyle}>Status</Text>
        </View>
        <View style = {Styles.baseStyle1}>
        <Text style = {[Styles.NewToAppTextStyle,{marginTop:30, fontSize:20, color:Colors.appColor, fontWeight:'bold'}]}>SUCCESS!</Text>
        <Text style = {[Styles.NewToAppTextStyle,{marginTop:5, marginLeft:30, marginRight:30, fontSize:13, fontWeight:'bold'}]}>You are registered successfully with STAFFA Mobile App.{"\n"}We have sent you an email verification to your registered email id, please verify your email address.</Text>
            {/* <View style = {{width:this.state.screenWidth}}>
                    <View style = {Styles.InputTextBoxStyle}>
                        <TextInput
                           ref = 'inputUsername'
                           style = {this.state.username === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "OTP"
                           onChangeText = {(text) => {this.setState({username:text})}}
                           returnKeyType= { "done" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.username}
                           onSubmitEditing = {() => {this.onSubmitClick()}}
                         />
                    </View>

                    <TouchableOpacity onPress={ () => this.onSubmitClick()}>
                        <Text style = {Styles.LoginButtonEnableTextStyle}>SUBMIT</Text>
                    </TouchableOpacity>
              </View>       */}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyMobileNumberScreen)
