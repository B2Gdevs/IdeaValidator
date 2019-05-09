/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {Ideas} from './components/ideas';
import {Features} from './components/features';
import {Data} from './components/data';
import {IdeaDetail} from './components/ideaDetail';
import {FeatureDetail} from './components/featureDetail';
// import {Ideas} from './components/dataideas';
import {DataFeatures} from './components/datafeatures';
import {DataFeatureDetail} from './components/dataFeatureDetail';

class Home extends Component {

  constructor(props){
    super(props);
    features = []

    for(let i=0; i < 10;i++){
      features.push(
        {
          id: i,
          title: "default",
          description: "",
          notInterestedCount: 0,
          interestedCount: 0,
          veryInterestedCount: 0,
          note: "Default Note",
        }
      )
    }
    this.state = 
    {
      features: features
    }
  };
  
  static navigationOptions = {
    title: 'Idea Validator',
    headerStyle: {
      backgroundColor: "#18D470",
    },
    headerTitleStyle:{
      color: "white"
    },


  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.horizontal}>
          <View style={styles.features}>
            <TouchableOpacity onPress={() => navigate("Features", {"features": this.state.features})} style={[styles.rounded, styles.roundedFeatures]}>
              <Text style={[styles.roundedText, styles.featuresText]}>Features</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ideasEvents} >
            <TouchableOpacity onPress={() => navigate("Ideas")} style={[styles.rounded, styles.roundedIdeas]}>
              <Text style={[styles.roundedText, styles.ideasText]}>Ideas and Events</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.vertical}>
          <TouchableOpacity onPress={() => navigate("Data")} style={[styles.rounded, styles.roundedData]}>
            <Text style={[styles.roundedText, styles.dataText]}>Data</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}
import { from } from 'rxjs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  horizontal: {
    flexDirection: "row",
    height: "70%"
  },
  vertical:{
    height: "30%",
    flexDirection: "column",
    backgroundColor: "#717171",
    justifyContent: 'center',
    alignItems: 'center',
  },
  ideasEvents:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#373737"
  },
  features: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#47494B"
  },
  roundedText:{
    textAlign: "center",
    color: "#fff"
  },
  dataText: {
    fontSize: 20
  },
  rounded:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#18C6D4',
    borderRadius:50,
  },
  roundedIdeas:{
    backgroundColor: '#18C6D4'
  },
  roundedFeatures:{
    backgroundColor: '#18D470'
  },
  roundedData:{
    backgroundColor: "#FFA800"
  }

});

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Ideas: {screen: Ideas},
  Features: {screen: Features},
  Data: {screen: Data},
  dataFeatures: {screen: DataFeatures},
  ideaDetail: {screen: IdeaDetail},
  featureDetail: {screen: FeatureDetail},
  dataFeatureDetail: {screen: DataFeatureDetail}
},
{
  headerLayoutPreset: 'center'
});

const App = createAppContainer(MainNavigator);

export default App;
