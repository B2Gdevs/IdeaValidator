import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {ListItem} from './listItem';
import {Footer} from './listscreenfooter';

class Features extends Component {
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

    this.features = props.navigation.state.params.features;
  }

  addFeature = (feature) => {
    this.setState({features: [...this.state.features, features]})
  }
  
  render() {
    return (
      <View style={styles.featureContainer}>
        <ScrollView>
          {this.features.map((feature) => {
            return (<ListItem key={feature.id} item={feature}></ListItem>)
          })}
        </ScrollView>
        <Footer addFeature={this.addFeature}></Footer>
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

export {Features};