import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
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

    this.ideas = props.navigation.state.params.ideas;
  }
  

  render() {
    return (
      <View style={styles.ideaContainer}>
        <ScrollView>
          {this.ideas.map((idea) => {
            return (<ListItem item={idea} key={idea.id}></ListItem>)
          })}
          
        </ScrollView>
        <Footer></Footer>
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