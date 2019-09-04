import React, {Component} from 'react';
import {Text,Picker, View,ScrollView,TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {AppConsumer} from '../../context/AppProvider'; 

export default class InfoSharingScreen extends Component {
 constructor(args) {
   super(args);
   this.state = {
      checked1:false,
      checked2:false,
      checked3:false,
      checked4:false,
      
    }
 }
 onAgreeClick(){
  
  var data =  {
    infoSharing:{
      checked1:this.state.checked1,
      checked2: this.state.checked2,
      checked3: this.state.checked3,
      checked4:this.state.checked4
  }};
  this.context.apiService.updateFirestoreUserData(this.context.currentUser.uid,data); 
  this.context.replaceScreen(this, this.context.utilities.strings.APP_SCREEN_NOTIFICATION); 
 }

 render() {
   return (
    <AppConsumer>
    {(context) => (
     <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
        <View style={{alignItems:'center', marginTop:10, width:context.screenWidth}}>
            <Text style = {context.utilities.styles.headerLogoTextStyle}>{context.utilities.strings.appName}</Text>
            <Text style = {context.utilities.styles.headerInfoTextStyle}>Information Sharing</Text>
        </View>
        <View style = {context.utilities.styles.baseStyle1}>
            <ScrollView style={context.utilities.styles.TNCFixBackgroundViewStyle}>
              <Text style = {context.utilities.styles.TNCTextStyle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumo. {'\n'}Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumo. {'\n'}Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</Text>
            </ScrollView>

          <CheckBox
              title='Personalised quotes &amp; Illustrations'
              checkedColor={context.utilities.colors.appColor}
              containerStyle = {context.utilities.styles.CheckBoxLeftContainerStyle}
              textStyle = {[context.utilities.styles.CheckBoxTextStyle]}
              checked={this.state.checked1}
              onPress={() => this.setState({checked1: !this.state.checked1})}
          />
          <CheckBox
              title='Personalised quotes &amp; Illustrations'
              checkedColor={context.utilities.colors.appColor}
              containerStyle = {context.utilities.styles.CheckBoxLeftContainerStyle}
              textStyle = {[context.utilities.styles.CheckBoxTextStyle]}
              checked={this.state.checked2}
              onPress={() => this.setState({checked2: !this.state.checked2})}
          />
          <CheckBox
              title='General quotes &amp; Illustrations'
              checkedColor={context.utilities.colors.appColor}
              containerStyle = {context.utilities.styles.CheckBoxLeftContainerStyle}
              textStyle = {[context.utilities.styles.CheckBoxTextStyle]}
              checked={this.state.checked3}
              onPress={() => this.setState({checked3: !this.state.checked3})}
          />
          <CheckBox
              title='General quotes &amp; Illustrations'
              checkedColor={context.utilities.colors.appColor}
              containerStyle = {context.utilities.styles.CheckBoxLeftContainerStyle}
              textStyle = {[context.utilities.styles.CheckBoxTextStyle]}
              checked={this.state.checked4}
              onPress={() => this.setState({checked4: !this.state.checked4})}
          />
          
            <TouchableOpacity style = {{width:context.screenWidth}} onPress={ () => this.onAgreeClick()}>
              <Text style = {[context.utilities.styles.LoginButtonEnableTextStyle, {marginTop:30,marginBottom:30}]}>NEXT</Text>
            </TouchableOpacity>

        </View>
     </View>
     )} 
     </AppConsumer>
   );
 }
}
