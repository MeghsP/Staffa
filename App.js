import React from 'react';
import AppProvider from './app/context/AppProvider';
import {createStackNavigator, createAppContainer} from 'react-navigation';
/*
    Screens
*/
import SplashScreen from './app/screens/SplashScreen';
import SignUpScreen from './app/screens/login/SignUpScreen';
import LoginScreen from  './app/screens/login/LoginScreen';
import ForgotPasswordScreen from './app/screens/login/ForgotPasswordScreen';
import AddAddressScreen from './app/screens/login/AddAddressScreen';
import TermsConditionScreen from './app/screens/login/TermsConditionScreen';
import EmploymentContractScreen from './app/screens/login/EmploymentContractScreen';
import PrivacyScreen from './app/screens/login/PrivacyScreen';
import InfoSharingScreen from './app/screens/login/InfoSharingScreen';
import NotificationsScreen from './app/screens/login/NotificationsScreen';
import BeginVerificationScreen from './app/screens/login/BeginVerificationScreen';
import VerificationScreen from './app/screens/login/VerificationScreen';
import DBSScreen from './app/screens/login/DBSScreen';
import QualificationScreen from './app/screens/login/QualificationScreen';
import CertificateScreen from './app/screens/login/CertificateScreen';
import ReferencesScreen from './app/screens/login/ReferencesScreen';
import SkillsScreen from './app/screens/login/SkillsScreen';
import BioScreen from './app/screens/login/BioScreen';
import SuccessScreen from './app/screens/login/SuccessScreen';
import VerifyMobileNumberScreen from './app/screens/login/VerifyMobileNumberScreen';

import HomeScreen from './app/screens/dashboard/HomeScreen';
import ProfileScreen from './app/screens/dashboard/ProfileScreen';

let RootStack = createStackNavigator({
    SplashScreen: {screen : SplashScreen},
      // Login screens
      SignUpScreen: {screen : SignUpScreen},
      LoginScreen:{screen:LoginScreen},
      ForgotPasswordScreen:{screen:ForgotPasswordScreen},
      AddAddressScreen:{screen:AddAddressScreen},
      TermsConditionScreen:{screen:TermsConditionScreen},
      EmploymentContractScreen:{screen:EmploymentContractScreen},
      PrivacyScreen:{screen:PrivacyScreen},
      InfoSharingScreen:{screen:InfoSharingScreen},
      NotificationsScreen:{screen:NotificationsScreen},
      BeginVerificationScreen:{screen:BeginVerificationScreen},
      VerificationScreen:{screen:VerificationScreen},
      DBSScreen:{screen:DBSScreen},
      QualificationScreen:{screen:QualificationScreen},
      CertificateScreen:{screen:CertificateScreen},
      ReferencesScreen:{screen:ReferencesScreen},
      SkillsScreen:{screen:SkillsScreen},
      BioScreen:{screen:BioScreen},
      SuccessScreen:{screen:SuccessScreen},
      VerifyMobileNumberScreen:{screen:VerifyMobileNumberScreen},

      HomeScreen:{screen:HomeScreen},
      ProfileScreen:{screen:ProfileScreen},
  },
  {
      initialRouteName: 'SplashScreen',
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false
      }
  }
  );

let Navigation = createAppContainer(RootStack);
export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("Inside App");
  }
  render() {
    return (
      <AppProvider>
        <Navigation />
      </AppProvider>
    );
  }
}