import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Picker, View,TextInput,ScrollView, Image,Dimensions,TouchableOpacity,Button} from 'react-native';
import Colors from '../../utils/res/Colors';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';
import { Provider,connect } from  'react-redux';
import {CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import CustomDialogImagePicker from '../../customViews/dialog/CustomDialogImagePicker';
import ImagePicker from 'react-native-image-crop-picker';
import Toast, {DURATION} from 'react-native-easy-toast';
import ProgressView from '../../customViews/ProgressView';
import ApiService from '../../network/ApiService';

type Props = {};
class ReferencesScreen extends Component {
 constructor(args) {
   super(args);
   let { width } = Dimensions.get("window");
   apiService = new ApiService();
   this.state = {
      screenWidth: width,
      totalData:[{id:1, name:'',doc:'',docURL:''}],
      showPickerDialog:false,
      avatarSource:'',
      selectedData:'',
      selectedIndex:'',
      isLoading:false,
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
    // this.setState({avatarSource : image.path });
    this.updateTotalData(image);
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
    // this.setState({avatarSource : image.path });
    this.updateTotalData(image);
  });
}

updateTotalData(image){
  var data = this.state.selectedData;
  data.doc = image.path;
  var allData = this.state.totalData;
  allData[this.state.selectedIndex] = data;
  this.setState({totalData : allData });
  console.log('updateTotalData array : ' + JSON.stringify(this.state.totalData));
}

hidePickerAlert(){
  this.setState({showPickerDialog: false});
}


 onScanClick(){
  
 }

 onUploadClick(data, index){
  this.setState({showPickerDialog:true});
  this.setState({selectedData:data});
  this.setState({selectedIndex:index});
 }

 onNextClick(){
  console.log('onNextClick array : ' + JSON.stringify(this.state.totalData));
  var allData = this.state.totalData;
  console.log('onNextClick length : ' + allData.length);
  var previousEntry = allData[allData.length - 1];
  if(previousEntry.name === ""){
    this.refs.toast.show("Please enter name for previous document");
  }  
  if(previousEntry.doc === ""){
    this.refs.toast.show("Please upload doc for previous document");
    return;
  }
  allData[this.state.totalData.length - 1] = previousEntry;
  console.log('onAddClick joined : ' + JSON.stringify(allData));
  this.setState({ totalData: allData });

  this.setState({ isLoading: true });
  var allData =  this.state.totalData;
  allData.map((data,index) => {
    if(data.doc.length > 0){
      apiService.uploadImage(Strings.FS_FILE_DIR_REFERENCES,data.doc,(error, response) => {
        console.log("onNextClick response : " + response);
        console.log("onNextClick error : " + error);
        if(response.length > 0){
          data.docURL = response;
          allData[index].docURL = response;
          console.log('onAddClick response allData : ' + JSON.stringify(allData));
          if(index === allData.length - 1){
            this.setState({ isLoading: false });
            var myData =  {
              references:{
                data:allData
            }};
            apiService.updateFirestoreData(myData);
            this.setState({isLoading:false});
            var {navigate} = this.props.navigation;
            navigate("SkillsScreen");
          }
          
        }
      })
    }
  });
  // var data =  {
  //   references:{
  //     data:this.state.totalData
  // }};
  // apiService.updateFirestoreData(data);
  // var {navigate} = this.props.navigation;
  // navigate("SkillsScreen");
 }
 onAddClick(){
  console.log('onAddClick array : ' + JSON.stringify(this.state.totalData));
  var allData = this.state.totalData;
  console.log('onAddClick length : ' + allData.length);
  var previousEntry = allData[allData.length - 1];
  if(previousEntry.name === ""){
    this.refs.toast.show("Please enter name for previous document");
    return;
  }
  if(previousEntry.doc === ""){
    this.refs.toast.show("Please upload doc for previous document");
    return;
  }
  allData[this.state.totalData.length - 1] = previousEntry;
  var joined = allData.concat({id:this.state.totalData.length + 1, name:'',doc:'',docURL:''});
  console.log('onAddClick joined : ' + JSON.stringify(joined));
  this.setState({ totalData: joined });
  // var joined = this.state.totalData.concat({name:''});
  // this.setState({ totalData: joined })
 }

 updateTextChange(index, text) {
  var currentData = this.state.totalData[index];
  currentData.name = text;
  var allData = this.state.totalData;
  allData[index] = currentData;
  this.setState({ totalData: allData });
}

 render() {
   return (
     <View style={Styles.root}>
        <View style={{alignItems:'center', marginTop:10, width:this.state.screenWidth}}>
            <Text style = {Styles.headerLogoTextStyle}>{Strings.appName}</Text>
            <Text style = {Styles.headerInfoTextStyle}>References</Text>
        </View>
        <View style = {Styles.baseStyle1}>
            <Text style = {[Styles.NewToAppTextStyle,{marginTop:10}]}>Upload your references</Text>
            <ScrollView>
            {
              this.state.totalData.map((data,index) => {
                return (
                  <View>
                    <View style = {Styles.InputTextBoxStyle}>
                      <TextInput
                          ref = 'inputUsername'
                          style = {data.name === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                          placeholder = "Name of Reference"
                          onChangeText = {(text) => {
                            this.updateTextChange(index, text);
                          }}
                          returnKeyType= { "done" }
                          underlineColorAndroid='transparent'
                          placeholderTextColor={Colors.hintColor}
                          textAlign={'center'}
                          value = {data.name}
                      />
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <TouchableOpacity onPress={() => {}}>
                        <Text style = {[Styles.LoginButtonEnableTextStyle,{width:90,marginTop:5,borderRadius:10, height:50}]}>Scan</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {this.onUploadClick(data, index)}}>
                        <Text style = {[Styles.LoginButtonEnableTextStyle,{width:90,marginTop:5, borderRadius:10, height:50}]}>Upload</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
            }
            </ScrollView>
        </View>
            <TouchableOpacity style = {{width:this.state.screenWidth}} onPress={ () => this.onAddClick()}>
              <Text style = {[Styles.LoginButtonEnableTextStyle, {marginTop:30}]}>ADD REFERENCE</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{width:this.state.screenWidth}} onPress={ () => this.onNextClick()}>
              <Text style = {[Styles.LoginButtonEnableTextStyle, {marginTop:10, marginBottom:30}]}>NEXT</Text>
            </TouchableOpacity>
            {<CustomDialogImagePicker onChooseOption = {(option) => {this.onOptionSelected(option)}} onCancelPress = {() => {this.hidePickerAlert()}} visibility = {this.state.showPickerDialog}/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReferencesScreen)
