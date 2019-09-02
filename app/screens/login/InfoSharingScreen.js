import React, {Component} from 'react';
import {Text,Picker, View,ScrollView,Dimensions,TouchableOpacity} from 'react-native';
import Colors from '../../utils/res/Colors';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';
import {CheckBox} from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';
import ProgressView from '../../customViews/ProgressView';
import ApiService from '../../network/ApiService';

type Props = {};
export default class InfoSharingScreen extends Component {
 constructor(args) {
   super(args);
   apiService = new ApiService();
   let { width } = Dimensions.get("window");
   this.state = {
      screenWidth: width,
      checked1:false,
      checked2:false,
      checked3:false,
      checked4:false,
      
    }
 }
 componentWillMount = () => {
 }
 componentDidMount(){
 }

 onAgreeClick(){
  // if(this.state.checked === false){
  //   this.refs.toast.show("Please accept Privacy &amp; GDPR");
  //    return;
  // }
  var data =  {
    infoSharing:{
      checked1:this.state.checked1,
      checked2: this.state.checked2,
      checked3: this.state.checked3,
      checked4:this.state.checked4
  }};
  apiService.updateFirestoreData(data); 
  var {navigate} = this.props.navigation;
  navigate("NotificationsScreen");
 }

 render() {
   return (
     <View style={Styles.root}>
        <View style={{alignItems:'center', marginTop:10, width:this.state.screenWidth}}>
            <Text style = {Styles.headerLogoTextStyle}>{Strings.appName}</Text>
            <Text style = {Styles.headerInfoTextStyle}>Information Sharing</Text>
        </View>
        <View style = {Styles.baseStyle1}>
            <ScrollView style={Styles.TNCFixBackgroundViewStyle}>
              <Text style = {Styles.TNCTextStyle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumo. {'\n'}Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumo. {'\n'}Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</Text>
            </ScrollView>

          <CheckBox
              title='Personalised quotes &amp; Illustrations'
              checkedColor={Colors.appColor}
              containerStyle = {Styles.CheckBoxLeftContainerStyle}
              textStyle = {[Styles.CheckBoxTextStyle]}
              checked={this.state.checked1}
              onPress={() => this.setState({checked1: !this.state.checked1})}
          />
          <CheckBox
              title='Personalised quotes &amp; Illustrations'
              checkedColor={Colors.appColor}
              containerStyle = {Styles.CheckBoxLeftContainerStyle}
              textStyle = {[Styles.CheckBoxTextStyle]}
              checked={this.state.checked2}
              onPress={() => this.setState({checked2: !this.state.checked2})}
          />
          <CheckBox
              title='General quotes &amp; Illustrations'
              checkedColor={Colors.appColor}
              containerStyle = {Styles.CheckBoxLeftContainerStyle}
              textStyle = {[Styles.CheckBoxTextStyle]}
              checked={this.state.checked3}
              onPress={() => this.setState({checked3: !this.state.checked3})}
          />
          <CheckBox
              title='General quotes &amp; Illustrations'
              checkedColor={Colors.appColor}
              containerStyle = {Styles.CheckBoxLeftContainerStyle}
              textStyle = {[Styles.CheckBoxTextStyle]}
              checked={this.state.checked4}
              onPress={() => this.setState({checked4: !this.state.checked4})}
          />
          
            <TouchableOpacity style = {{width:this.state.screenWidth}} onPress={ () => this.onAgreeClick()}>
              <Text style = {[Styles.LoginButtonEnableTextStyle, {marginTop:30,marginBottom:30}]}>NEXT</Text>
            </TouchableOpacity>

        </View>
        {this.state.isLoading && <ProgressView/> }
        <Toast ref="toast"/>
     </View>
   );
 }
}
