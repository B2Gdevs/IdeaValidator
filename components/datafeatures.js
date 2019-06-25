import React, {Component} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {DataItem} from './dataItem';

let textColor = "white";

/**
 * This component displays the list of features to choose from which provide 
 * the data analytics of the feature.
 */
class DataFeatures extends Component {

  static navigationOptions = {
    title: 'Features',
    headerStyle: {
      backgroundColor: "#18D470",
    },
    headerTitleStyle:{
      color: "white"
    },
    headerTintColor: textColor
  }

  constructor(props){
    super(props);

    this.state = {
      features: []
    }

    this.loadFeatures();
    
  }

  saveFeatures = () => {
    AsyncStorage.setItem("Features", JSON.stringify(this.state.features));
  }

  loadFeatures = () => {
    AsyncStorage.getItem("Features", (err, data) => {
      if (err){
        console.error('Error loading features', err);
      } else {
        let featuresList = JSON.parse(data);
        if(featuresList === null || featuresList === undefined){
          featuresList = [];
        }
        this.setState({features: featuresList});
      }
      
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.featureContainer}>
        <FlatList data={this.state.features} 
                  keyExtractor={(feature, index) => { return (feature.id)}}
                  renderItem={(feature) => (
          <TouchableOpacity  onPress={() => navigate("dataFeatureDetail", {"feature": feature})}>
            <DataItem item={feature}
                      removeItem={this.removeFeature}
                      
              ></DataItem>
            </TouchableOpacity>
        )}>

        </FlatList>
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