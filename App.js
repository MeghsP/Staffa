import React from 'react';
import AppProvider from './app/context/AppProvider';
import {createStackNavigator, createAppContainer} from 'react-navigation';
/*
    Screens
*/
import SplashScreen from './app/screens/SplashScreen';
import SignUpScreen from './app/screens/auth/signup/SignUpScreen';
import LoginScreen from  './app/screens/auth/signin/LoginScreen';
import ForgotPasswordScreen from './app/screens/auth/signin/ForgotPasswordScreen';
import AddAddressScreen from './app/screens/auth/signin/AddAddressScreen';
import TermsConditionScreen from './app/screens/auth/signin/TermsConditionScreen';
import EmploymentContractScreen from './app/screens/auth/signin/EmploymentContractScreen';
import PrivacyScreen from './app/screens/auth/signin/PrivacyScreen';
import InfoSharingScreen from './app/screens/auth/signin/InfoSharingScreen';
import NotificationsScreen from './app/screens/auth/signin/NotificationsScreen';
import BeginVerificationScreen from './app/screens/auth/signin/BeginVerificationScreen';
import VerificationScreen from './app/screens/auth/signin/VerificationScreen';
import DBSScreen from './app/screens/auth/signin/DBSScreen';
import QualificationScreen from './app/screens/auth/signin/QualificationScreen';
import CertificateScreen from './app/screens/auth/signin/CertificateScreen';
import ReferencesScreen from './app/screens/auth/signin/ReferencesScreen';
import SkillsScreen from './app/screens/auth/signin/SkillsScreen';
import BioScreen from './app/screens/auth/signin/BioScreen';
import SuccessScreen from './app/screens/auth/signin/SuccessScreen';
import VerifyMobileNumberScreen from './app/screens/auth/signin/VerifyMobileNumberScreen';

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