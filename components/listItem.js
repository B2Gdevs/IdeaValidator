import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

class ListItem extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.item.item.title}</Text>
        <Icon raised onPress={() => {this.props.removeItem(this.props.item.item)}} name="trash" type="font-awesome" color="#f50"></Icon>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.3,
    borderColor: "#18D470"
  },
  text: {
    color: "white",
    fontSize: 25
  }
});

export {ListItem};