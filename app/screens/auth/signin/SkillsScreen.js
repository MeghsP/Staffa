import React, {Component} from 'react';
import {Text,View,ScrollView,Image, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {AppConsumer} from '../../../context/AppProvider'; 

export default class SkillsScreen extends Component {
 constructor(args) {
   super(args);
   this.state = {
      data:[{id:1,name:'General Nursing - Accept any work', checked:false},
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
 
 componentDidMount(){
  if(this.context.userData && this.context.userData.skills){
   var data = this.context.userData.skills;
   this.setState(data);
   this.setState({isDataAvailable:true});
  }
}

 onNextClick(){
  var data =  {
    skills:{
      data:this.state.data
  }};
  this.context.apiService.updateFirestoreUserData(this.context.currentUser.uid,data); 
  this.context.updateUserData();
  if(this.state.isDataAvailable){
    // this.context.userData.skills = data.skills;
    this.context.goBack(this);
  } else {
    this.context.replaceScreen(this, this.context.utilities.strings.APP_SCREEN_BIO); 
  }  
 }
 
 onCheck(index){
  var joined = this.state.data;
  if(joined[index].checked){
    joined[index].checked = false;
  } else {
    joined[index].checked = true;
  }
  this.setState({ data: joined })
 }

 render() {
   return (
    <AppConsumer>
    {(context) => (
     <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
        <View style={{marginTop:10, flexDirection:'row'}}>
          {this.state.isDataAvailable && 
            <TouchableOpacity style={{position:'absolute', marginLeft:10}} onPress={() => context.goBack(this)}>
              <Image source={require('../../../images/back.png')} style={{width:30, height:30}} tintColor={context.utilities.colors.black} />
            </TouchableOpacity>
          }
          <View style={{alignItems:'center', flex:1}} >
            <Text style = {context.utilities.styles.headerLogoTextStyle}>{context.utilities.strings.appName}</Text>
            <Text style = {context.utilities.styles.headerInfoTextStyle}>Your Skills</Text>
          </View>
        </View>
        <View style = {context.utilities.styles.baseStyle1}>
            <Text style = {[context.utilities.styles.NewToAppTextStyle,{marginTop:10,marginLeft:40, marginRight:40}]}>Tick the boxes for the work you are qualified to perform{"\n"}{"\n"}NOTE: Your qualifications must match your selections</Text>
            <ScrollView>
            {
              this.state.data.map((data, index) => {
                return (
                  <View>
                    <CheckBox
                      title={data.name}
                      checkedColor={context.utilities.colors.appColor}
                      containerStyle = {context.utilities.styles.CheckBoxLeftContainerStyle}
                      textStyle = {[context.utilities.styles.CheckBoxTextStyle]}
                      checked={data.checked}
                      onPress={() => {this.onCheck(index)}}
                    />
                  </View>
                )
              })
            }
            </ScrollView>
        </View>
            <TouchableOpacity style = {{width:context.screenWidth}} onPress={ () => this.onNextClick()}>
              <Text style = {[context.utilities.styles.LoginButtonEnableTextStyle, {marginTop:10, marginBottom:30}]}>{this.state.isDataAvailable ? 'UPDATE' :  "NEXT"}</Text>
            </TouchableOpacity>
     </View>
     )} 
     </AppConsumer>
   );
 }
}
