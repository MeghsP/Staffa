import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Picker, View,TextInput,ScrollView, Image,Dimensions,TouchableOpacity,Button} from 'react-native';
import Colors from '../../utils/res/Colors';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';
import { Provider,connect } from  'react-redux';
import {CheckBox} from 'react-native-elements';
import moment from 'moment';
import ProgressView from '../../customViews/ProgressView';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import AsyncStorage from '@react-native-community/async-storage';
import ApiService from '../../network/ApiService';
import Toast, {DURATION} from 'react-native-easy-toast';
import firebase from 'react-native-firebase';

type Props = {};
class SignUpScreen extends Component {
 constructor(args) {
   super(args);
   let { width } = Dimensions.get("window");
   this.fsUsers = firebase.firestore().collection('Users');
   this.state = {
      screenWidth: width,
      // username:'',
      // password:'',
      // confirmPassword:'',
      // firstName:'',
      // lastName:'',
      // dob:'DOB',
      // dobDate:'',
      // nationalIDNumber:'',
      // email:'',
      // mobileNumber:'',
      // regNumber:'',
      username:'Megha',
      password:'Megha123',
      confirmPassword:'Megha123',
      firstName:'Megha',
      lastName:'Patel',
      dob:'DOB',
      dobDate:'',
      nationalIDNumber:'123456',
      email:'meghasachaniya127@gmail.com',
      mobileNumber:'6352585421',
      regNumber:'123',

      gender:Strings.GENDER[0].name,
      checked:false,
      isLoading:false,
    }
 }
 componentWillMount = () => {
 }
 componentDidMount(){
 }

 onDOBDatePicked = (date) => {
  this.setState({dobDate: date});
  this.setState({dob: moment(date).format('DD-MMM-YYYY')});

}

 onRegisterClick(){
   if(this.state.username === ""){
    this.refs.toast.show("Please enter username");
     return;
   }
   if(this.state.firstName === ""){
    this.refs.toast.show("Please enter first name");
     return;
   }
   if(this.state.lastName === ""){
    this.refs.toast.show("Please enter last name");
     return;
   }
   if(this.state.password === ""){
    this.refs.toast.show("Please enter password");
     return;
   }
   if(this.state.confirmPassword === "Please enter confirm password"){
    this.refs.toast.show("");
     return;
   }
   if(this.state.password !== this.state.confirmPassword){
    this.refs.toast.show("Password doesn't match");
     return;
   }
   if(this.state.email === ""){
    this.refs.toast.show("Please enter email");
     return;
   }
   if(this.state.mobileNumber === ""){
    this.refs.toast.show("Please enter mobile number");
     return;
   }
   if(this.state.nationalIDNumber === ""){
    this.refs.toast.show("Please enter national id number");
     return;
   }
   if(this.state.regNumber === ""){
    this.refs.toast.show("Please enter registration number");
     return;
   }
   if(this.state.dobDate === ""){
    this.refs.toast.show("Please select date of birth");
     return;
   }
   
  this.setState({isLoading:true});
  firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then((user) => {
    console.log("SUCCESS : " + JSON.stringify(user));
    // {"additionalUserInfo":{"isNewUser":true},"user":{"metadata":{"lastSignInTime":1567067914331,"creationTime":1567067914331},
    // "providerData":[{"email":"meghasachaniya127@gmail.com","phoneNumber":null,"photoURL":null,"displayName":null,
    // "uid":"meghasachaniya127@gmail.com","providerId":"password"}],"phoneNumber":null,"photoURL":null,"displayName":null,
    // "email":"meghasachaniya127@gmail.com","isAnonymous":false,"emailVerified":false,"providerId":"firebase",
    // "uid":"QS5z4NZ9icdG6ryCm2CItMauorl1"}}
    // this.fsUsers
    // .add({
    //   uid:firebase.auth().currentUser.uid
    // })
    var userID =  "" + user.user.uid;
    console.log("UserID : " + userID);
    var users = firebase.firestore().collection(Strings.FS_COLLECTION_USERS);
    // var userDoc = await users.doc(userID).get();
    var userDoc = users.doc(userID);
    userDoc.set({
      uid:userID,
      registerData:{
        username:this.state.username,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        dob:this.state.dobDate,
        nationalIDNumber:this.state.nationalIDNumber,
        mobileNumber:this.state.mobileNumber,
        regNumber:this.state.regNumber,
        gender:this.state.gender,
        isSecurePay:this.state.checked
      }
    });
    // var registerCollection = userDoc.collection(Strings.FS_COLLECTION_REGISTER_USET_DATA);
    // registerCollection.add({
    //   username:this.state.username,
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   dob:this.state.dobDate,
    //   nationalIDNumber:this.state.nationalIDNumber,
    //   mobileNumber:this.state.mobileNumber,
    //   regNumber:this.state.regNumber,
    //   gender:this.state.gender,
    //   isSecurePay:this.state.checked
    // });
    // ApiService.setStoreData(ApiService.PREF_USER_DATA, JSON.stringify(user));
    this.sendVerification();
    // this.refs.toast.show("You are registered successfully. Please verify email and mobile number", Toast.LONG);
    // var {navigate} = this.props.navigation;
    
    // this.props.navigation.goBack();
    // navigate("VerifyMobileNumberScreen");
    // navigate("AddAddressScreen");
  }).catch(error => {
    this.setState({isLoading:false});
    console.log("ERROR : " + error.message)
    this.refs.toast.show(error.message);
  });
  
 }

 sendVerification(){
  firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
    this.setState({isLoading:false});
    this.props.navigation.replace('VerifyMobileNumberScreen');
    // var {navigate} = this.props.navigation;
    // navigate("VerifyMobileNumberScreen");
  }).catch(error => {
    this.setState({isLoading:false});
    console.log("ERROR : " + error.message)
    this.refs.toast.show(error.message);
  });
 }

 onDOBPress = () => {
    let dobDate = this.state.dobDate;

    if(!dobDate || dobDate == null){
      dobDate = new Date();
      this.setState({dobDate: dobDate});
    }
    this.refs.dobDialog.open({
      date: dobDate,
      maxDate: new Date()
    });
  }

 render() {
   return (
     <View style={Styles.root}>
        <View style={{alignItems:'center', marginTop:10, width:this.state.screenWidth}}>
            <Text style = {Styles.headerLogoTextStyle}>{Strings.appName}</Text>
            <Text style = {Styles.headerInfoTextStyle}>New Account</Text>
        </View>
        <View style = {Styles.baseStyle1}>
          <ScrollView>
            <View style = {{width:this.state.screenWidth}}>
                    <View style = {Styles.InputTextBoxStyle}>
                        <TextInput
                           ref = 'inputUsername'
                           style = {this.state.username === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Username"
                           onChangeText = {(text) => {this.setState({username:text})}}
                           returnKeyType= { "next" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.username}
                           onSubmitEditing = {() => {this.refs.inputPassword.focus()}}
                         />
                    </View>
                    <View style = {[Styles.InputTextBoxStyle, {marginTop:2}]}>
                        <TextInput
                           ref = 'inputPassword'
                           style = {this.state.password === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Password"
                           onChangeText = {(text) => {this.setState({password:text})}}
                           returnKeyType= { "next" }
                           secureTextEntry = {true}
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.password}
                           onSubmitEditing = {() => {this.refs.inputConfirmPassword.focus()}}
                         />
                    </View>
                    <View style = {[Styles.InputTextBoxStyle, {marginTop:2}]}>
                        <TextInput
                           ref = 'inputConfirmPassword'
                           style = {this.state.confirmPassword === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Confirm Password"
                           onChangeText = {(text) => {this.setState({confirmPassword:text})}}
                           returnKeyType= { "next" }
                           secureTextEntry = {true}
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.confirmPassword}
                           onSubmitEditing = {() => {this.refs.inputFirstName.focus()}}
                         />
                    </View>
                    <View style = {[Styles.InputTextBoxStyle, {marginTop:10}]}>
                        <TextInput
                           ref = 'inputFirstName'
                           style = {this.state.firstName === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "First Name"
                           onChangeText = {(text) => {this.setState({firstName:text})}}
                           returnKeyType= { "next" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.firstName}
                           onSubmitEditing = {() => {this.refs.inputLastName.focus()}}
                         />
                    </View>
                    <View style = {[Styles.InputTextBoxStyle, {marginTop:2}]}>
                        <TextInput
                           ref = 'inputLastName'
                           style = {this.state.lastName === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Last Name"
                           onChangeText = {(text) => {this.setState({lastName:text})}}
                           returnKeyType= { "next" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.lastName}
                           onSubmitEditing = {() => {this.refs.inputNationalID.focus()}}
                         />
                    </View>
                    <View style = {[Styles.InputTextBoxStyle, {marginTop:2}]}>
                      <TouchableOpacity onPress = { () => this.onDOBPress() }>
                        <Text style = {[Styles.InputTextEnableStyle,{marginTop:5}]}>{this.state.dob}</Text>
                      </TouchableOpacity>
                    </View>

                    <View style = {[Styles.InputTextBoxStyle, {marginTop:10}]}>
                        <TextInput
                           ref = 'inputNationalID'
                           style = {this.state.nationalIDNumber === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "National Insurance Number"
                           onChangeText = {(text) => {this.setState({nationalIDNumber:text})}}
                           returnKeyType= { "next" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.nationalIDNumber}
                           onSubmitEditing = {() => {this.refs.inputEmail.focus()}}
                         />
                    </View>

                    <View style = {[Styles.InputTextBoxStyle, {marginTop:10}]}>
                        <TextInput
                           ref = 'inputEmail'
                           style = {this.state.email === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Email"
                           onChangeText = {(text) => {this.setState({email:text})}}
                           returnKeyType= { "next" }
                           keyboardType = {"email-address"}
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.email}
                           onSubmitEditing = {() => {this.refs.inputMoble.focus()}}
                         />
                    </View>

                    <View style = {[Styles.InputTextBoxStyle, {marginTop:2}]}>
                        <TextInput
                           ref = 'inputMoble'
                           style = {this.state.mobileNumber === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Mobile Number"
                           onChangeText = {(text) => {this.setState({mobileNumber:text})}}
                           returnKeyType= { "next" }
                           keyboardType = {"number"}
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.mobileNumber}
                           onSubmitEditing = {() => {this.refs.inputRegistrationNumber.focus()}}
                         />
                    </View>

                    <View style = {[Styles.InputTextBoxStyle, {marginTop:10}]}>
                        <TextInput
                           ref = 'inputRegistrationNumber'
                           style = {this.state.regNumber === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Registration Number"
                           onChangeText = {(text) => {this.setState({regNumber:text})}}
                           returnKeyType= { "done" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.regNumber}
                         />
                    </View>
                    <View style = {[Styles.InputTextBoxStyle, {marginTop:2}]}>
                        <Picker
                          selectedValue={this.state.gender}
                          style={{height: 45, flex:1}}
                          onValueChange={(itemValue, itemIndex) => {
                            this.setState({gender: Strings.GENDER[itemIndex].name})
                          }}>
                          {Strings.GENDER.map((item) => {
                            return (<Picker.Item label={item.name} value={item.name}/>);
                          })}
                        </Picker>
                    </View>

                    <CheckBox
                      title='Do you want to secure holiday pay?'
                      checkedColor={Colors.appColor}
                      containerStyle = {Styles.CheckBoxContainerStyle}
                      textStyle = {[Styles.NewToAppTextStyle,{marginTop:3}]}
                      checked={this.state.checked}
                      onPress={() => this.setState({checked: !this.state.checked})}
                    />

                    <TouchableOpacity onPress={ () => this.onRegisterClick()}>
                        <Text style = {[Styles.LoginButtonEnableTextStyle, {margin:10}]}>REGISTER</Text>
                    </TouchableOpacity>
              </View>   
            </ScrollView>   
        </View>
        <DatePickerDialog ref="dobDialog" onDatePicked={this.onDOBDatePicked.bind(this)} />
        {this.state.isLoading && <ProgressView/> }
        <Toast ref="toast"/>
     </View>
   );
 }
}

const mapStateToProps = state => {
  return {
    // places: state.places.places
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // add: (name) => {
    //   dispatch(addPlace(name))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
