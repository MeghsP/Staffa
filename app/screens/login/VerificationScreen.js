import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Picker, View,TextInput,ScrollView, Image,Dimensions,TouchableOpacity,Button} from 'react-native';
import Colors from '../../utils/res/Colors';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';
import { Provider,connect } from  'react-redux';
import CustomDialogImagePicker from '../../customViews/dialog/CustomDialogImagePicker';
import ImagePicker from 'react-native-image-crop-picker';
import {CheckBox} from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';
import ProgressView from '../../customViews/ProgressView';
import ApiService from '../../network/ApiService';

type Props = {};
class VerificationScreen extends Component {
 constructor(args) {
   super(args);
   apiService = new ApiService();
   let { width } = Dimensions.get("window");
   this.state = {
      screenWidth: width,
      docType:Strings.DOC_TYPE[0].name,
      showPickerDialog:false,
      avatarSource:'',
      isLoading:false,
    }
 }
 componentWillMount = () => {
 }
 componentDidMount(){
 }

 onNextClick(){
  if(this.state.avatarSource === ""){
    this.refs.toast.show("Please select document");
     return;
  }

  this.setState({isLoading:true});
  apiService.uploadImage(Strings.FS_FILE_DIR_VERIFICATION,this.state.avatarSource,(error, response) => {
    console.log("onNextClick response : " + response);
    console.log("onNextClick error : " + error);
    if(response.length > 0){
      var data =  {
        docVerification:{
          docType:this.state.docType,
          docURL:response
      }};
      apiService.updateFirestoreData(data);
      this.setState({isLoading:false});
      var {navigate} = this.props.navigation;
      navigate("DBSScreen");
    } else {
      this.refs.toast.show("File not uploaded");
    }
  })
  
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
    this.setState({avatarSource : image.path });
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
    this.setState({avatarSource : image.path });
  });
}
hidePickerAlert(){
  this.setState({showPickerDialog: false});
}

 onScanClick(){
  this.setState({showPickerDialog:true});
 }

 render() {
   return (
     <View style={Styles.root}>
        <View style={{alignItems:'center', marginTop:10, width:this.state.screenWidth}}>
            <Text style = {Styles.headerLogoTextStyle}>{Strings.appName}</Text>
            <Text style = {Styles.headerInfoTextStyle}>Verification</Text>
        </View>
        <View style = {Styles.baseStyle1}>
            <Text style = {[Styles.NewToAppTextStyle,{marginTop:50}]}>Select Document Type</Text>
            <View style = {[Styles.InputTextBoxStyle, {marginTop:50}]}>
              <Picker
                selectedValue={this.state.docType}
                style={{height: 45, flex:1}}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({docType: Strings.GENDER[itemIndex].name})
                }}>
                {Strings.DOC_TYPE.map((item) => {
                  return (<Picker.Item label={item.name} value={item.name}/>);
                })}
              </Picker>
            </View>          

            <View style={{margin:30, height:200, width:this.state.screenWidth - 60, borderColor:Colors.black,borderWidth:1, borderRadius:1}}>
                {this.state.avatarSource !== "" &&
                  <Image style={{width:this.state.screenWidth - 64, height: 200}} source={{uri:this.state.avatarSource}} />
                }
            </View>
            <TouchableOpacity style = {{width:this.state.screenWidth}} onPress={ () => this.onScanClick()}>
              <Text style = {[Styles.LoginButtonEnableTextStyle, {marginTop:30, marginBottom:30}]}>{this.state.avatarSource === "" ? 'Upload Document' : 'Scan Document'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{width:this.state.screenWidth}} onPress={ () => this.onNextClick()}>
              <Text style = {[Styles.LoginButtonEnableTextStyle, {marginTop:10, marginBottom:30}]}>NEXT</Text>
            </TouchableOpacity>

        </View>
        {this.state.isLoading && <ProgressView/> }
        <Toast ref="toast"/>
        {<CustomDialogImagePicker onChooseOption = {(option) => {this.onOptionSelected(option)}} onCancelPress = {() => {this.hidePickerAlert()}} visibility = {this.state.showPickerDialog}/>} 
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

export default connect(mapStateToProps, mapDispatchToProps)(VerificationScreen)
