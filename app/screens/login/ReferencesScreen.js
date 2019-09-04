import React, {Component} from 'react';
import {Text, View,TextInput,ScrollView,TouchableOpacity} from 'react-native';
import {AppConsumer} from '../../context/AppProvider'; 

export default class ReferencesScreen extends Component {
 constructor(args) {
   super(args);
   this.state = {
      totalData:[{id:1, name:'',doc:'',docURL:''}],
      selectedData:'',
      selectedIndex:'',
    }
 }

updateTotalData(image){
  var data = this.state.selectedData;
  data.doc = image;
  var allData = this.state.totalData;
  allData[this.state.selectedIndex] = data;
  this.setState({totalData : allData });
  console.log('updateTotalData array : ' + JSON.stringify(this.state.totalData));
}

 onScanClick(){
  
 }

 onUploadClick(data, index){
  this.setState({selectedData:data});
  this.setState({selectedIndex:index});
  this.context.showImagePickerAlert((image) => {
    this.updateTotalData(image);
  });
 }

 onNextClick(){
  console.log('onNextClick array : ' + JSON.stringify(this.state.totalData));
  var allData = this.state.totalData;
  console.log('onNextClick length : ' + allData.length);
  var previousEntry = allData[allData.length - 1];
  if(previousEntry.name === ""){
    this.context.showToast("Please enter name for previous document");
  }  
  if(previousEntry.doc === ""){
    this.context.showToast("Please upload doc for previous document");
    return;
  }
  allData[this.state.totalData.length - 1] = previousEntry;
  console.log('onAddClick joined : ' + JSON.stringify(allData));
  this.setState({ totalData: allData });

  this.context.showLoading(true);
  var allData =  this.state.totalData;
  allData.map((data,index) => {
    if(data.doc.length > 0){
      var filePath = this.context.currentUser.uid +"/"+this.context.utilities.strings.FS_FILE_DIR_REFERENCES;
      this.context.apiService.uploadImage(filePath,data.doc,(error, response) => {
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
            this.context.apiService.updateFirestoreUserData(this.context.currentUser.uid,myData);
            this.context.showLoading(false);
            this.context.replaceScreen(this,this.context.utilities.strings.APP_SCREEN_SKILLS);
          }
        }
      })
    }
  });
  
 }
 onAddClick(){
  console.log('onAddClick array : ' + JSON.stringify(this.state.totalData));
  var allData = this.state.totalData;
  console.log('onAddClick length : ' + allData.length);
  var previousEntry = allData[allData.length - 1];
  if(previousEntry.name === ""){
    this.context.showToast("Please enter name for previous document");
    return;
  }
  if(previousEntry.doc === ""){
    this.context.showToast("Please upload doc for previous document");
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
    <AppConsumer>
    {(context) => (
     <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
        <View style={{alignItems:'center', marginTop:10, width:context.screenWidth}}>
            <Text style = {context.utilities.styles.headerLogoTextStyle}>{context.utilities.strings.appName}</Text>
            <Text style = {context.utilities.styles.headerInfoTextStyle}>References</Text>
        </View>
        <View style = {context.utilities.styles.baseStyle1}>
            <Text style = {[context.utilities.styles.NewToAppTextStyle,{marginTop:10}]}>Upload your references</Text>
            <ScrollView>
            {
              this.state.totalData.map((data,index) => {
                return (
                  <View>
                    <View style = {context.utilities.styles.InputTextBoxStyle}>
                      <TextInput
                          style = {data.name === '' ? context.utilities.styles.InputTextDisableStyle : context.utilities.styles.InputTextEnableStyle}
                          placeholder = "Name of Reference"
                          onChangeText = {(text) => {
                            this.updateTextChange(index, text);
                          }}
                          returnKeyType= { "done" }
                          underlineColorAndroid='transparent'
                          placeholderTextColor={context.utilities.colors.hintColor}
                          textAlign={'center'}
                          value = {data.name}
                      />
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <TouchableOpacity onPress={() => {}}>
                        <Text style = {[context.utilities.styles.LoginButtonEnableTextStyle,{width:90,marginTop:5,borderRadius:10, height:50}]}>Scan</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {this.onUploadClick(data, index)}}>
                        <Text style = {[context.utilities.styles.LoginButtonEnableTextStyle,{width:90,marginTop:5, borderRadius:10, height:50}]}>Upload</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
            }
            </ScrollView>
        </View>
            <TouchableOpacity style = {{width:context.screenWidth}} onPress={ () => this.onAddClick()}>
              <Text style = {[context.utilities.styles.LoginButtonEnableTextStyle, {marginTop:30}]}>ADD REFERENCE</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{width:context.screenWidth}} onPress={ () => this.onNextClick()}>
              <Text style = {[context.utilities.styles.LoginButtonEnableTextStyle, {marginTop:10, marginBottom:30}]}>NEXT</Text>
            </TouchableOpacity>
     </View>
     )} 
     </AppConsumer>
   );
 }
}