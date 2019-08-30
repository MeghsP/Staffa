import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Picker, View,TextInput,ScrollView, Image,Dimensions,TouchableOpacity,Button} from 'react-native';
import Colors from '../../utils/res/Colors';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';
import { Provider,connect } from  'react-redux';
import {CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Toast, {DURATION} from 'react-native-easy-toast';
import ProgressView from '../../customViews/ProgressView';
import ApiService from '../../network/ApiService';
import CustomDialogImagePicker from '../../customViews/dialog/CustomDialogImagePicker';
import ImagePicker from 'react-native-image-crop-picker';

type Props = {};
class DBSScreen extends Component {
 constructor(args) {
   super(args);
   apiService = new ApiService();
   let { width } = Dimensions.get("window");
   this.state = {
      screenWidth: width,
      docType:Strings.DOC_TYPE[0].name,
      showPickerDialog:false,
      avatarSource:'',
      checked1:false,
      checked2:false,
      
    }
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
  
 }

 onUploadClick(){
  this.setState({showPickerDialog:true});
 }

 onNextClick(){
  if(this.state.checked1 === false && this.state.checked2 === false){
    this.refs.toast.show("Please select option");
    return;
  }
  if(this.state.checked2){
      var isDocAvailable = false;
      var data =  {
        dbsDocument:{
          isDocAvailable:isDocAvailable
      }};
      apiService.updateFirestoreData(data);
      var {navigate} = this.props.navigation;
      navigate("QualificationScreen");
  } else {
    if(this.state.avatarSource === ""){
      this.refs.toast.show("Please select DBS document");
      return;
    }
    this.setState({isLoading:true});
    apiService.uploadImage(Strings.FS_FILE_DIR_DBS,this.state.avatarSource,(error, response) => {
      console.log("onNextClick response : " + response);
      console.log("onNextClick error : " + error);
      if(response.length > 0){
        var isDocAvailable = false;
        if(this.state.checked1){
          isDocAvailable = true;
        }
        var data =  {
          dbsDocument:{
            isDocAvailable:isDocAvailable,
            docURL:response
        }};
        apiService.updateFirestoreData(data);
        var {navigate} = this.props.navigation;
        navigate("QualificationScreen");
      } else {
        this.refs.toast.show("File not uploaded");
      }
    })
  }
  
 }

 render() {
   return (
     <View style={Styles.root}>
        <View style={{alignItems:'center', marginTop:10, width:this.state.screenWidth}}>
            <Text style = {Styles.headerLogoTextStyle}>{Strings.appName}</Text>
            <Text style = {Styles.headerInfoTextStyle}>DBS</Text>
        </View>
        <View style = {Styles.baseStyle1}>
            <Text style = {[Styles.NewToAppTextStyle,{marginTop:30, marginLeft:50, marginRight:50, fontSize:15}]}>Do you have current valid DBS certificate that is no more than 2 years old?</Text>
            <View style = {{flexDirection:'row',marginLeft:40, marginRight:40}}>
              <CheckBox
                title='YES'
                checkedColor={Colors.appColor}
                containerStyle = {[Styles.CheckBoxLeftContainerStyle, {flex:1}]}
                textStyle = {[Styles.CheckBoxTextStyle]}
                checked={this.state.checked1}
                onPress={() => {this.setState({checked1: !this.state.checked1});
                                if(this.state.checked2){
                                  this.setState({checked2: false})
                                }
                               }}
              />
              <CheckBox
                  title='NO'
                  checkedColor={Colors.appColor}
                  containerStyle = {[Styles.CheckBoxLeftContainerStyle, {flex:1}]}
                  textStyle = {[Styles.CheckBoxTextStyle]}
                  checked={this.state.checked2}
                  onPress={() => {this.setState({checked2: !this.state.checked2});
                                    if(this.state.checked1){
                                      this.setState({checked1: false})
                                    }
                                  }}
              />
            </View>          
            {this.state.checked1 && 
              <TouchableOpacity style = {{width:this.state.screenWidth}} onPress={ () => this.onScanClick()}>
                <Text style = {[Styles.LoginButtonEnableTextStyle, {marginTop:30}]}>Scan DBS Certificate</Text>
              </TouchableOpacity>
            }
            {this.state.checked1 &&
              <TouchableOpacity style = {{width:this.state.screenWidth}} onPress={ () => this.onUploadClick()}>
                <Text style = {[Styles.LoginButtonEnableTextStyle, {marginTop:10}]}>Upload DBS Certificate</Text>
              </TouchableOpacity>
            }

            <TouchableOpacity style = {{width:this.state.screenWidth}} onPress={ () => this.onNextClick()}>
              <Text style = {[Styles.LoginButtonEnableTextStyle, {marginTop:70, marginBottom:30}]}>NEXT</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(DBSScreen)
