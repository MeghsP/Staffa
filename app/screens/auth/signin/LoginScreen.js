import React, {Component} from 'react';
import {Text, View,TextInput, TouchableOpacity} from 'react-native';
import ApiService from '../../../network/ApiService';
import {AppConsumer} from '../../../context/AppProvider'; 

export default class LoginScreen extends Component {
 constructor(args) {
   super(args);
   apiService = new ApiService();
   this.state = {
      username:'',
      password:'',
    }
    this.inputUserNameRef = React.createRef();
    this.inputPasswordRef = React.createRef();
 }
 
 componentDidMount(){
 }

 onLoginClick(){
  if(!this.isInputValid()){
     return;
  }
  this.context.showLoading(true);
  apiService.signInWithEmailPassword(this.state.username, this.state.password, (error, response) => {
    if(response){
      this.context.checkUserAuthentication((user) => {
        this.context.showLoading(false);
        console.log("Login current screen : " + this.context.currentScreen);
        if(user.emailVerified){
          this.context.replaceScreen(this, this.context.currentScreen);  
        } else {
          this.context.showToast("Please verify your email");
        }
      });
    } else {
      this.context.showLoading(false);
      this.context.showToast(error);
    }
  });
 }

 isInputValid(){
  if(this.state.username === ""){
    this.context.showToast("Please enter email");
     return false;
  }
  if(this.state.password === ""){
    this.context.showToast("Please enter password");
     return false;
  }
  return true;
 }

 onForgotPasswordClick(){
   this.context.moveToScreen(this, this.context.utilities.strings.APP_SCREEN_FORGOT_PASSWORD);
 }
 onRegisterClick(){
  this.context.moveToScreen(this, this.context.utilities.strings.APP_SCREEN_SIGNUP);
 }

 render() {
   return (
    <AppConsumer>
    {(context) => (
     <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
        <View style={{alignItems:'center', marginTop:10, width:context.screenWidth}}>
            <Text style = {context.utilities.styles.headerLogoTextStyle}>{context.utilities.strings.appName}</Text>
            <Text style = {context.utilities.styles.headerInfoTextStyle}>Jobs</Text>
        </View>
        <View style = {context.utilities.styles.baseStyle1}>
            <View style = {{width:context.screenWidth}}>
                    <View style = {context.utilities.styles.InputTextBoxStyle}>
                        <TextInput
                           ref = {this.inputUserNameRef}
                           style = {this.state.username === '' ? context.utilities.styles.InputTextDisableStyle : context.utilities.styles.InputTextEnableStyle}
                           placeholder = "Username"
                           onChangeText = {(text) => {this.setState({username:text})}}
                           returnKeyType= { "next" }
                           keyboardType = {"email-address"}
                           underlineColorAndroid='transparent'
                           placeholderTextColor={context.utilities.colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.username}
                           onSubmitEditing = {() => {this.inputPasswordRef.current.focus()}}
                         />
                    </View>
                    <View style = {context.utilities.styles.InputTextBoxStyle}>
                        <TextInput
                           ref = {this.inputPasswordRef}
                           style = {this.state.password === '' ? context.utilities.styles.InputTextDisableStyle : context.utilities.styles.InputTextEnableStyle}
                           placeholder = "Password"
                           onChangeText = {(text) => {this.setState({password:text})}}
                           returnKeyType= { "done" }
                           secureTextEntry = {true}
                           underlineColorAndroid='transparent'
                           placeholderTextColor={context.utilities.colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.password}
                           onSubmitEditing = {() => {this.onLoginClick()}}
                         />
                    </View>

                    <TouchableOpacity onPress={()=>{this.onForgotPasswordClick()}}>
                      <Text style = {context.utilities.styles.ForgotPasswordLinkTextStyle}>Forgot your password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ () => this.onLoginClick()}>
                        <Text style = {context.utilities.styles.LoginButtonEnableTextStyle}>LOGIN</Text>
                    </TouchableOpacity>

                    <Text style = {context.utilities.styles.NewToAppTextStyle}>New to STAFFA App?</Text>
                    <TouchableOpacity onPress={()=>{this.onRegisterClick()}} style = {{marginTop:5, justifyContent:'center',alignItems:'center', textAlign:'center'}}>
                      <Text style = {context.utilities.styles.RegisterLinkTextStyle}>REGISTER HERE</Text>
                    </TouchableOpacity>
              </View>      
        </View>
     </View>
     )} 
     </AppConsumer> 
   );
 }
}

