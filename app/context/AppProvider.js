/*
  Defines each important imports, methods, views which are available to all child components
*/
import React from 'react';
import {Dimensions} from 'react-native';
import firebase from 'react-native-firebase';
import ApiService from '../network/ApiService';
import Toast, {DURATION} from 'react-native-easy-toast';
import ProgressView from '../customViews/ProgressView';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import CustomDialogImagePicker from '../customViews/dialog/CustomDialogImagePicker';
import ImagePicker from 'react-native-image-crop-picker';
import LeftDrawer from '../customViews/LeftDrawer.js';
import CustomDialog from '../customViews/dialog/CustomDialog.js';

import Colors from '../utils/res/Colors';
import Styles from '../utils/res/Styles';
import Strings from '../utils/res/Strings';

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;
export default class AppProvider extends React.Component {

    constructor(props) {
      super(props);
      let { width } = Dimensions.get("window");
      let { height } = Dimensions.get("window");
      apiService = new ApiService();
      this.state = {
        screenWidth: width,
        screenHeight: height,
        showPickerDialog:false,
        showDialog:false,
        showLoading:false,
        userData: null,
        user:null,
        currentScreen:Strings.APP_SCREEN_LOGIN,
        currentContext:null,

        okText:'',
        cancelText:'',
        dialogMsg:'',
      };
      this.checkUserAuthentication((user) => {});
      
    }
    /*
      Check if user is authenticated or not.
      If yes, then retrieve user data from FireStore
      If no, then jump to Login screen
    */
    checkUserAuthentication = (callBack) => {
      this.callBack  = callBack;
      this.fireBaseListener = firebase.auth().onAuthStateChanged(user => {
        console.log("checkIsUserAuthenticated USER : " + JSON.stringify(user));
        if(user){
          this.setCurrentUser(user);
          if(user.emailVerified){
            this.getUserData(user);
          } else {
            this.setCurrentScreen(Strings.APP_SCREEN_LOGIN);
            if(this.callBack){
              this.callBack(user);
            }
          }
        }
        
      })
    }

    clearAllData = () => {
      this.setState({userData:null});
      this.setState({user:null});
      this.setState({currentContext:null});
      this.setState({currentScreen: Strings.APP_SCREEN_LOGIN});
    }

    /*
      Get logged-in user's data from FireStore and
      set current screen as per data entered by user
    */
    getUserData = (user) => {
      console.log("getUserData 1 : "  + user.uid);
      apiService.getUserData(user.uid,(error, response) => {
        if(response){
          this.setUserData(response);
          console.log("getUserData 2 : "  + JSON.stringify(response));
          this.setCurrentScreen(apiService.getScreenName(response));
          if(this.callBack){
            this.callBack(user);
          }
        }
      });
    }

    /*
      Set current screen to jump to
    */
    setCurrentScreen = (screen) => {
      this.setState({currentScreen: screen});
    }
  
    /*
      Set user's data to be accessible to all components
    */
    setUserData = (userData) => {
      this.setState({userData: userData});
    }
    /*
      Set current user to be accessible to all components
    */
    setCurrentUser = (user) => {
      this.setState({user: user});
    }
  
    componentWillUnmount() {
      this.fireBaseListener && this.fireBaseListener();
    }

    /*
      Method will be called to replace current screen with another
      @context - Context of the component calling method
      @screen - Screen name to replace with
    */
    replaceScreen = (context, screen) => {
      context.props.navigation.replace(screen);
    }

    /*
      Method will be called to jump to other screen
      @context - Context of the component calling method
      @screen - Screen name to jump to
    */
    moveToScreen = (context, screen) => {
      context.props.navigation.navigate(screen);
    }


    goBack = (context) => {
      context.props.navigation.goBack();
    }
    /*
      Display a toast message with given message string
      @message - Message to display in a toast
    */
    showToast = (message) =>{
      this.refs.toast.show(message);
    }
    /*
      This method will show progress dialog on screen
      @value - True/False to show/hide progress
    */
    showLoading = (value) =>{
      this.setState({showLoading: value});
    }

    /*
      This method will show date picker dialog on screen to select a date
      @currentSelectedDate - Previously selected date or blank
      @callBack - callBack method which will be called once user selects a date from dialog
    */
    showDatePicker = (currentSelectedDate, callBack) =>{
      this.datePickerCallBack = callBack;
      let dobDate = currentSelectedDate;
      if(!dobDate || dobDate == null){
        dobDate = new Date();
      }
      this.refs.dobDialog.open({
        date: dobDate,
        maxDate: new Date()
      });
    }

    onDatePicked = (date) => {
      console.log("onDatePicked :" + date);
      if(this.datePickerCallBack){
        this.datePickerCallBack(date);
      }
    }

    showImagePickerAlert = (callBack) => {
      this.imagePickerCallBack = callBack;
      this.setState({showPickerDialog: true});
    }

    onOptionSelected(option){
      this.hidePickerAlert();
      if (option == 0) {
        this.onCameraClick();
      } else {
        this.onGalleryClick();
      }
    }
    onCameraClick(){
      ImagePicker.openCamera({
        width: 500,
        height: 500,
        cropping: true
      }).then(image => {
        console.log(image);
        console.log("Image.path : "+image.path);
        if(this.imagePickerCallBack){
          this.imagePickerCallBack(image.path);
        }
      });
    }
    
    onGalleryClick(){
      ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true
      }).then(image => {
        console.log("Image : "+image);
        console.log("Image.path : "+image.path);
        if(this.imagePickerCallBack){
          this.imagePickerCallBack(image.path);
        }
      });
    }
    hidePickerAlert(){
      this.setState({showPickerDialog: false});
    }

    toggleDrawer = () => {
      if(this.state.isDrawerOpen){
        this.setState({isDrawerOpen:false});
      } else {
        this.setState({isDrawerOpen:true});
      }
    }

    setCurrentContext = (context) => {
      this.setState({currentContext:context});
    }

    showDialog = (okText, cancelText, message, callBack) => {
      this.dialogCallBack = callBack;
      this.setState({okText:okText});
      this.setState({cancelText:cancelText});
      this.setState({dialogMsg:message});
      this.setState({showDialog:true});
    }

    onDialogOkClick = () => {
      this.toggleDrawer();
      this.setState({showDialog:false});
      if(this.dialogCallBack){
        this.dialogCallBack(false, true);
      }
    }
  
    onDialogSkipClick = () => {
      this.setState({showDialog:false});
      if(this.dialogCallBack){
        this.dialogCallBack(true, false);
      }
    }
    
    render() {
      return (
        // Values/Data mostly used by all child components
        <AppContext.Provider value={{
          currentContext:this.state.currentContext,
          screenWidth:this.state.screenWidth,
          screenHeight:this.state.screenHeight,
          apiService:apiService,
          utilities:{colors:Colors, styles:Styles, strings:Strings},
          checkUserAuthentication:this.checkUserAuthentication,
          setCurrentScreen:this.setCurrentScreen,
          setUserData:this.setUserData,
          currentUser:this.state.user,
          userData: this.state.userData,
          currentScreen:this.state.currentScreen,
          replaceScreen: this.replaceScreen,
          moveToScreen: this.moveToScreen,
          goBack:this.goBack,
          setCurrentContext:this.setCurrentContext,
          showToast:this.showToast,
          showLoading:this.showLoading,
          showDatePicker:this.showDatePicker,
          showImagePickerAlert:this.showImagePickerAlert,
          toggleDrawer:this.toggleDrawer,
          showDialog:this.showDialog,
          clearAllData:this.clearAllData,
        }}>
        {this.props.children}
        
        {/*
          Other views mostly used by all child components
        */}
        {this.state.isDrawerOpen && <LeftDrawer onDrawerClose = {this.closeDrawer} screen = {this} />} 
        <Toast ref={"toast"}/>
        {this.state.showLoading && <ProgressView/> }
        <DatePickerDialog ref="dobDialog" onDatePicked={this.onDatePicked.bind(this)} />
        {<CustomDialog okText = {this.state.okText} cancelText = {this.state.cancelText} message = {this.state.dialogMsg} onOkPress = {() => {this.onDialogOkClick()}} onCancelPress = {() => {this.onDialogSkipClick()}} visibility = {this.state.showDialog}/>}
        {<CustomDialogImagePicker onChooseOption = {(option) => {this.onOptionSelected(option)}} onCancelPress = {() => {this.hidePickerAlert()}} visibility = {this.state.showPickerDialog}/>}
        </AppContext.Provider>
      )
    }
  }