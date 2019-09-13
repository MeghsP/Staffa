import React, {Component} from 'react';
import {Text,View,Image,ScrollView,TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {AppConsumer} from '../../../context/AppProvider'; 

export default class NotificationsScreen extends Component {
 constructor(args) {
   super(args);
   this.state = {
    isNotificationON:false,
    }
 }

 componentDidMount(){
  if(this.context.userData && this.context.userData.notificationSettings){
   var info = this.context.userData.notificationSettings;
   this.setState(info);
   this.setState({isDataAvailable:true});
  }
}

 onAgreeClick(){
  var data =  {
    notificationSettings:{
      isNotificationON:this.state.isNotificationON,
  }};
  this.context.apiService.updateFirestoreUserData(this.context.currentUser.uid,data); 
  this.context.updateUserData();
  if(this.state.isDataAvailable){
    // this.context.userData.notificationSettings = data.notificationSettings;
    this.context.goBack(this);
  } else {
    this.context.replaceScreen(this, this.context.utilities.strings.APP_SCREEN_BEGIN_VERIFICATION);
  }
 }

 render() {
   return (
    <AppConsumer>
    {(context) => (
     <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}> 
        <View style={{marginTop:10, flexDirection:'row'}}>
         {this.state.isDataAvailable && 
            <TouchableOpacity style={{position:'absolute', marginLeft:10}} onPress={() => context.goBack(this)}>
              <Image source={require('../../../images/back.png')} style={{width:30, height:30}} tintColor={context.utilities.colors.black} />
            </TouchableOpacity>
          }
          <View style={{alignItems:'center', flex:1}} >
            <Text style = {context.utilities.styles.headerLogoTextStyle}>{context.utilities.strings.appName}</Text>
            <Text style = {context.utilities.styles.headerInfoTextStyle}>Notifications</Text>
          </View>
         </View> 
        <View style = {context.utilities.styles.baseStyle1}>
            <ScrollView style={[context.utilities.styles.TNCFixBackgroundViewStyle, {height:100}]}>
              <Text style = {[context.utilities.styles.TNCTextStyle,{fontSize:15}]}>{context.utilities.strings.registerNotificationMsg}</Text>
            </ScrollView>

          <CheckBox
              title='Turn Notifications ON/OFF'
              checkedColor={context.utilities.colors.appColor}
              containerStyle = {context.utilities.styles.CheckBoxLeftContainerStyle}
              textStyle = {[context.utilities.styles.CheckBoxTextStyle]}
              checked={this.state.isNotificationON}
              onPress={() => { 
                this.setState({isNotificationON: !this.state.isNotificationON})
              }}
          />
          
            <TouchableOpacity style = {{width:context.screenWidth}} onPress={ () => this.onAgreeClick()}>
              <Text style = {[context.utilities.styles.LoginButtonEnableTextStyle, {marginTop:30, marginBottom:30}]}>{this.state.isDataAvailable ? 'UPDATE' :  "NEXT"}</Text>
            </TouchableOpacity>

        </View>
     </View>
     )} 
     </AppConsumer>
   );
 }
}