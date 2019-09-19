import React, {Component} from 'react';
import {Text, View,ScrollView,Image, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {AppConsumer} from '../../../context/AppProvider'; 

export default class EmploymentContractScreen extends Component {
 constructor(args) {
   super(args);
   this.state = {
    isEmploymentAccepted:false,
    }
 }

  onAgreeClick(){
    if(this.state.isEmploymentAccepted === false){
      this.context.showToast("Please accept Employment Contract");
       return;
    }
    this.context.showLoading(true);
    var data = {isEmploymentAccepted:this.state.isEmploymentAccepted};
    this.context.apiService.updateFirestoreUserData(this.context.currentUser.uid,data); 
    this.context.updateUserData((user) => {
      this.context.showLoading(false);
      this.context.replaceScreen(this, this.context.currentScreen);
    });
  }

 render() {
   return (
    <AppConsumer>
    {(context) => (
     <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
        <View style={{marginTop:10, flexDirection:'row'}}>
          <View style={{alignItems:'center', flex:1}} >
            <Text style = {context.utilities.styles.headerLogoTextStyle}>{context.utilities.strings.appName}</Text>
            <Text style = {context.utilities.styles.headerInfoTextStyle}>Employment Contract</Text>
          </View>
        </View>  
        <View style = {context.utilities.styles.baseStyle1}>
            <ScrollView style={context.utilities.styles.TNCBackgroundViewStyle}>
              <Text style = {context.utilities.styles.TNCTextStyle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumo. {'\n'}Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumo. {'\n'}Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</Text>
            </ScrollView>

          <CheckBox
              title='I agree with the Employment Contract'
              checkedColor={context.utilities.colors.appColor}
              containerStyle = {context.utilities.styles.CheckBoxContainerStyle}
              textStyle = {[context.utilities.styles.NewToAppTextStyle,{marginTop:0}]}
              checked={this.state.isEmploymentAccepted}
              onPress={() => this.setState({isEmploymentAccepted: !this.state.isEmploymentAccepted})}
          />
            <TouchableOpacity style = {{width:context.screenWidth}} onPress={ () => this.onAgreeClick()}>
              <Text style = {[context.utilities.styles.LoginButtonEnableTextStyle, {margin:5,marginBottom:30}]}>NEXT</Text>
            </TouchableOpacity>

        </View>
     </View>
     )} 
     </AppConsumer>
   );
 }
}
