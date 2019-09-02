import React, {Component} from 'react';
import {Text,View,Dimensions,TouchableOpacity} from 'react-native';
import Colors from '../../utils/res/Colors';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';

export default class SuccessScreen extends Component {
 constructor(args) {
   super(args);
   let { width } = Dimensions.get("window");
   this.state = {
      screenWidth: width,
    }
 }
 componentWillMount = () => {
 }
 componentDidMount(){
 }

 onNextClick(){
  this.props.navigation.replace("HomeScreen")
 }


 render() {
   return (
     <View style={Styles.root}>
        <View style={{alignItems:'center', marginTop:10, width:this.state.screenWidth}}>
            <Text style = {Styles.headerLogoTextStyle}>{Strings.appName}</Text>
            <Text style = {Styles.headerInfoTextStyle}>You Are Done!</Text>
        </View>
        <View style = {Styles.baseStyle1}>
            <Text style = {[Styles.NewToAppTextStyle,{fontSize:13,fontStyle:'bold', color:Colors.appColor}]}>SUCCESS{"\n"}You can now post your profile and apply for shifts.</Text>
        </View>
            <TouchableOpacity style = {{width:this.state.screenWidth}} onPress={ () => this.onNextClick()}>
              <Text style = {[Styles.LoginButtonEnableTextStyle, {marginTop:10, marginBottom:30}]}>DONE</Text>
            </TouchableOpacity>
     </View>
   );
 }
}