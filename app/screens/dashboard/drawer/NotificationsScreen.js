import React, { Component } from 'react';
import { Text, View,FlatList, TouchableOpacity } from 'react-native';
import Header from '../../../utils/header';
import { AppConsumer } from '../../../context/AppProvider';

export default class NotificationsScreen extends Component {
  constructor(args) {
    super(args);
    this.state = {
      notifications: [],
    }
  }

  componentDidMount() {
    this.context.setCurrentContext(this);
    this.setState({notifications:this.context.userNotifications});
  }

  onBackPress = () => {
    this.context.goBack(this);
  }

  onItemClick(userID, item) {
    this.context.apiService.markNotificationAsRead(userID, item);
  }

  render() {
    const platformHeaderProps = {}
    platformHeaderProps['leftItem'] = {
      title: 'Menu',
      icon: require('../../../images/back.png'),
      layout: 'icon',
      onPress: this.onBackPress
    }
    return (
      <AppConsumer>
        {(context) => (
          <View style={context.utilities.styles.root} ref={(ref) => { this.context = context; }}>
            <Header title="Notifications" {...platformHeaderProps} />
            {this.state.notifications.length > 0 &&
              <FlatList
                extraData={this.state.notifications}
                data={this.state.notifications}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => {
                  return (
                    <View style={context.utilities.styles.ContactsRowStyle}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                          <View style={{ flex: 1 }}>
                            <Text style={context.utilities.styles.ContactsUserNameTextStyle}>{item.message}</Text>
                            <Text style={[context.utilities.styles.ContactsUserNameTextStyle, {fontSize: 12, color: "#939393" }]}>{context.apiService.getFormattedTime(item.time, context.utilities.strings.DISPLAY_TIME_FORMAT_1 )}</Text>
                          </View>
                            <TouchableOpacity onPress={() => {this.onItemClick(context.currentUser.uid, item)}}>
                              <Text style = {[context.utilities.styles.LoginButtonEnableTextStyle,{width:90,marginTop:5,borderRadius:10, height:30}]}>Mark as read</Text>
                            </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            }
            {this.state.notifications.length === 0 &&
              <View style={context.utilities.styles.CenterDataViewStyle}>
                <Text style={context.utilities.styles.NoDataTextStyle}>{context.utilities.strings.msgNoNotificationsFound}</Text>
              </View>
            }
          </View>
        )}
      </AppConsumer>
    );
  }
}