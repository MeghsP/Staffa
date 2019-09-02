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

    setCurrentScreen = (screen) => {
      this.setState({currentScreen: screen});
    }
  
    setUserData = (userData) => {
      this.setState({userData: userData});
    }

    setCurrentUser = (user) => {
      this.setState({user: user});
    }
  
    componentWillUnmount() {
      this.fireBaseListener && this.fireBaseListener();
    }

    replaceScreen = (context, screen) => {
      context.props.navigation.replace(screen);
    }

    moveToScreen = (context, screen) => {
      context.props.navigation.navigate(screen);
    }

    showToast = (message) =>{
      this.refs.toast.show(message);
    }

    showLoading = (value) =>{
      this.setState({showLoading: value});
    }

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
        <Toast ref={"toast"}/>
        {this.state.showLoading && <ProgressView/> }
        <DatePickerDialog ref="dobDialog" onDatePicked={this.onDatePicked.bind(this)} />
        </AppContext.Provider>
      )
    }
  }