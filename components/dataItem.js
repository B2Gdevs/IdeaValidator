import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

/**
 * DataItem is similar to the ListItem component, but without a way to delete
 * an item.  That action is handled at where the features or ideas are created.
 */
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