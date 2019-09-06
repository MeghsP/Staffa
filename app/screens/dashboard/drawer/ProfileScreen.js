import React, {Component} from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import Header from '../../../utils/header';
import {AppConsumer} from '../../../context/AppProvider';
import { ScrollView } from 'react-native-gesture-handler';
import Strings from '../../../utils/res/Strings';

const PROFILE_OPTIONS = [
  {name:"Basic Settings", screen:Strings.APP_SCREEN_PROFILE},
  {name:"Address or Bank ", screen:Strings.APP_SCREEN_ADD_ADDRESS},
  {name:"Terms & Condition", screen:Strings.APP_SCREEN_TNC},
  {name:"Employee Contract", screen:Strings.APP_SCREEN_EMP_CONTRACT},
  {name:"Privacy", screen:Strings.APP_SCREEN_PRIVACY},
  {name:"Info Sharing", screen:Strings.APP_SCREEN_INFO_SHARING},
  {name:"Notification", screen:Strings.APP_SCREEN_NOTIFICATION},
  {name:"Verification", screen:Strings.APP_SCREEN_VERIFICATION},
  {name:"DBS", screen:Strings.APP_SCREEN_DBS},
  {name:"Qualification", screen:Strings.APP_SCREEN_QUALIFICATION},
  {name:"Certificate", screen:Strings.APP_SCREEN_CERTIFICATE},
  {name:"References", screen:Strings.APP_SCREEN_REFERENCES},
  {name:"Skills", screen:Strings.APP_SCREEN_SKILLS},
  {name:"Bio", screen:Strings.APP_SCREEN_BIO}
];

export default class ProfileScreen extends Component {
 constructor(args) {
   super(args);
   this.state = {
    }
 }
 
 onBackPress = () => {
  this.context.goBack(this);
 }

 onOptionClick(item){
  console.log("onOptionClick item : " + JSON.stringify(item));
  this.context.moveToScreen(this, item.screen);
}

 render() {
    const platformHeaderProps = {}
    platformHeaderProps['leftItem'] = {
      title: 'Menu',
      icon: require('../../../images/back.png'),
      layout: 'icon',
      onPress: this.onBackPress
    }
   return (
    <AppConsumer>
    {(context) => (
      <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
          <Header title="Profile" {...platformHeaderProps} />
          <ScrollView>
            {
              PROFILE_OPTIONS.map((item) => {
                return (
                  <TouchableWithoutFeedback onPress={() => this.onOptionClick(item)}>
                    <View>
                      <View style={context.utilities.styles.LeftDrawerOptionsDividerStyle}/>
                      <View style={context.utilities.styles.ProfileOptionsViewStyle}>
                        {/* <Icon name={item.icon} size={24} color={context.utilities.colors.black}/> */}
                        <Text  style={context.utilities.styles.LeftDrawerOptionsTextStyle}>{item.name}</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                )
              })
            }
            <View style={context.utilities.styles.LeftDrawerOptionsDividerStyle}/>
          </ScrollView>
      </View>
     )}
     </AppConsumer> 
   );
 }
}