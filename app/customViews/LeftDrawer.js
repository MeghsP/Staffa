import React, {Component} from 'react';
import {Modal, Text, View, Image,TouchableWithoutFeedback} from 'react-native';
import {AppConsumer} from '../context/AppProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import Strings from '../utils/res/Strings';

const OPTION_PROFILE_ID = 1;
const OPTION_SETTINGS_ID = OPTION_PROFILE_ID + 1;
const OPTION_MESSAGES_ID = OPTION_SETTINGS_ID + 1;
const OPTION_NOTIFICATIONS_ID = OPTION_MESSAGES_ID + 1;
const OPTION_LOGOUT_ID = OPTION_NOTIFICATIONS_ID + 1;

const DRAWER_OPTIONS = [
  {id:OPTION_PROFILE_ID, name:"Profile", screen:Strings.APP_SCREEN_PROFILE, icon:"md-person"},
  {id:OPTION_SETTINGS_ID, name:"Settings", screen:"", icon:"md-settings"},
  {id:OPTION_MESSAGES_ID, name:"Messages", screen:Strings.APP_SCREEN_MESSAGES, icon:"md-chatboxes"},
  {id:OPTION_NOTIFICATIONS_ID, name:"Notifications", screen:Strings.APP_SCREEN_NOTIFICATIONS, icon:"md-notifications"},
  {id:OPTION_LOGOUT_ID, name:"Logout", screen:"", icon:"ios-power"},
];
export default class LeftDrawer extends Component{
      constructor(args) {
        super(args);
      }

      closeDrawer(){
        this.context.toggleDrawer();
      }

      showDialog(){
        this.context.showDialog("","",this.context.utilities.strings.alertLogout,
          (cancel,ok) =>{
            if(ok){
              this.context.showLoading(true);
              this.context.apiService.signOut((error, response) => {
                  this.context.showLoading(false);
                  if(response){
                    this.context.clearAllData();
                    this.context.replaceScreen(this.context.currentContext, this.context.utilities.strings.APP_SCREEN_SPLASH);
                  } else {
                    this.context.showToast(error);
                  }
              });
            }
          }
        );
      }

      onOptionClick(item){
        console.log("onOptionClick item : " + JSON.stringify(item));
        console.log("onOptionClick id : " + item.id);
        if(item.id === OPTION_LOGOUT_ID){
          this.showDialog();
        } else {
          console.log("onOptionClick screen : " + item.screen);
          if(item.screen === ""){

          } else {
            this.context.toggleDrawer(true);
            this.context.moveToScreen(this.context.currentContext, item.screen);
          }  
        }
      }

      render() {
        return (
          <AppConsumer>
          {(context) => (
            <View ref={(ref) => { this.context = context; }}>
              <View style = {{flex:1,width:context.screenWidth, height: context.screenHeight}}>
                {context.userData &&
                <Modal
                  style={context.utilities.styles.LeftDrawerModelViewStyle}
                  transparent={true}
                  animationType={"fade"}
                  onRequestClose={ () => {}} >
                    <View>
                      <View style={context.utilities.styles.LeftDrawerRootViewStyle}>
                          <TouchableWithoutFeedback>
                            <View>
                              <Image source={{uri: context.userData.bio.profilePicURL}} style={context.utilities.styles.LeftDrawerImageStyle} />
                              <Text style={context.utilities.styles.LeftDrawerUserNameTextStyle}>{context.currentUser.email}</Text>
                            </View>
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback onPress = {() => this.closeDrawer()}>
                              <Image style = {context.utilities.styles.LeftDrawerCloseImageStyle} source = {require('../images/close.png')}/>
                          </TouchableWithoutFeedback>
                          <View style={{marginTop:20, marginBottom:20}}>
                            {
                              DRAWER_OPTIONS.map((item) => {
                                return (
                                  <TouchableWithoutFeedback onPress={() => this.onOptionClick(item)}>
                                    <View>
                                      <View style={context.utilities.styles.LeftDrawerOptionsDividerStyle}/>
                                      <View style={context.utilities.styles.LeftDrawerOptionsViewStyle}>
                                        <Icon name={item.icon} size={24} color={context.utilities.colors.black}/>
                                        <Text  style={context.utilities.styles.LeftDrawerOptionsTextStyle}>{item.name}</Text>
                                        {item.id === OPTION_NOTIFICATIONS_ID && context.userNotificationCount > 0 &&
                                          <Text  style={context.utilities.styles.LeftDrawerBadgeStyle}>{""+context.userNotificationCount}</Text>
                                        } 
                                        </View>
                                    </View>
                                  </TouchableWithoutFeedback>
                                )
                              })
                            }
                            <View style={context.utilities.styles.LeftDrawerOptionsDividerStyle}/>
                          </View>
                      </View>
                    </View>
                </Modal>
                }
              </View>
            </View>
           )}
           </AppConsumer>  
        );
      }
}
