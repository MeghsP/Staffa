import React, {Component} from 'react';
import {Text,View,ScrollView, Dimensions,TouchableOpacity} from 'react-native';
import Colors from '../../utils/res/Colors';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';
import {CheckBox} from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';
import ProgressView from '../../customViews/ProgressView';
import ApiService from '../../network/ApiService';

export default class NotificationsScreen extends Component {
 constructor(args) {
   super(args);
   apiService = new ApiService();
   let { width } = Dimensions.get("window");
   this.state = {
      screenWidth: width,
      checked1:false,
    }
 }
 componentWillMount = () => {
 }
 componentDidMount(){
 }

 onAgreeClick(){
  var data =  {
    notificationSettings:{
      isNotificationON:this.state.checked1,
  }};
  apiService.updateFirestoreData(data); 
  var {navigate} = this.props.navigation;
  navigate("BeginVerificationScreen");
 }

 render() {
   return (
     <View style={Styles.root}>
        <View style={{alignItems:'center', marginTop:10, width:this.state.screenWidth}}>
            <Text style = {Styles.headerLogoTextStyle}>{Strings.appName}</Text>
            <Text style = {Styles.headerInfoTextStyle}>Notifications</Text>
        </View>
        <View style = {Styles.baseStyle1}>
            <ScrollView style={[Styles.TNCFixBackgroundViewStyle, {height:100}]}>
              <Text style = {[Styles.TNCTextStyle,{fontSize:15}]}>{Strings.registerNotificationMsg}</Text>
            </ScrollView>

          <CheckBox
              title='Turn Notifications ON/OFF'
              checkedColor={Colors.appColor}
              containerStyle = {Styles.CheckBoxLeftContainerStyle}
              textStyle = {[Styles.CheckBoxTextStyle]}
              checked={this.state.checked1}
              onPress={() => { 
                this.setState({checked1: !this.state.checked1})
              }}
          />
          {/* <CheckBox
              title='Turn Notifications OFF'
              checkedColor={Colors.appColor}
              containerStyle = {Styles.CheckBoxLeftContainerStyle}
              textStyle = {[Styles.CheckBoxTextStyle]}
              checked={this.state.checked2}
              onPress={() => this.setState({checked2: !this.state.checked2})}
          /> */}
          
            <TouchableOpacity style = {{width:this.state.screenWidth}} onPress={ () => this.onAgreeClick()}>
              <Text style = {[Styles.LoginButtonEnableTextStyle, {marginTop:30, marginBottom:30}]}>NEXT</Text>
            </TouchableOpacity>

        </View>
        {this.state.isLoading && <ProgressView/> }
        <Toast ref="toast"/>
     </View>
   );
 }
}