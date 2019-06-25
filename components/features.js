import React, {Component} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {ListItem} from './listItem';
import {Footer} from './listscreenfooter';

let textColor = "white";

/**
 * This component displays the list of features to select from which
 * will then take the user to the feature detail.
 */
class Features extends Component {

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

  addFeature = (feature) => {
    if(feature.title !== ""){
      let arr = Array.from(this.state.features);
      arr.unshift(feature);
      this.setState({features: arr}, ()=>{
        this.saveFeatures();
      });
    } else {
      console.log(feature); 
    }
    
  }

  removeFeature = (feature) => {
    this.setState( {features: Array.from(this.state.features.filter((arrFeature) => {
      return arrFeature.id !== feature.id;
    }))}, () => {
      this.saveFeatures();
    });
    
  }

  updateFeature = (feature, note, selectionIndex) => {
    this.setState( {features: Array.from(this.state.features.filter((arrFeature) => {
      return arrFeature.id !== feature.id;
    }))}, () => {
      if(note !== '' && note !== null){
        feature.notes.push(note);
      }
      switch(selectionIndex){
        case 0: feature.notInterestedCount += 1;
                break;
        case 1: feature.interestedCount += 1;
                break;
        case 2: feature.veryInterestedCount += 1;
                break;
      }
      
      this.addFeature(feature);
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.featureContainer}>
        <FlatList data={this.state.features} 
                  keyExtractor={(feature, index) => { return (feature.id)}}
                  renderItem={(feature) => (
          <TouchableOpacity  onPress={() => navigate("featureDetail", {"feature": feature, "updateFeature": this.updateFeature})}>
            <ListItem item={feature}
                      removeItem={this.removeFeature}
                      
              ></ListItem>
            </TouchableOpacity>
        )}>

        </FlatList>
        <Footer addFeature={this.addFeature} pageId="features"></Footer>
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