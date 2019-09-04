import React, {Component} from 'react';
import {Text, View,ScrollView,Image,TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {AppConsumer} from '../../context/AppProvider'; 
import Pdf from 'react-native-pdf';

export default class TermsConditionScreen extends Component {
 constructor(args) {
   super(args);
   this.state = {
    isTermsAccepted:false,
    }
 }

 componentDidMount(){
  if(this.context.userData && this.context.userData.isTermsAccepted){
   var termsData = this.context.userData.isTermsAccepted;
   this.setState({isTermsAccepted:termsData});
   this.setState({isDataAvailable:true});
  }
}
 
 onAgreeClick(){
  if(this.state.isTermsAccepted === false){
    this.context.showToast("Please accept terms &amp; conditions");
     return;
  }
  var data = {isTermsAccepted:this.state.isTermsAccepted};
  this.context.apiService.updateFirestoreUserData(this.context.currentUser.uid,data); 
  if(this.state.isDataAvailable){
    this.context.userData.isTermsAccepted = data.isTermsAccepted;
    this.context.goBack(this);
  } else {
    this.context.replaceScreen(this, this.context.utilities.strings.APP_SCREEN_EMP_CONTRACT);
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
              <Image source={require('../../images/back.png')} style={{width:30, height:30}} tintColor={context.utilities.colors.black} />
            </TouchableOpacity>
          }
          <View style={{alignItems:'center', flex:1}}>
              <Text style = {context.utilities.styles.headerLogoTextStyle}>{context.utilities.strings.appName}</Text>
              <Text style = {context.utilities.styles.headerInfoTextStyle}>Terms &amp; Conditions</Text>
          </View>
        </View>
        <View style = {context.utilities.styles.baseStyle1}>
            <ScrollView style={context.utilities.styles.TNCBackgroundViewStyle}>
              {/* <Pdf
                source={context.utilities.strings.FS_PDF_TNC}
                onLoadComplete={(numberOfPages,filePath)=>{
                  console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages)=>{
                  console.log(`current page: ${page}`);
                }}
                onError={(error)=>{
                  console.log(error);
                }}
                style={{flex:1, width:context.screenWidth}}/> */}
              <Text style = {context.utilities.styles.TNCTextStyle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumo. {'\n'}Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumo. {'\n'}Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</Text>
            </ScrollView>

            <CheckBox
                title='I agree to the Terms &amp; Conditions'
                checkedColor={context.utilities.colors.appColor}
                containerStyle = {context.utilities.styles.CheckBoxContainerStyle}
                textStyle = {[context.utilities.styles.NewToAppTextStyle,{marginTop:0}]}
                checked={this.state.isTermsAccepted}
                onPress={() => this.setState({isTermsAccepted: !this.state.isTermsAccepted})}
            />
          
            <TouchableOpacity style = {{width:context.screenWidth}} onPress={ () => this.onAgreeClick()}>
              <Text style = {[context.utilities.styles.LoginButtonEnableTextStyle, {margin:5, marginBottom:30}]}>NEXT</Text>
            </TouchableOpacity>

        </View>
      </View>
     )} 
     </AppConsumer> 
   );
 }
}
