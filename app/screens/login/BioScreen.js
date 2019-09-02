import React, {Component} from 'react';
import {Text, View,TextInput, TouchableWithoutFeedback,Image,Dimensions,TouchableOpacity} from 'react-native';
import Colors from '../../utils/res/Colors';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';
import CustomDialogImagePicker from '../../customViews/dialog/CustomDialogImagePicker';
import ImagePicker from 'react-native-image-crop-picker';
import Toast, {DURATION} from 'react-native-easy-toast';
import ProgressView from '../../customViews/ProgressView';
import ApiService from '../../network/ApiService';
import Picker from 'react-native-wheel-picker'

export default class BioScreen extends Component {
 constructor(args) {
   super(args);
   let { width } = Dimensions.get("window");
   apiService = new ApiService();
   this.state = {
      screenWidth: width,
      distance:Strings.DISTANCE_MILES[0].name,
      bio:'',
      isLoading:false,
      showPickerDialog:false,
      avatarSource:'',
    }
 }
 componentWillMount = () => {
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

 onNextClick(){
  if(this.state.bio === ""){
    this.refs.toast.show("Please enter short bio");
     return;
  }
  if(this.state.avatarSource === ""){
    this.refs.toast.show("Please select profile picture");
     return;
  }
  this.setState({isLoading:true});
  apiService.uploadImage(Strings.FS_FILE_DIR_PROFILE,this.state.avatarSource,(error, response) => {
    console.log("onNextClick response : " + response);
    console.log("onNextClick error : " + error);
    if(response.length > 0){
      var data =  {
        bio:{
          shortDesc:this.state.bio,
          travelDistance:this.state.distance,
          profilePicURL :  response
      }};
      apiService.updateFirestoreData(data);
      this.setState({isLoading:false});
      var {navigate} = this.props.navigation;
      navigate("SuccessScreen");
    } else {
      this.refs.toast.show("File not uploaded");
    }
  })
 }

 render() {
   return (
     <View style={Styles.root}>
        <View style={{alignItems:'center', marginTop:10, width:this.state.screenWidth}}>
            <Text style = {Styles.headerLogoTextStyle}>{Strings.appName}</Text>
            <Text style = {Styles.headerInfoTextStyle}>Nearly Done!</Text>
        </View>
        <View style = {Styles.baseStyle1}>

            <TouchableWithoutFeedback onPress={() => {this.setState({showPickerDialog:true})}}>
              {this.state.avatarSource === "" ?  
                <Image style={{alignSelf: 'center',width: 100, height: 100, borderRadius: 100/2, marginTop:20}} source={require('../../images/user.png')} />
                : <Image style={{alignSelf: 'center',width: 100, height: 100, borderRadius: 100/2, marginTop:20}} source={{uri:this.state.avatarSource}} />
              }
            </TouchableWithoutFeedback>
                    <View style = {[Styles.InputTextBoxStyle, {marginTop:50,height:100}]}>
                        <TextInput
                           ref = 'inputShortBio'
                           style = {this.state.bio === '' ? Styles.InputTextDisableStyle : Styles.InputTextEnableStyle}
                           placeholder = "Short Bio"
                           onChangeText = {(text) => {this.setState({bio:text})}}
                           returnKeyType= { "done" }
                           underlineColorAndroid='transparent'
                           placeholderTextColor={Colors.hintColor}
                           textAlign={'center'}
                           value = {this.state.bio}
                         />
                    </View>
                    <Text style = {Styles.ForgotPasswordLinkTextStyle}>150 Characters</Text>

            <Text style = {[Styles.NewToAppTextStyle,{marginTop:30}]}>Distance prepared to travel</Text>
            <View style = {[Styles.InputTextBoxStyle, {marginTop:2}]}>
              <Picker style={{height: 45, flex:1}}
                    selectedValue={this.state.distance}
                    itemStyle={{color:Colors.black, fontSize:17,padding:6}}
                    onValueChange={(index) => {
                      console.log("onValueChange : "  +  index);
                      this.setState({distance: Strings.DISTANCE_MILES[index].name})
                    }}>
                    {Strings.DISTANCE_MILES.map((item, index) => {
                      return (<Picker.Item label={item.name} value={index}/>);
                    })}  
                </Picker>
            </View>
            <Text style = {[Styles.NewToAppTextStyle,{marginTop:10}]}>You can change this at any time from Settings</Text>
            
        </View>

        <TouchableOpacity style = {{width:this.state.screenWidth}} onPress={ () => this.onNextClick()}>
          <Text style = {[Styles.LoginButtonEnableTextStyle, {marginTop:10, marginBottom:30}]}>NEXT</Text>
        </TouchableOpacity>
        {this.state.isLoading && <ProgressView/> }
        <Toast ref="toast"/> 
        {<CustomDialogImagePicker onChooseOption = {(option) => {this.onOptionSelected(option)}} onCancelPress = {() => {this.hidePickerAlert()}} visibility = {this.state.showPickerDialog}/>}    
     </View>
   );
 }
}

