import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

class DataItem extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.item.item.title}</Text>
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

export {DataItem};