import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage,Modal,ToastAndroid, Text, Dimensions,View, Image,FlatList,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import Colors from '../../utils/res/Colors';
import Strings from '../../utils/res/Strings';
import Styles from '../../utils/res/Styles';
import CustomDialog from '../customViews/dialog/CustomDialog.js';
import * as Progress from 'react-native-progress';
import { StackActions, NavigationActions } from 'react-navigation';
type Props = {};

export default class LeftDrawer extends Component<Props>
{
      constructor(args) {
        super(args);
        let { width } = Dimensions.get("window");
        let { height } = Dimensions.get("window");
        apiService = new ApiService();
        // onLoggedIn = this.onLoggedIn.bind(this);
        this.state = {
           screenWidth: width,
           screenHeight: height,
           showDrawer:true,
           isUserLoggedIn:false,
           defaultName:'Do you want to Login?',
           userName:'Do you want to Login?',
           showDialog:false,
           isLoading:false,
          //  cancelButtonText:(this.props.cancelText != null && this.props.cancelText != "") ? this.props.cancelText : "SKIP",
          //  showCancelButton:(this.props.showCancel != undefined && this.props.showCancel != null) ? this.props.showCancel : true,
        }
      }
      componentWillMount = () => {
        this.isUserLoggedIn();
      }

      closeDrawer(){
        this.setState({showDrawer:false});
        this.props.onDrawerClose(this.props.screen);
      }

      isUserLoggedIn(){
        AsyncStorage.multiGet([Strings.PREF_USER_NAME]).then(response => {
          var name = response[0][1];
          if(name != undefined && name.length > 0){
            this.setState({userName:name});
            this.setState({isUserLoggedIn:true});
            return true;
          } else {
            return false;
          }
       });
      }

      logOut(){
        this.setState({showDialog:true});
      }

      onDialogOkClick = () => {
        var screen = this;
       this.setState({showDialog:false});
       this.setState({isLoading:true});
        apiService.logout((error, response) => {
           if(error.length === 0){
             AsyncStorage.clear();
             screen.setState({userName: "Do you want to Login?"});
             screen.setState({isUserLoggedIn: false});
             screen.setState({isLoading:false});
            //  screen.props.onLoggedOut(this.props.screen);
            screen.renderNewData(screen);
           } else {
             ToastAndroid.show("Something went wrong. Please try again", ToastAndroid.SHORT);
           }
        });
       
     }
   
     onDialogSkipClick = () => {
       this.setState({showDialog:false});
     }

     moveToLogin(){
      if(this.state.isUserLoggedIn){
        return;
      }
      this.closeDrawer();
      var screen = this;
      var {navigate} = this.props.screen.props.navigation;
      navigate('LoginScreen');
    }

    moveToMyOrders(){
      if(this.state.isUserLoggedIn === false){
        ToastAndroid.show("Login to continue", ToastAndroid.SHORT);
        return;
      }
      this.closeDrawer();
      var screen = this;
      var {navigate} = this.props.screen.props.navigation;
      navigate('OrderScreen');
    }

   
    // onLoggedIn(username, thisClass){
    //   console.log("LeftDrawer onLoggedIn : " + username);
    //   AsyncStorage.multiGet([Strings.PREF_USER_NAME]).then(response => {
    //     var name = response[0][1];
    //     console.log("LeftDrawer","HomeScreen onLoggedIn PREF_USER_NAME : " + name);
    //     if(username.length > 0){
    //       thisClass.setState({userName:name});
    //       thisClass.setState({isUserLoggedIn:true});
    //       // thisClass.props.onLoggedIn(name, thisClass.props.screen);
    //       thisClass.renderNewData(thisClass);
    //       console.log("LeftDrawer","onLoggedIn inside HomeScreen new Name : " + this.state.userName);
    //     }
    //     console.log("LeftDrawer","onLoggedIn HomeScreen new Name : " + this.state.userName);
    //   });
    // }

    renderNewData(thisClass){
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'MainStack' })],
      });
      thisClass.props.screen.props.navigation.dispatch(resetAction);
    }
     
      render() {
        return (
            <View>
              <View style = {{flex:1,width:this.state.screenWidth, height: this.state.screenHeight}}>
                <Modal
                  style={{width:this.state.screenWidth, height: this.state.screenHeight,position:'absolute'}}
                  visible={this.props.showDrawer}
                  transparent={true}
                  animationType={"fade"}
                  onRequestClose={ () => {}} >
                    <View>
                      <View style={{height:this.state.screenHeight,width:280, position:'absolute', top:0,left:0, alignItems: 'center', backgroundColor:Colors.white,}}>
                          <TouchableWithoutFeedback onPress = {() => this.moveToLogin()}>
                            <View style={styles.headerContainer}>
                                  <Image source={require('../res/images/user.png')} style={{height:100, width: 100,borderRadius:50, alignSelf: 'center',marginTop:20}} />
                                  <Text style={styles.headerText}>{this.state.userName}</Text>
                            </View>
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback onPress = {() => this.closeDrawer()}>
                              <Image style = {{height:20,width:20,position:'absolute',left:20,top:15}} source = {require('../res/images/close.png')}/>
                          </TouchableWithoutFeedback>
                          <View style={{width:280,height:700,backgroundColor:'#ffffff',paddingTop: 20,flex:1,}}>
                            <View style={{height:1,backgroundColor:Colors.lightGray}}></View>
                            <Text  style={{fontSize:16,height:40,color:Colors.black,marginTop:15,marginLeft:20}} onPress={() => this.moveToMyOrders()}>My Orders</Text>
                            <View style={{height:1,backgroundColor:Colors.lightGray}}></View>
                            {this.state.userName != this.state.defaultName && 
                              <Text  style={{fontSize:16,height:40,color:Colors.black,marginTop:15,marginLeft:20}} onPress={() => this.logOut()}>Logout</Text>
                            }
                          </View>
                      </View>
                      {this.state.isLoading &&
                        <View style = {{flex:1,width:this.state.screenWidth, height:this.state.screenHeight, justifyContent:'center', alignItems:'center', position:'absolute'}}>
                          <Progress.Circle size={50} indeterminate={true} color={'#81D742'} borderWidth={3} />
                        </View>
                      }
                    </View>
                </Modal>
                
              </View>
              {<CustomDialog okText = {Strings.dialogButtonOK} cancelText = {Strings.dialogButtonCancel} message = {Strings.alertLogout} onOkPress = {() => {this.onDialogOkClick()}} onCancelPress = {() => {this.onDialogSkipClick()}} visibility = {this.state.showDialog}/>}
            </View>
        );
      }
}

const styles = StyleSheet.create({
  container: { flex: 1},

  TopOuterView: { flex: 1,flexDirection:'row'},

  InnerViewStyle: {flex:1,justifyContent: 'center',alignItems: 'center',margin:10},

  TextStyle: { color: Colors.appColor,textAlign:'center',fontSize: 22},

  DisableTextStyle: { color: Colors.keyBoardDisableTextColor,textAlign:'center',fontSize: 22},

  DividerStyle: { width:60,backgroundColor: Colors.keyBoardDividerColor, height:1, marginTop:8 },

  BackImageStyle: {width:30, height:30,tintColor: Colors.appColor},

  BackDisableImageStyle: {width:30, height:30,tintColor: Colors.keyBoardDisableTextColor},
});
