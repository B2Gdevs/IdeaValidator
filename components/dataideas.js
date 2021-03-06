import React, {Component} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {DataItem} from './dataItem';

let textColor = "white";

/**
 * This component displays the list of ideas to choose from which provide the
 * data analytics of the feature.
 */
class DataIdeas extends Component {

  static navigationOptions = {
    title: 'Ideas',
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
      ideas: []
    }

    this.loadIdeas();
    
  }

  saveIdeas = () => {
    AsyncStorage.setItem("Ideas", JSON.stringify(this.state.ideas));
  }

  loadIdeas = () => {
    AsyncStorage.getItem("Ideas", (err, data) => {
      if (err){
        console.error('Error loading ideas', err);
      } else {
        let ideasList = JSON.parse(data);
        if(ideasList === null || ideasList === undefined){
          ideasList = [];
        }
        this.setState({ideas: ideasList});
      }
      
    });
  
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.ideaContainer}>
        <FlatList data={this.state.ideas} 
                  keyExtractor={(idea, index) => { return (idea.id)}}
                  renderItem={(idea) => (
          <TouchableOpacity  onPress={() => navigate("dataIdeaDetail", {"idea": idea})}>
            <DataItem item={idea}
                      removeItem={this.removeidea}
                      
              ></DataItem>
            </TouchableOpacity>
        )}>

        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ideaContainer:{
    flex: 1,
    backgroundColor: "#373737"
  }
})

export {DataIdeas};