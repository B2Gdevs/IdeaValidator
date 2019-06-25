import React, {Component} from 'react';
import {View, TextInput, Text, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import uuid from 'uuid';
import {Button} from 'react-native-elements';

let textColor = "white";

/**
 * DismissKeyboard is a functional component that is used to dismiss the 
 * keyboard whenever a user touches out of the keyboards view.
 */
const DismissKeyboard = ({ children }) =>{
  return(
  <TouchableWithoutFeedback style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
  )
}

/**
 * The pop up modal that is used to create a new feature.
 */
class FeatureModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: uuid.v4(),
      title: "",
      description: "",
      notInterestedCount: 0,
      interestedCount: 0,
      veryInterestedCount: 0,
      notes: [],
    }
  }

  resetState = () =>{
    this.state = {
      id: uuid.v4(),
      title: "",
      description: "",
      notInterestedCount: 0,
      interestedCount: 0,
      veryInterestedCount: 0,
      notes: [],
    }
  }

  render() {
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <Text style={styles.header}>Add a Feature</Text>
          <Text style={styles.label}>Feature Title</Text>
          <View style={styles.input}>
            <TextInput 
                      style={styles.inputText}
                      placeholder="Place Title Here"
                      placeholderTextColor="#848383"
                      
                      onChangeText={(text) => {
                        this.setState({title: text});

                      }}
                    autoCapitalize="words"></TextInput>
          </View>
          <Text style={styles.label}>Feature Description</Text>
          <View style={styles.input}>
            <TextInput 
                      style={[styles.multiLine, styles.inputText]}
                      placeholder="Place Description Here"
                      placeholderTextColor="#848383"
                      multiline={true}
                      blurOnSubmit={true}
                      onChangeText={(text) => this.setState({description: text})}></TextInput>
          </View>
          <View style={styles.horizontal}>
            <View style={styles.button}>
              <Button title="Add"
                      buttonStyle={{backgroundColor: "#18D470"}}
                      onPress={() => {
                        this.props.addItem(this.state);
                        this.resetState();
                        this.props.setModalVisible(false);
                      }}></Button>
            </View>
            <View style={styles.button}>
              <Button title="Cancel"
                      buttonStyle={{backgroundColor: "#C82333"}}
                      onPress={() => {
                        this.resetState();
                        this.props.setModalVisible(false);
                      }}
                      ></Button>
            </View>
          </View>
        </View>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#47494B"
  },
  header:{
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#18D470",
    textAlign: "center",
    color: "white",
    paddingTop: 10,
    paddingBottom: 10
  },
  label:{
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 25,
    marginLeft: 15,
    marginRight: 15,
    marginBottom:5,
    color: textColor
  },
  input:{
    borderWidth: 1,
    borderColor: "#c4c4c4",
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    borderRadius: 5
  },
  inputText:{
    color: textColor
  },
  button:{
    flex:3,
  },
  multiLine:{
    height: 125,
    textAlignVertical: 'top'
  },
  horizontal:{
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent:'center',
  }
});

export {FeatureModal};