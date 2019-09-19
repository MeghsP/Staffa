import React, {Component} from 'react';
import {Text, View,TextInput,Image,TouchableOpacity} from 'react-native';
import {AppConsumer} from '../../../context/AppProvider'; 
import ApiService from '../../../network/ApiService';

export default class ForgotPasswordScreen extends Component {
 constructor(args) {
   super(args);
   apiService = new ApiService();
   this.state = {
      username:''
    }
 }

 onForgotPasswordClick(){
  if(!this.isInputValid()){
    return;
  }
  this.context.showLoading(true);
  apiService.sendForgotPasswordEmail(this.state.username, (error, response) => {
    this.context.showLoading(false);
    if(response){
      this.context.showToast("Reset passowrd email has been sent");
      this.props.navigation.goBack();
    } else {
      this.context.showToast(error);
    }
    
  });
 }

 isInputValid(){
  if(this.state.username === ""){
    this.context.showToast("Please enter email");
     return false;
  }
  return true;
 }

 render() {
   return (
    <AppConsumer>
    {(context) => (
     <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
        <View style={{marginTop:10, flexDirection:'row'}}>
            <TouchableOpacity style={{position:'absolute', marginLeft:10}} onPress={() => context.goBack(this)}>
              <Image source={require('../../../images/back.png')} style={{width:30, height:30}} tintColor={context.utilities.colors.black} />
            </TouchableOpacity>
            <View style={{alignItems:'center', flex:1}} >
              <Text style = {context.utilities.styles.headerLogoTextStyle}>{context.utilities.strings.appName}</Text>
              <Text style = {context.utilities.styles.headerInfoTextStyle}>Forgot Password</Text>
            </View>
        </View>
        <View style = {context.utilities.styles.baseStyle1}>
            <View style = {{width:context.screenWidth}}>
                    <View style = {context.utilities.styles.InputTextBoxStyle}>
                        <TextInput
                           style = {this.state.username === '' ? context.utilities.styles.InputTextDisableStyle : context.utilities.styles.InputTextEnableStyle}
                           placeholder = "Username"
                           onChangeText = {(text) => {this.setState({username:text})}}
                           returnKeyType= { "done" }
                           keyboardType = {"email-address"}
                           underlineColorAndroid='transparent'
                           placeholderTextColor={context.utilities.colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.username}
                           onSubmitEditing = {() => {this.onForgotPasswordClick()}}
                         />
                    </View>

                    <TouchableOpacity onPress={ () => this.onForgotPasswordClick()}>
                        <Text style = {context.utilities.styles.LoginButtonEnableTextStyle}>RESET PASSWORD</Text>
                    </TouchableOpacity>
              </View>      
        </View>
     </View>
     )} 
     </AppConsumer>
   );
 }
}
