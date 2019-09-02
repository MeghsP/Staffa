import React, {Component} from 'react';
import { Text, View,ScrollView, Dimensions,TouchableOpacity} from 'react-native';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';

type Props = {};
export default class BeginVerificationScreen extends Component {
 constructor(args) {
   super(args);
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
  var {navigate} = this.props.navigation;
  navigate("VerificationScreen");
 }

 render() {
   return (
     <View style={Styles.root}>
        <View style={{alignItems:'center', marginTop:10, width:this.state.screenWidth}}>
            <Text style = {Styles.headerLogoTextStyle}>{Strings.appName}</Text>
            <Text style = {Styles.headerInfoTextStyle}>Verification</Text>
        </View>
        <View style = {Styles.baseStyle1}>
            <ScrollView style={[Styles.TNCFixBackgroundViewStyle,{height:100}]}>
              <Text style = {[Styles.TNCTextStyle,{fontSize:15}]}>{Strings.registerVerificationMsg}</Text>
            </ScrollView>

          
            <TouchableOpacity style = {{width:this.state.screenWidth}} onPress={ () => this.onAgreeClick()}>
              <Text style = {[Styles.LoginButtonEnableTextStyle, {marginTop:30, marginBottom:30}]}>Begin ID Process</Text>
            </TouchableOpacity>

        </View>
     </View>
   );
 }
}
