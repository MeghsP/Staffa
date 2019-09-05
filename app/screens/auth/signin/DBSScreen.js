import React, {Component} from 'react';
import {Text,Image, View,TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {AppConsumer} from '../../../context/AppProvider'; 

export default class DBSScreen extends Component {
 constructor(args) {
   super(args);
   this.state = {
      // docType:Strings.DOC_TYPE[0].name,
      avatarSource:'',
      isDocAvailable:false,
      checked2:false,
      
    }
 }

 componentDidMount(){
  if(this.context.userData && this.context.userData.dbsDocument){
   var data = this.context.userData.dbsDocument;
   this.setState(data);
   this.setState({isDataAvailable:true});
   this.setState({checked2:false});
  }
}


 onScanClick(){
  
 }

 onUploadClick(){
  this.context.showImagePickerAlert((image) => {
    this.setState({avatarSource:image});
   });
 }

 onNextClick(){
  if(this.state.isDocAvailable === false && this.state.checked2 === false){
    this.context.showToast("Please select option");
    return;
  }
  if(this.state.checked2){
      var data =  {
        dbsDocument:{
          isDocAvailable:false
      }};
      this.context.apiService.updateFirestoreUserData(this.context.currentUser.uid, data);
      this.context.replaceScreen(this,this.context.utilities.strings.APP_SCREEN_QUALIFICATION)
  } else {
    if(this.state.avatarSource === ""){
      this.context.showToast("Please select DBS document");
      return;
    }
    this.context.showLoading(true);
    var filePath = this.context.currentUser.uid +"/"+this.context.utilities.strings.FS_FILE_DIR_DBS;
    this.context.apiService.uploadImage(filePath,this.state.avatarSource,(error, response) => {
      console.log("onNextClick response : " + response);
      console.log("onNextClick error : " + error);
      if(response.length > 0){
        var isDocAvailable = false;
        if(this.state.isDocAvailable){
          isDocAvailable = true;
        }
        var data =  {
          dbsDocument:{
            isDocAvailable:isDocAvailable,
            docURL:response
        }};
        this.context.apiService.updateFirestoreUserData(this.context.currentUser.uid, data);
        this.context.showLoading(false);
        if(this.state.isDataAvailable){
          this.context.userData.dbsDocument = data.dbsDocument;
          this.context.goBack(this);
        } else {
          this.context.replaceScreen(this,this.context.utilities.strings.APP_SCREEN_QUALIFICATION);
        }
      } else {
        this.context.showToast("File not uploaded");
      }
    })
  }
  
 }

 render() {
   return (
    <AppConsumer>
    {(context) => (
     <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
        <View style={{marginTop:10, flexDirection:'row'}}>
          {this.state.isDataAvailable && 
            <TouchableOpacity style={{position:'absolute', marginLeft:10}} onPress={() => context.goBack(this)}>
              <Image source={require('../../../images/back.png')} style={{width:30, height:30}} tintColor={context.utilities.colors.black} />
            </TouchableOpacity>
          }
          <View style={{alignItems:'center', flex:1}} >
            <Text style = {context.utilities.styles.headerLogoTextStyle}>{context.utilities.strings.appName}</Text>
            <Text style = {context.utilities.styles.headerInfoTextStyle}>DBS</Text>
          </View>
        </View>  
        <View style = {context.utilities.styles.baseStyle1}>
            <Text style = {[context.utilities.styles.NewToAppTextStyle,{marginTop:30, marginLeft:50, marginRight:50, fontSize:15}]}>Do you have current valid DBS certificate that is no more than 2 years old?</Text>
            <View style = {{flexDirection:'row',marginLeft:40, marginRight:40}}>
              <CheckBox
                title='YES'
                checkedColor={context.utilities.colors.appColor}
                containerStyle = {[context.utilities.styles.CheckBoxLeftContainerStyle, {flex:1}]}
                textStyle = {[context.utilities.styles.CheckBoxTextStyle]}
                checked={this.state.isDocAvailable}
                onPress={() => {this.setState({isDocAvailable: !this.state.isDocAvailable});
                                if(this.state.checked2){
                                  this.setState({checked2: false})
                                }
                               }}
              />
              <CheckBox
                  title='NO'
                  checkedColor={context.utilities.colors.appColor}
                  containerStyle = {[context.utilities.styles.CheckBoxLeftContainerStyle, {flex:1}]}
                  textStyle = {[context.utilities.styles.CheckBoxTextStyle]}
                  checked={this.state.checked2}
                  onPress={() => {this.setState({checked2: !this.state.checked2});
                                    if(this.state.isDocAvailable){
                                      this.setState({isDocAvailable: false})
                                    }
                                  }}
              />
            </View>          
            {this.state.isDocAvailable && 
              <TouchableOpacity style = {{width:context.screenWidth}} onPress={ () => this.onScanClick()}>
                <Text style = {[context.utilities.styles.LoginButtonEnableTextStyle, {marginTop:30}]}>Scan DBS Certificate</Text>
              </TouchableOpacity>
            }
            {this.state.isDocAvailable &&
              <TouchableOpacity style = {{width:context.screenWidth}} onPress={ () => this.onUploadClick()}>
                <Text style = {[context.utilities.styles.LoginButtonEnableTextStyle, {marginTop:10}]}>Upload DBS Certificate</Text>
              </TouchableOpacity>
            }

            <TouchableOpacity style = {{width:context.screenWidth}} onPress={ () => this.onNextClick()}>
              <Text style = {[context.utilities.styles.LoginButtonEnableTextStyle, {marginTop:70, marginBottom:30}]}>{this.state.isDataAvailable ? 'UPDATE' :  "NEXT"}</Text>
            </TouchableOpacity>
        </View>
        </View>
     )} 
     </AppConsumer>
   );
 }
}