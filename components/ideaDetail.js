import React, {Component} from 'react';
import {StyleSheet, View, Text,
       TextInput, Button, Keyboard,
       TouchableWithoutFeedback, KeyboardAvoidingView, Platform,
       ScrollView} from 'react-native';
import {ButtonGroup} from 'react-native-elements';

//  Common variables.
let textColor = "white";

const DismissKeyboard = ({ children }) =>{
  return(
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
  )
}
class IdeaDetail extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerStyle: {
      backgroundColor: "#18D470",
      
    },
    headerTitleStyle:{
      color: textColor
    }
    
  })

  componentWillMount(){
    this.props.navigation.setParams({
      title: this.props.navigation.state.params.idea.item.title
    }
)
  }

  constructor(props){
    super(props);
    this.state = {
      idea: props.navigation.state.params.idea.item,
      selectedInterestIndex: 0,
      note: null,
      email: null
    }
  }

  updateIndex = (selectedIndex) => {
    this.setState({selectedInterestIndex: selectedIndex});
  }

  getInterestString = (selectedIndex) => {
    switch(selectedIndex){
      case 0: return ("Rating: Not Interested.\n");
      case 1: return ("Rating: Interested.\n");
      case 2: return ("Rating: Very Interested.\n");
    }
  }


  render () {
    return(
      <KeyboardAvoidingView  
        behavior={Platform.select({android: undefined, ios: "padding"})}
        enabled>
        {/* Scrollview is needed to see upper content when keyboard is present */}
        <ScrollView> 
          <DismissKeyboard>
            <View style={styles.container}>
            <Text style={styles.label}>Idea Title</Text>

            {/* Inputs */}
            <View style={styles.input}>
              <TextInput  style={styles.inputText} 
                          placeholder="Place Title Here"
                          returnKeyType="done"
                          placeholderTextColor="#717171"
                          onChangeText={(text) => {
                          this.setState({title: text});

                      }}
                        autoCapitalize="words">{this.state.idea.title}</TextInput>
            </View>
            <Text style={styles.label}>Idea Description</Text>
            <View style={styles.input}>
              <TextInput style={[styles.multiLine, styles.inputText]}
                          placeholder="Place Description Here"
                          returnKeyType="done"
                          placeholderTextColor="#717171"
                          multiline={true}
                          onChangeText={(text) => this.setState({description: text})}>{this.state.idea.description}</TextInput>
            </View>
            <ButtonGroup 
              buttons={["Not Interested", "Interested", "Very Interested"]}
              onPress={this.updateIndex}
              selectedIndex={this.state.selectedInterestIndex}
              buttonStyle={styles.interestedButtons}
              selectedButtonStyle={styles.selectedInterested}
              textStyle={{color: textColor}}
              containerStyle={styles.interestedContainer}
              innerBorderStyle={styles.interestedBorder}
            />
            <Text style={styles.label}>Note</Text>
            <View style={styles.input}>
              <TextInput style={[styles.multiLine, styles.inputText]}
                          placeholder="Example: Only interested in the idea if selfies are involved."
                          multiline={true}
                          returnKeyType="done"
                          placeholderTextColor="#717171"
                          onChangeText={(text) => {
                            this.setState({note: text});
                            }}></TextInput>
            </View>
            
            <Text style={styles.label}>Email for WaitList</Text>
            <View style={styles.input}>
              <TextInput  style={styles.inputText} 
                          placeholder="Place Email Here"
                          placeholderTextColor="#717171"
                          onSubmitEditing={Keyboard.dismiss}
                          returnKeyType="done"
                          onChangeText={(text) => {
                          this.setState({email: text});
                      }}
                        autoCapitalize="words"></TextInput>
            </View>

            {/* Submitting and cancel buttons */}
            <View style={styles.horizontal}>
              <View style={styles.button}>
                <Button title="Add Feedback"
                        color="#18D470"
                        onPress={() => {
                          let string = this.getInterestString(this.state.selectedInterestIndex);
                          string = string.concat(this.state.note);
                          this.props.navigation.state.params.updateIdea(this.state.idea, string, this.state.email);
                          this.props.navigation.goBack();
                        }}
                ></Button>
              </View>
            </View>
          </View>
          </DismissKeyboard>
        </ScrollView>
      </KeyboardAvoidingView>
      
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#373737",
  },
  header:{
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#18D470",
    textAlign: "center",
    color: textColor,
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
    borderRadius: 5,
  },
  inputText:{
    color: textColor
  },
  button:{
    width:"70%"
  },
  multiLine:{
    height: 125,
    textAlignVertical: 'top'
  },
  horizontal:{
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
    justifyContent:'center',
  },
  interestedContainer:{
    borderWidth: 0,
    marginTop: 15
  },
  interestedBorder:{
    color: "#373737"
  },
  interestedButtons:{
    backgroundColor: "#717171"
  },
  selectedInterested:{
    backgroundColor: "#18D470"
  }
});

export {IdeaDetail};