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
import Colors from '../utils/res/Colors';
import Styles from '../utils/res/Styles';
import Strings from '../utils/res/Strings';

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;
export default class AppProvider extends React.Component {

    constructor(props) {
      super(props);
      let { width } = Dimensions.get("window");
      apiService = new ApiService();
      this.state = {
        screenWidth: width,
        showLoading:false,
        userData: {},
        user:null,
        isUserLoggedIn:false,
        currentScreen:Strings.APP_SCREEN_LOGIN,
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

    /*
      Get logged-in user's data from FireStore and
      set current screen as per data entered by user
    */
    getUserData = (user) => {
      console.log("getUserData 1 : "  + user.uid);
      apiService.getUserData(user.uid,(error, response) => {
        if(response){
          this.setUserData(response);
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
  
    render() {
      return (
        // Values/Data mostly used by all child components
        <AppContext.Provider value={{
          screenWidth:this.state.screenWidth,
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
          showToast:this.showToast,
          showLoading:this.showLoading,
          showDatePicker:this.showDatePicker,
        }}>
        {this.props.children}
        
        {/*
          Other views mostly used by all child components
        */}
        <Toast ref={"toast"}/>
        {this.state.showLoading && <ProgressView/> }
        <DatePickerDialog ref="dobDialog" onDatePicked={this.onDatePicked.bind(this)} />
        </AppContext.Provider>
      )
    }
  }