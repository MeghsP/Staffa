import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Picker, View,TextInput,ScrollView, Image,Dimensions,TouchableOpacity,Button} from 'react-native';
import Colors from '../../utils/res/Colors';
import Styles from '../../utils/res/Styles';
import Strings from '../../utils/res/Strings';
import { Provider,connect } from  'react-redux';
import {CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Toast, {DURATION} from 'react-native-easy-toast';
import ProgressView from '../../customViews/ProgressView';
import ApiService from '../../network/ApiService';

type Props = {};
class CertificateScreen extends Component {
 constructor(args) {
   super(args);
   let { width } = Dimensions.get("window");
   apiService = new ApiService();
   this.state = {
      screenWidth: width,
      totalData:[{id:1,name:'Moving &amp; Handling', checked:false},
                  {id:2,name:'Healthy &amp; Safety', checked:false},
                  {id:3,name:'infection Control', checked:false},
                  {id:4,name:'Medication Administration', checked:false},
                  {id:5,name:'Safeguarding of vulnearble adults', checked:false},
                  {id:6,name:'Life Support', checked:false},
                  {id:7,name:'First Aid', checked:false},
                  {id:8,name:'Equality &amp; Diversity', checked:false},
                  {id:9,name:'Fire Safety', checked:false},
                  {id:10,name:'Information Governance', checked:false},
                  {id:11,name:'Preventing Redicalisation', checked:false},
                  {id:12,name:'Food Hygiene', checked:false},
                ],
    }
 }
 componentWillMount = () => {
 }
 componentDidMount(){
 }

 onNextClick(){
  var data =  {
    cartificates:{
      data:this.state.totalData
  }};
  apiService.updateFirestoreData(data);
  var {navigate} = this.props.navigation;
  navigate("ReferencesScreen");
 }
 onCheck(data, index){
  var joined = this.state.totalData;
  if(joined[index].checked){
    joined[index].checked = false;
  } else {
    joined[index].checked = true;
  }
  
  this.setState({ totalData: joined })
 }

 render() {
   return (
     <View style={Styles.root}>
        <View style={{alignItems:'center', marginTop:10, width:this.state.screenWidth}}>
            <Text style = {Styles.headerLogoTextStyle}>{Strings.appName}</Text>
            <Text style = {Styles.headerInfoTextStyle}>Your Certificates</Text>
        </View>
        <View style = {Styles.baseStyle1}>
            <Text style = {[Styles.NewToAppTextStyle,{marginTop:10,marginLeft:40, marginRight:40}]}>Please tick to confirm that you have the following up to date certifications</Text>
            <ScrollView>
            {
              this.state.totalData.map((data,index) => {
                return (
                  <View>
                    <CheckBox
                      title={data.name}
                      checkedColor={Colors.appColor}
                      containerStyle = {Styles.CheckBoxLeftContainerStyle}
                      textStyle = {[Styles.CheckBoxTextStyle]}
                      checked={data.checked}
                      onPress={() => {this.onCheck(data, index)}}
                    />
                  </View>
                )
              })
            }
            </ScrollView>
        </View>
        <Text style = {[Styles.NewToAppTextStyle,{marginTop:20, color:Colors.red}]}>Click on the title to upload of scan your certificate</Text>
            <TouchableOpacity style = {{width:this.state.screenWidth}} onPress={ () => this.onNextClick()}>
              <Text style = {[Styles.LoginButtonEnableTextStyle, {marginTop:10, marginBottom:30}]}>NEXT</Text>
            </TouchableOpacity>
            {this.state.isLoading && <ProgressView/> }
            <Toast ref="toast"/>    
     </View>
   );
 }
}

const mapStateToProps = state => {
  return {
    // places: state.places.places
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // add: (name) => {
    //   dispatch(addPlace(name))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CertificateScreen)
