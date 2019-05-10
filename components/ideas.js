import React, {Component} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {ListItem} from './listItem';
import {Footer} from './listscreenfooter';

class Ideas extends Component {

  static navigationOptions = {
    title: 'Ideas and Events',
    headerStyle: {
      backgroundColor: "#18D470",
    },
    headerTitleStyle:{
      color: "white"
    },
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

  addIdea = (idea) => {
    if(idea.title !== ""){
      let arr = Array.from(this.state.ideas);
      arr.unshift(idea);
      this.setState({ideas: arr}, ()=>{
        this.saveIdeas();
      });
    } else {
      console.log(idea);
    }
    
  }

  removeIdea = (idea) => {
    this.setState( {ideas: Array.from(this.state.ideas.filter((arridea) => {
      return arridea.id !== idea.id;
    }))}, () => {
      this.saveIdeas();
    });
    
  }

  updateIdea = (idea, note, email, selectedIndex) => {
    this.setState( {ideas: Array.from(this.state.ideas.filter((arridea) => {
      return arridea.id !== idea.id;
    }))}, () => {
      if(note !== '' && note !== null){
        idea.notes.push(note);
      }
      if(email !== '' && email !== null){
        idea.waitList.push(email);
      }

      switch(selectedIndex){
        case 0: idea.notInterestedCount += 1;
                break;
        case 1: idea.interestedCount += 1;
                break;
        case 2: idea.veryInterestedCount += 1;
                break;
      }

      this.addIdea(idea);
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.ideaContainer}>
        <FlatList data={this.state.ideas} 
                  keyExtractor={(idea, index) => { return (idea.id)}}
                  renderItem={(idea) => (
          <TouchableOpacity  onPress={() => navigate("ideaDetail", {"idea": idea, "updateIdea": this.updateIdea})}>
            <ListItem item={idea}
                      removeItem={this.removeIdea}
                      
              ></ListItem>
            </TouchableOpacity>
        )}>

        </FlatList>
        <Footer addIdea={this.addIdea} pageId="ideas"></Footer>
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

export {Ideas};