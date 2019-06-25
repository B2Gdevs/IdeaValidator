import React, {Component} from 'react';
import {StyleSheet, View, Text,
       TextInput, Keyboard,
       TouchableWithoutFeedback, KeyboardAvoidingView, Platform,
       ScrollView} from 'react-native';
import {ButtonGroup, Button} from 'react-native-elements';

//  Common variables.
let textColor = "white";

/**
 * DismissKeyboard is a functional component that is used to dismiss the 
 * keyboard whenever a user touches out of the keyboards view.
 */
const DismissKeyboard = ({ children }) =>{
  return(
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
  )
}

/**
 * FeatureDetail is the component that a user will see that displays more
 * information about a feature such as the description and then the user will
 * will collect data on that feature from this component.  
 */
class FeatureDetail extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerStyle: {
      backgroundColor: "#18D470",
      
    },
    headerTitleStyle:{
      color: textColor
    },
    headerTintColor: textColor
    
  })

  componentWillMount(){
    this.props.navigation.setParams({
      title: this.props.navigation.state.params.feature.item.title
    }
)
  }

  constructor(props){
    super(props);
    this.state = {
      feature: props.navigation.state.params.feature.item,
      selectedInterestIndex: 0,
      note: null,
      email: null
    }
  }

  // updates the index of the interest level the user has selected.
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
      <KeyboardAvoidingView  style={styles.flexOne}
        behavior={Platform.select({android: undefined, ios: "padding"})}
        enabled>
        {/* Scrollview is needed to see upper content when keyboard is present */}
        <ScrollView contentContainerStyle={styles.flexOne}  > 
          <DismissKeyboard>
            <View style={styles.container}>
              <Text style={styles.label}>Feature Title</Text>

              {/* Inputs */}
              <View style={styles.input}>
                <TextInput  style={styles.inputText} 
                            placeholder="Place Title Here"
                            returnKeyType="done"
                            placeholderTextColor="#717171"
                            onChangeText={(text) => {
                            this.setState({title: text});

                        }}
                          autoCapitalize="words">{this.state.feature.title}</TextInput>
              </View>
              <Text style={styles.label}>Feature Description</Text>
              <View style={styles.input}>
                <TextInput style={[styles.multiLine, styles.inputText]}
                            placeholder="Place Description Here"
                            returnKeyType="done"
                            blurOnSubmit={true}
                            placeholderTextColor="#717171"
                            multiline={true}
                            onChangeText={(text) => this.setState({description: text})}>{this.state.feature.description}</TextInput>
              </View>
              <ButtonGroup 
                buttons={["Not Interested", "Interested", "Very Interested"]}
                onPress={this.updateIndex}
                selectedIndex={this.state.selectedInterestIndex}
                buttonStyle={styles.interestedButtons}
                selectedButtonStyle={styles.selectedInterested}
                textStyle={styles.interestedText}
                containerStyle={styles.interestedContainer}
                innerBorderStyle={styles.interestedBorder}
              />
              <Text style={styles.label}>Note</Text>
              <View style={styles.input}>
                <TextInput style={[styles.multiLine, styles.inputText]}
                            placeholder="Example: Only interested in the feature if selfies are involved."
                            multiline={true}
                            returnKeyType="done"
                            blurOnSubmit={true}
                            placeholderTextColor="#717171"
                            onChangeText={(text) => {
                              this.setState({note: text});
                              }}></TextInput>
              </View>

              {/* Submitting and cancel buttons */}
              <View style={styles.horizontal}>
                <View style={styles.button}>
                  <Button buttonStyle={styles.feedBack}
                          title="Add Feedback"
                          color="#18D470"
                          onPress={() => {
                            let string = '';
                            if (this.state.note !== '' && this.state.note !== null)
                            {
                              string = this.getInterestString(this.state.selectedInterestIndex);
                              string = string.concat(this.state.note);
                              
                            }
                            this.props.navigation.state.params.updateFeature(this.state.feature, string, this.state.selectedInterestIndex);
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
    height: "100%"
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
    color: textColor
  },
  input:{
    borderWidth: 1,
    borderColor: "#c4c4c4",
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
  },
  inputText:{
    color: textColor,
    padding: 5
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
    marginTop: 25,
    marginBottom: 25,
    alignItems: "center",
    justifyContent:'center',
  },
  interestedContainer:{
    borderWidth: 0,
    marginTop: 25,
    marginLeft: 15,
    marginRight: 15
  },
  interestedBorder:{
    color: "#373737"
  },
  interestedButtons:{
    backgroundColor: "#717171"
  },
  selectedInterested:{
    backgroundColor: "#18D470"
  },
  flexOne:{
    flex:1
  },
  feedBack:{
    backgroundColor: "#18D470"
  },
  interestedText:{
    fontSize: Platform.OS === 'ios' ? 13 :15,
    color: textColor
  } 
});

export {FeatureDetail};