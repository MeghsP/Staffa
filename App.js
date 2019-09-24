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
import NotificationSettingsScreen from './app/screens/auth/signin/NotificationSettingsScreen';
import BeginVerificationScreen from './app/screens/auth/signin/BeginVerificationScreen';
import VerificationScreen from './app/screens/auth/signin/VerificationScreen';
import DBSScreen from './app/screens/auth/signin/DBSScreen';
import CertificateScreen from './app/screens/auth/signin/CertificateScreen';
import SkillsScreen from './app/screens/auth/signin/SkillsScreen';
import BioScreen from './app/screens/auth/signin/BioScreen';
import SuccessScreen from './app/screens/auth/signin/SuccessScreen';
import VerifyMobileNumberScreen from './app/screens/auth/signin/VerifyMobileNumberScreen';
import QualificationListScreenLogin from './app/screens/auth/signin/QualificationListScreenLogin';
import ReferencesListScreenLogin from './app/screens/auth/signin/ReferencesListScreenLogin';

import UpdateAddressScreen from './app/screens/dashboard/drawer/profileComponents/UpdateAddressScreen';
import UpdateBasicInfoScreen from './app/screens/dashboard/drawer/profileComponents/UpdateBasicInfoScreen';
import UpdateBioScreen from './app/screens/dashboard/drawer/profileComponents/UpdateBioScreen';
import UpdateCertificateScreen from './app/screens/dashboard/drawer/profileComponents/UpdateCertificateScreen';
import UpdateDBSScreen from './app/screens/dashboard/drawer/profileComponents/UpdateDBSScreen';
import UpdateEmploymentContractScreen from './app/screens/dashboard/drawer/profileComponents/UpdateEmploymentContractScreen';
import UpdateInfoSharingScreen from './app/screens/dashboard/drawer/profileComponents/UpdateInfoSharingScreen';
import UpdateNotificationSettingsScreen from './app/screens/dashboard/drawer/profileComponents/UpdateNotificationSettingsScreen';
import UpdatePrivacyScreen from './app/screens/dashboard/drawer/profileComponents/UpdatePrivacyScreen';
import UpdateQualificationScreen from './app/screens/dashboard/drawer/profileComponents/UpdateQualificationScreen';
import UpdateReferenceScreen from './app/screens/dashboard/drawer/profileComponents/UpdateReferenceScreen';
import UpdateSkillsScreen from './app/screens/dashboard/drawer/profileComponents/UpdateSkillsScreen';
import UpdateTermsConditionScreen from './app/screens/dashboard/drawer/profileComponents/UpdateTermsConditionScreen';
import UpdateVerificationScreen from './app/screens/dashboard/drawer/profileComponents/UpdateVerificationScreen';
import QualificationListScreen from './app/screens/dashboard/drawer/profileComponents/QualificationListScreen';
import AddQualificationScreen from './app/screens/dashboard/drawer/profileComponents/AddQualificationScreen';
import ReferencesListScreen from './app/screens/dashboard/drawer/profileComponents/ReferencesListScreen';
import AddReferenceScreen from './app/screens/dashboard/drawer/profileComponents/AddReferenceScreen';

import HomeScreen from './app/screens/dashboard/HomeScreen';
import ProfileScreen from './app/screens/dashboard/drawer/ProfileScreen';
import MessagesScreen from './app/screens/dashboard/drawer/MessagesScreen';
import NotificationsScreen from './app/screens/dashboard/drawer/NotificationsScreen';
import ChatScreen from './app/screens/dashboard/drawer/messageComponents/ChatScreen';

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
      NotificationSettingsScreen:{screen:NotificationSettingsScreen},
      BeginVerificationScreen:{screen:BeginVerificationScreen},
      VerificationScreen:{screen:VerificationScreen},
      DBSScreen:{screen:DBSScreen},
      CertificateScreen:{screen:CertificateScreen},
      SkillsScreen:{screen:SkillsScreen},
      BioScreen:{screen:BioScreen},
      SuccessScreen:{screen:SuccessScreen},
      VerifyMobileNumberScreen:{screen:VerifyMobileNumberScreen},
      QualificationListScreenLogin:{screen:QualificationListScreenLogin},
      ReferencesListScreenLogin:{screen:ReferencesListScreenLogin},

      UpdateAddressScreen:{screen:UpdateAddressScreen},
      UpdateBasicInfoScreen:{screen:UpdateBasicInfoScreen},
      UpdateBioScreen:{screen:UpdateBioScreen},
      UpdateCertificateScreen:{screen:UpdateCertificateScreen},
      UpdateDBSScreen:{screen:UpdateDBSScreen},
      UpdateEmploymentContractScreen:{screen:UpdateEmploymentContractScreen},
      UpdateInfoSharingScreen:{screen:UpdateInfoSharingScreen},
      UpdateNotificationSettingsScreen:{screen:UpdateNotificationSettingsScreen},
      UpdatePrivacyScreen:{screen:UpdatePrivacyScreen},
      UpdateQualificationScreen:{screen:UpdateQualificationScreen},
      UpdateReferenceScreen:{screen:UpdateReferenceScreen},
      UpdateSkillsScreen:{screen:UpdateSkillsScreen},
      UpdateTermsConditionScreen:{screen:UpdateTermsConditionScreen},
      UpdateVerificationScreen:{screen:UpdateVerificationScreen},
      QualificationListScreen:{screen:QualificationListScreen},
      AddQualificationScreen:{screen:AddQualificationScreen},
      ReferencesListScreen:{screen:ReferencesListScreen},
      AddReferenceScreen:{screen:AddReferenceScreen},

      HomeScreen:{screen:HomeScreen},
      ProfileScreen:{screen:ProfileScreen},
      MessagesScreen:{screen:MessagesScreen},
      NotificationsScreen:{screen:NotificationsScreen},
      ChatScreen:{screen:ChatScreen},
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