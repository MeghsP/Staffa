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
class SkillsScreen extends Component {
 constructor(args) {
   super(args);
   let { width } = Dimensions.get("window");
   apiService = new ApiService();
   this.state = {
      screenWidth: width,
      totalData:[{id:1,name:'General Nursing - Accept any work', checked:false},
                  {id:2,name:'Paediatrics', checked:false},
                  {id:3,name:'Psychiatric', checked:false},
                  {id:4,name:'Palliative', checked:false},
                  {id:5,name:'Bariatric', checked:false},
                  {id:6,name:'Urology', checked:false},
                  {id:7,name:'Theatre/Recovery', checked:false},
                  {id:8,name:'Gynaecology', checked:false},
                  {id:9,name:'Medical', checked:false},
                  {id:10,name:'Surgical', checked:false},
                  {id:11,name:'Emergency A&amp;E', checked:false},
                  {id:12,name:'Maternity', checked:false},
                  {id:13,name:'Orthopaedics', checked:false},
                  {id:14,name:'Geriatric', checked:false},
                  {id:15,name:'Oncology', checked:false},
                  {id:16,name:'Burns', checked:false},
                ],
    }
 }
 componentWillMount = () => {
 }
 componentDidMount(){
 }

 onNextClick(){
  var data =  {
    skills:{
      data:this.state.totalData
  }};
  apiService.updateFirestoreData(data);
  var {navigate} = this.props.navigation;
  navigate("BioScreen");
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
            <Text style = {Styles.headerInfoTextStyle}>Your Skills</Text>
        </View>
        <View style = {Styles.baseStyle1}>
            <Text style = {[Styles.NewToAppTextStyle,{marginTop:10,marginLeft:40, marginRight:40}]}>Tick the boxes for the work you are qualified to perform{"\n"}{"\n"}NOTE: Your qualifications must match your selections</Text>
            <ScrollView>
            {
              this.state.totalData.map((data, index) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(SkillsScreen)
