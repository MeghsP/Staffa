'use strict';
import {StyleSheet,Dimensions} from 'react-native';
import Colors from './Colors';

var windowHeight = Dimensions.get('window').height;
var windowWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: Colors.appBGColor
  },

  splashLogoTextStyle: {
    fontSize:30,
    fontFamily:'QMA', 
    color:Colors.black
  },

  headerLogoTextStyle: {
    fontSize:17,
    fontFamily:'QMA', 
    color:Colors.black
  },

  headerInfoTextStyle: {
    fontSize:15,
    marginTop:2,
    fontStyle:'normal',
    color:Colors.black
  },

  baseStyle1:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },

  InputTextBoxStyle: {
    borderColor:Colors.lightGrayDark,
    borderRadius:5,
    borderWidth:1,
    height:45,
    marginLeft:40,
    marginRight:40,
    marginTop:15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },

  InputTextDisableStyle: {
    flex:1,
    fontSize:15,
    color: Colors.hintColor,
    marginRight:10
  },

  InputTextEnableStyle: {
    flex:1,
    fontSize:15,
    textAlign:'center',
    color: Colors.black,
    marginRight:10
  },

  ForgotPasswordLinkTextStyle: {
    fontSize:13, 
    alignSelf: 'flex-end', 
    color:Colors.mediumGray,
    marginRight:40,
    marginTop:7
  },

  NewToAppTextStyle: {
    fontSize:12,
    justifyContent:'center',
    alignItems:'center', 
    textAlign:'center', 
    color:Colors.mediumGray, 
    marginTop:50
  },

  RegisterLinkTextStyle: {
    textDecorationLine:"underline",
    fontSize:14,
    fontWeight:'bold', 
    color:Colors.appColor
  },

  LoginButtonEnableTextStyle: { 
    fontWeight:'bold',
    color:Colors.white,
    borderRadius: 50,
    backgroundColor: Colors.appColor,
    marginLeft:50,
    marginRight:50,
    padding:15,
    marginTop:20,
    textAlign: 'center'
  },

  QualificationScanButtonStyle: { 
    fontWeight:'bold',
    color:Colors.white,
    borderRadius: 10,
    backgroundColor: Colors.appColor,
    marginLeft:5,
    marginRight:5,
    padding:12,
    textAlign: 'center',
    width:90,
    marginTop:5,
  },

  LoginButtonBackgroundStyle: { 
    width:windowWidth,
    height:50,
    backgroundColor: Colors.appColor,
    justifyContent: 'center',
    alignItems: 'center'
  },

  TNCBackgroundViewStyle: { 
    borderColor:Colors.black, 
    borderWidth:1,
    height:windowHeight - 150,
    backgroundColor:Colors.white, 
    margin:30,
    padding:10
  },

  TNCFixBackgroundViewStyle: { 
    borderColor:Colors.black, 
    borderWidth:1,
    height:200,
    backgroundColor:Colors.white, 
    margin:30,
    padding:10
  },

  TNCTextStyle: {
    fontSize:11,
    justifyContent:'center',
    alignItems:'center', 
    textAlign:'center', 
    color:Colors.mediumGray
  },

  CheckBoxContainerStyle: {
    backgroundColor:'transparent',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'transparent', 
    borderRadius:0, 
    marginLeft:40, 
    marginRight:40
  },

  CheckBoxLeftContainerStyle: {
    backgroundColor:'transparent',
    borderColor:'transparent', 
    borderRadius:0, 
    width:windowWidth-80,
    marginLeft:40, 
    marginRight:40
  },

  CheckBoxTextStyle: {
    fontSize:12,
    color:Colors.mediumGray
  },


  container: { width:windowWidth,flex: 1,backgroundColor: Colors.appBGColor},

  /**
    Input Forms UI styles
  **/
  TopViewStyle: {flex:1.3},

  GeneralStyle: {width:windowWidth,flex:1,justifyContent: 'center',alignItems: 'center'},

  SuccessImageStyle: {marginTop:80,width:50,height:50},

  PinInfoTextStyle: {
    fontSize:15,
    color: Colors.red,
    padding:50,
    marginTop:30,
    textAlign:'center'
  },

  PinErrorTextStyle: {
    fontSize:15,
    color: Colors.red,
    paddingLeft:50,
    paddingRight:50,
    marginTop:10,
    textAlign:'center'
  },


  WelcomeMessageTextStyle0: {
    fontSize:17,
    color: Colors.mediumGray,
    paddingLeft:50,
    paddingRight:50,
    marginBottom:10,
    marginTop:5,
    textAlign:'center'
  },

  WelcomeMessageTextStyle: {
    fontSize:17,
    color: Colors.mediumGray,
    padding:50,
    marginTop:30,
    textAlign:'center'
  },

  LabelTextStyle: {
    fontSize:13,
    marginTop:14,
    marginLeft:47,
    marginRight:47,
    color: Colors.mediumGray
  },

  PayBillsAmountViewStyle: {
    marginTop:15,
    marginLeft:44,
    flexDirection:'row',
    flex:1,
    marginRight:44,
  },

 

  DataContainerBoxStyle40: {
    borderRadius:3,
    height:39,
    marginLeft:44,
    marginRight:44,
    flexDirection:'row',
    alignItems:'center'
  },

  LabelTextStyle12: {
    fontSize:13,
    marginTop:12,
    marginLeft:47,
    marginRight:47,
    color: Colors.mediumGray
  },

  AmountViewStyle: {
    borderRadius:3,
    height:100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  AmountTextStyle: {textAlign:'center', fontSize:55,color: Colors.appColor},

  SuccessMessageTextStyle: {
    fontSize:17,
    color: Colors.mediumGray,
    paddingLeft:50,
    paddingRight:50,
    marginTop:10,
    textAlign:'center'
  },

  ReSendOTPTextStyle: {
    fontSize:13,
    marginTop:15,
    fontWeight:'bold',
    color: Colors.green,
    textDecorationLine:'underline',
  },

  WaitingOTPTextStyle: {
    fontSize:13,
    marginTop:7,
    fontWeight:'normal',
    color: Colors.mediumGray,
  },

  FinalInfoRowStyle: {
    flex:1,
    flexDirection:'row',
    marginTop:16,
    marginLeft:30,
    marginRight:30,
  },

  PayBillsAMountRowStyle: {
    flex:1,
    flexDirection:'row',
    marginTop:10,
    marginLeft:50,
    marginRight:50,
  },
  FinalInfoLabelAmountTextStyle: {
    fontSize:13,
    width:150,
    textAlign:'center',
    color: Colors.mediumGray,
    marginTop:30,
  },
  FinalInfoAmountTextStyle: {
    textAlign:'center', fontSize:35,color: Colors.appColor
  },

  FinalInfoLabelTextStyle: {
    fontSize:13,
    width:150,
    color: Colors.mediumGray,
  },
  PayBillsAmountLabelTextStyle: {
    fontSize:13,
    color: Colors.mediumGray,
  },
  FinalInfoValueTextStyle: {
    fontSize:15,
    color: Colors.black,
  },
  InputTextStyleHint: {
    flex:1,
    fontSize:15,
    color: Colors.hintColor,
    marginRight:10
  },

  InputTextStyle: {
    flex:1,
    fontSize:15,
    color: Colors.black,
    marginRight:10
  },

  NextButtonTextStyle: { fontWeight:'bold',color:Colors.white,borderRadius: 3,justifyContent: 'center',textAlign: 'center'},

  PayButtonEnableTextStyle: { fontWeight:'bold',color:Colors.appColor,borderRadius: 3,justifyContent: 'center',textAlign: 'center'},

  PayButtonDisableTextStyle: { fontWeight:'bold',color:Colors.lightGray,borderRadius: 3,justifyContent: 'center',textAlign: 'center'},

  PayNowButtonStyle: {width:80,height:40, borderRadius:5, backgroundColor: Colors.appColor, alignItems:'center',marginRight:2},

  NextButtonViewStyle: {flex:1,height:50,justifyContent: 'center',alignItems: 'center'},

  NextButtonEnableStyle: {flex:1,backgroundColor: Colors.appColor, alignItems:'center',marginRight:2},

  NextButtonDisableStyle:  {flex:1,backgroundColor: Colors.keyBoardDisableTextColor, alignItems:'center'},

  ResCountryTextStyle:{height:40,fontSize:15,padding:1,marginTop:12,color: Colors.black},

  FormBackImageStyle:{width:30,height:30,tintColor:Colors.appColor},

  FormBackImageTouchStyle:{position:'absolute',marginLeft:10,marginTop:10},

  FromToLabelTextStyle: {width:35,fontWeight:'bold',fontSize:15,color:Colors.appColor},

  DividerStyle: {
     backgroundColor: Colors.dividerColor, height:1, marginRight:50, marginLeft:50
  },

  DividerFullStyle: {
     width:windowWidth,height:1,backgroundColor:Colors.dividerColor,marginTop:2,
  },

  ContactRowStyle: { paddingLeft:10,paddingRight:10,height:60, flex:1, flexDirection: 'row', backgroundColor: "#ECEFF1", marginBottom: 5},


  ContactImageParentStyle: {
    width: 50, height: 50 , margin: 5
  },
  ContactImageStyle: {
      width: 50, height: 50 , borderRadius:100, borderWidth:1, borderColor:Colors.defaultAvatarBorderColor,
  },
  ContactImageStyleAbsolute: {
    width: 50, height: 50 , borderRadius:100, position:'absolute',borderWidth:1, borderColor:Colors.defaultAvatarBorderColor,
  },
  ContactNameTextStyle: {
       flex:1
  },

  RequestDetailLabelStyle:{flex:0.4,fontSize:13,marginLeft:10},
  RequestDetailColonStyle:{fontSize:15, marginLeft:5,marginRight:10},
  RequestDetailValueStyle:{flex:1,fontWeight:'bold',fontSize:13},

  RequestStatusPending: {
    flex:1, color:Colors.red,marginLeft:5,
  },

  RequestStatusConfirmed: {
    flex:1, color:Colors.yellow,marginLeft:5,
  },

  RequestStatusCompleted: {
    flex:1, color:Colors.green,marginLeft:5,
  },


  AgentRequestStatusPending: {
    flex:1, color:Colors.black,marginLeft:5, fontWeight:'bold',
  },

  AgentRequestStatusAccepted: {
    flex:1, color:Colors.yellow,marginLeft:5, fontWeight:'bold',
  },

  AgentRequestStatusCompleted: {
    flex:1, color:Colors.green,marginLeft:5, fontWeight:'bold',
  },

  AgentRequestStatusCancelled: {
    flex:1, color:Colors.red,marginLeft:5, fontWeight:'bold',
  },

  ContactNairaSymbolStyle: {
       width: 30, height: 30 , margin: 5
  },

  LoadingViewStyle: {
       marginTop:120,flex:1,justifyContent: 'center',alignItems: 'center',width:windowWidth,left: 0, right: 0, top: 0, bottom: 0
  },

  LoadingInnerViewStyle: {
    flex:1,justifyContent: 'center',alignItems: 'center',width:windowWidth,left: 0, right: 0, top: 0, bottom: 0, position:'absolute'
  },
  ActivityLoadingViewStyle: {
       marginTop:60,flex:1,justifyContent: 'center',alignItems: 'center',width:windowWidth, height:windowHeight,left: 0, right: 0, top: 0, bottom: 0
  },
  ActivityLoadingViewStyle1: {
    flex:1,justifyContent: 'center',alignItems: 'center',width:windowWidth, height:windowHeight,left: 0, right: 0, top: 0, bottom: 0
},
  ContactsHeaderTextStyle: {
      width:windowWidth,paddingLeft:10,paddingTop:15,paddingBottom:15,backgroundColor:Colors.lightGray,fontSize:15,color:Colors.mediumGray
  },

    StartDateTextStyle: {
      flex:1,
      fontSize:15,
      marginTop:10,
      marginLeft:5,
      color: Colors.black,
      marginRight:10
    },

    StartDateHintStyle: {
      flex:1,
      fontSize:15,
      marginTop:10,
      marginLeft:5,
      color: Colors.hintColor,
      marginRight:10
    },


  /**
    Home UI styles
  **/
  RowViewStyle: {flexDirection:"row",flex:1},

  RowViewStyleFix: {flexDirection:"row",flex:1, height:170},

  TopOuterViewStyle: {
    justifyContent: 'center',
    marginLeft:5,marginRight:5,marginTop:5,marginBottom:5,
    flex:1,
    alignItems: 'center',
    borderWidth:2,
    borderRadius:3,
    borderColor:Colors.appColor
  },

  TopOuterViewStyleFixHeight: {
    justifyContent: 'center',
    marginLeft:5,marginRight:5,marginTop:5,marginBottom:5,
    flex:1,
    height:150,
    alignItems: 'center',
    borderWidth:2,
    borderRadius:3,
    borderColor:Colors.appColor
  },

  InnerViewStyle: {justifyContent: 'center',flex:1,alignItems: 'center'},

  LogoImageStyle: {width:45, height:45,marginTop:10,tintColor: Colors.appColor},

  SmallImageStyle: {width:30, height:30,tintColor: Colors.appColor},

  TextStyle: {
    color: Colors.appColor,
    textAlign:'center',
    paddingBottom: 10,paddingLeft:10,paddingRight:10,paddingTop:5,
    alignItems: 'center',
    fontSize: 16,
    justifyContent: 'center'
  },

  DOBTextStyle:{marginLeft:7,height:40,fontSize:15,padding:7,color: Colors.black,marginTop:12},

  DOBDisableTextStyle:{marginLeft:7,height:40,fontSize:15,padding:7,color: Colors.lightGray,marginTop:12},



  /**
    Alert Dialog style
  **/
  Alert_Main_BG:{ height:'100%', flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor:Colors.alertTransparentColor },

  Alert_Main_View:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : Colors.white,
    height: 200 ,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius:4
  },

  Alert_Title:{
      fontSize: 20,
      fontWeight:'bold',
      color: Colors.black,
      textAlign: 'center',
      padding: 10
    },

    Alert_Option:{
      fontSize: 17,
      color: Colors.darkGray,
      padding: 10
    },

  Alert_Message:{
      fontSize: 17,
      color: Colors.darkGray,
      textAlign: 'center',
      padding: 20
    },

  Alert_ButtonStyle: {
      width: '50%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center'
  },

  Alert_TextStyle:{
      color:Colors.appColor,
      textAlign:'center',
      fontSize: 15
  }
});
