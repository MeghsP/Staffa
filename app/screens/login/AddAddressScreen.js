import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Picker, View,TextInput,ScrollView, Image,Dimensions,TouchableOpacity,Button} from 'react-native';
import Colors from '../../utils/res/Colors';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';
import { Provider,connect } from  'react-redux';
import {CheckBox} from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';
import ProgressView from '../../customViews/ProgressView';
import ApiService from '../../network/ApiService';

type Props = {};
class AddAddressScreen extends Component {
 constructor(args) {
   super(args);
   let { width } = Dimensions.get("window");
   apiService = new ApiService();
   this.state = {
      screenWidth: width,
      address1:'',
      address2:'',
      address3:'',
      postcode:'',
      accountName:'',
      bankName:'',
      accountNumber:'',
      sortCode:'',
      isLoading:false,
      
    }
 }
 componentWillMount = () => {
 }
 componentDidMount(){
 }

 onNextClick(){
   if(this.state.address1 === ""){
    this.refs.toast.show("Please enter address1");
     return;
   }
   if(this.state.address2 === ""){
    this.refs.toast.show("Please enter address2");
     return;
   }
   if(this.state.address3 === ""){
    this.refs.toast.show("Please enter address3");
     return;
   }
   if(this.state.postcode === ""){
    this.refs.toast.show("Please enter postcode");
     return;
   }
   if(this.state.accountName === ""){
    this.refs.toast.show("Please enter account name");
     return;
   }
   if(this.state.bankName === ""){
    this.refs.toast.show("Please enter bank name");
     return;
   }
   if(this.state.accountNumber === ""){
    this.refs.toast.show("Please enter account number");
     return;
   }
   if(this.state.sortCode === ""){
    this.refs.toast.show("Please enter sort code");
     return;
   }
   var data =  {
    addressData:{
      address1:this.state.address1,
      address2: this.state.address2,
      address3: this.state.address3,
      postcode:this.state.postcode,
      accountName:this.state.accountName,
      accountNumber:this.state.accountNumber,
      bankName:this.state.bankName,
      sortCode:this.state.sortCode
  }};
  apiService.updateFirestoreData(data); 
  var {navigate} = this.props.navigation;
  navigate("TermsConditionScreen");
 }

 render() {
   return (
     <View style={Styles.root}>
        <View style={{alignItems:'center', marginTop:10, width:this.state.screenWidth}}>
            <Text style = {Styles.headerLogoTextStyle}>{Strings.appName}</Text>
            <Text style = {Styles.headerInfoTextStyle}>New Account</Text>
        </View>
        <View style = {Styles.baseStyle1}>
            <View style = {{width:this.state.screenWidth}}>
                    <View style = {Styles.InputTextBoxStyle}>
                        <TextInput
                           ref = 'inputAdd1'
                           style = {this.state.address1 === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Address 1"
                           onChangeText = {(text) => {this.setState({address1:text})}}
                           returnKeyType= { "next" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.address1}
                           onSubmitEditing = {() => {this.refs.inputAdd2.focus()}}
                         />
                    </View>
                    <View style = {[Styles.InputTextBoxStyle, {marginTop:2}]}>
                        <TextInput
                           ref = 'inputAdd2'
                           style = {this.state.address2 === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Address 2"
                           onChangeText = {(text) => {this.setState({address2:text})}}
                           returnKeyType= { "next" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.address2}
                           onSubmitEditing = {() => {this.refs.inputAdd3.focus()}}
                         />
                    </View>
                    <View style = {[Styles.InputTextBoxStyle, {marginTop:2}]}>
                        <TextInput
                           ref = 'inputAdd3'
                           style = {this.state.address3 === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Address 3"
                           onChangeText = {(text) => {this.setState({address3:text})}}
                           returnKeyType= { "next" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.address3}
                           onSubmitEditing = {() => {this.refs.inputPostcode.focus()}}
                         />
                    </View>
                    <View style = {[Styles.InputTextBoxStyle, {marginTop:2}]}>
                        <TextInput
                           ref = 'inputPostcode'
                           style = {this.state.postcode === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Postcode"
                           onChangeText = {(text) => {this.setState({postcode:text})}}
                           returnKeyType= { "next" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.postcode}
                           onSubmitEditing = {() => {this.refs.inputAccountName.focus()}}
                         />
                    </View>
                    <Text style = {Styles.NewToAppTextStyle}>Bank account to be paid into</Text>
                    <View style = {[Styles.InputTextBoxStyle, {marginTop:10}]}>
                        <TextInput
                           ref = 'inputAccountName'
                           style = {this.state.accountName === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Account Name"
                           onChangeText = {(text) => {this.setState({accountName:text})}}
                           returnKeyType= { "next" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.accountName}
                           onSubmitEditing = {() => {this.refs.inputBankName.focus()}}
                         />
                    </View>
                    <View style = {[Styles.InputTextBoxStyle, {marginTop:2}]}>
                        <TextInput
                           ref = 'inputBankName'
                           style = {this.state.bankName === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Bank Name"
                           onChangeText = {(text) => {this.setState({bankName:text})}}
                           returnKeyType= { "next" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.bankName}
                           onSubmitEditing = {() => {this.refs.inputAccNumber.focus()}}
                         />
                    </View>
                    <View style = {[Styles.InputTextBoxStyle, {marginTop:2}]}>
                        <TextInput
                           ref = 'inputAccNumber'
                           style = {this.state.accountNumber === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Bank Account Number"
                           onChangeText = {(text) => {this.setState({accountNumber:text})}}
                           returnKeyType= { "next" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.accountNumber}
                           onSubmitEditing = {() => {this.refs.inputSortCode.focus()}}
                         />
                    </View>
                    <View style = {[Styles.InputTextBoxStyle, {marginTop:2}]}>
                        <TextInput
                           ref = 'inputSortCode'
                           style = {this.state.sortCode === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Sortcode"
                           onChangeText = {(text) => {this.setState({sortCode:text})}}
                           returnKeyType= { "done" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.sortCode}
                           onSubmitEditing = {() => {this.onNextClick()}}
                         />
                    </View>

                    <TouchableOpacity onPress={ () => this.onNextClick()}>
                      {/* <View style = {Styles.LoginButtonBackgroundStyle}> */}
                        <Text style = {Styles.LoginButtonEnableTextStyle}>NEXT</Text>
                      {/* </View> */}
                    </TouchableOpacity>
              </View>   
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressScreen)
