import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, ListView} from 'react-native';
import {ListItem} from './listItem';
import {Footer} from './listscreenfooter';

class DataFeatures extends Component {
  static navigationOptions = {
    title: 'Features',
    headerStyle: {
      backgroundColor: "#18D470",
    },
    headerTitleStyle:{
      color: "white"
    },
  }

  constructor(props){
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      features: this.ds.cloneWithRows(props.navigation.state.params.features)
    }
  }
  render() {
    return (
      <View style={styles.featureContainer}>
        <ListView>
          {this.state.features.map((feature) => {
            return (<ListItem key={feature.id} item={feature}></ListItem>)
          })}
        </ListView>
        <Footer></Footer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  featureContainer:{
    flex: 1,
    backgroundColor: "#47494B"
  }
})

export {DataFeatures};