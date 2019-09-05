import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {AppConsumer} from '../../../context/AppProvider'; 

export default class VerifyMobileNumberScreen extends Component {
 constructor(args) {
   super(args);
 }

 render() {
   return (
    <AppConsumer>
    {(context) => (
     <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
        <View style={{alignItems:'center', marginTop:10, width:context.screenWidth}}>
            <Text style = {context.utilities.styles.headerLogoTextStyle}>{context.utilities.strings.appName}</Text>
            <Text style = {context.utilities.styles.headerInfoTextStyle}>Status</Text>
        </View>
        <View style = {context.utilities.styles.baseStyle1}>
          <Text style = {[context.utilities.styles.NewToAppTextStyle,{marginTop:30, fontSize:20, color:context.utilities.colors.appColor, fontWeight:'bold'}]}>SUCCESS!</Text>
          <Text style = {[context.utilities.styles.NewToAppTextStyle,{marginTop:5, marginLeft:30, marginRight:30, fontSize:13, fontWeight:'bold'}]}>You are registered successfully with STAFFA Mobile App.{"\n"}We have sent you an email verification to your registered email id, please verify your email address.</Text>
        </View>
     </View>
    )} 
    </AppConsumer>
   );
 }
}