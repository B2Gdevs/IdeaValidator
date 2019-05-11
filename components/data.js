import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

let textColor = "white";

class Data extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Data",
    headerStyle: {
      backgroundColor: "#18D470",
      
    },
    headerTitleStyle:{
      color: textColor
    }
  })

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={[styles.container, styles.horizontal]}>
        <View style={styles.features}>
          <TouchableOpacity onPress={() => navigate("dataFeatures")} style={[styles.rounded, styles.roundedFeatures]}>
            <Text style={[styles.roundedText, styles.featuresText]}>Features</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ideasEvents} >
          <TouchableOpacity onPress={() => navigate("dataIdeas")} style={[styles.rounded, styles.roundedIdeas]}>
            <Text style={[styles.roundedText, styles.ideasText]}>Ideas and Events</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  horizontal: {
    flexDirection: "row",
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

export {Data};