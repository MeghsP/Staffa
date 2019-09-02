
/*
  Defines styles for each UI Component
*/
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
