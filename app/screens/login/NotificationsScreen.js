import React, {Component} from 'react';
import {Text,View,ScrollView,TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {AppConsumer} from '../../context/AppProvider'; 

export default class NotificationsScreen extends Component {
 constructor(args) {
   super(args);
   this.state = {
      checked1:false,
    }
 }

 onAgreeClick(){
  var data =  {
    notificationSettings:{
      isNotificationON:this.state.checked1,
  }};
  this.context.apiService.updateFirestoreUserData(this.context.currentUser.uid,data); 
  this.context.replaceScreen(this, this.context.utilities.strings.APP_SCREEN_BEGIN_VERIFICATION);
 }

 render() {
   return (
    <AppConsumer>
    {(context) => (
     <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}> 
        <View style={{alignItems:'center', marginTop:10, width:context.screenWidth}}>
            <Text style = {context.utilities.styles.headerLogoTextStyle}>{context.utilities.strings.appName}</Text>
            <Text style = {context.utilities.styles.headerInfoTextStyle}>Notifications</Text>
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
              checked={this.state.checked1}
              onPress={() => { 
                this.setState({checked1: !this.state.checked1})
              }}
          />
          
            <TouchableOpacity style = {{width:context.screenWidth}} onPress={ () => this.onAgreeClick()}>
              <Text style = {[context.utilities.styles.LoginButtonEnableTextStyle, {marginTop:30, marginBottom:30}]}>NEXT</Text>
            </TouchableOpacity>

        </View>
     </View>
     )} 
     </AppConsumer>
   );
 }
}