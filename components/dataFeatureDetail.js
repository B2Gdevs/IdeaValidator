import React, {Component} from 'react';
import {StyleSheet, View, Text,
       TextInput, Keyboard,
       TouchableWithoutFeedback, KeyboardAvoidingView, Platform,
       ScrollView, Alert} from 'react-native';

import {Button} from 'react-native-elements';
import Mailer from 'react-native-mail';

//  Common variables.
let textColor = "white";
let fontSize = 25;


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
 * DataFeatureDetail is the component that a user will see that displays more
 * information about a feature in the context of data analysis.  It is what 
 * pops up when a user selects a list item from the listview. The feedback
 * data like notes will need to be exported via email.
 */
class DataFeatureDetail extends Component {

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
    })
}

  constructor(props){
    super(props);
    this.state = {
      feature: props.navigation.state.params.feature.item,
      note: null,
      email: null
    }
  }

  /**
   * mail will open the users defualt mail app and compose a message with
   * the data as the body of the message.
   */
  mail = () => {

    let body = "Notes:\n\n\n";

    this.state.feature.notes.forEach(note => {
      body += `${note}\n\n`;
    });


    Mailer.mail({
      subject: `Feature: ${this.state.feature.title}`,
      body: body,
      isHTML: false,
    }, (error, event) => {
      if(error)
        console.log(error);
      else
        console.log(event);
    });
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
                            editable={false}
                            autoCapitalize="words">{this.state.feature.title}</TextInput>
              </View>

              <View style={styles.horizontal}>
                <View style={{marginLeft: 15}}>
                  <Text style={styles.notInterested}>Not Interested: </Text>
                  <Text style={styles.interested}>Interested: </Text>
                  <Text style={styles.veryInterested}>Very Interested: </Text>
                  <Text style={styles.notes}>Note Count: </Text>
                </View>
                <View style={{marginLeft: 15}}>
                  <Text style={styles.notInterested}>{this.state.feature.notInterestedCount}</Text>
                  <Text style={styles.interested}>{this.state.feature.interestedCount}</Text>
                  <Text style={styles.veryInterested}>{this.state.feature.veryInterestedCount}</Text>
                  <Text style={styles.notes}>{this.state.feature.notes.length}</Text>
                </View>
              </View>

              {/* Submitting and cancel buttons */}
              <View style={{justifyContent: "center", alignItems: "center"}}>
                <View style={styles.button}>
                  <Button title="Export Data"
                          buttonStyle={{backgroundColor:"#18D470"}}
                          onPress={() => {
                            Alert.alert(
                              "Export Notes to Email",
                              `This will create a list of notes in the body of an email.  Continue?`,
                              [
                                {text: "Yes",
                                 onPress: () => {this.mail()}},
                                {text: "No",
                                onPress: () => {}}
                              ]
                            )
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
    padding: 5,
    textAlign: "center",
    fontSize: 20
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
  },
  interestedContainer:{
    borderWidth: 0,
    marginTop: 25
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
  interested:{
    color: "#12EAEA",
    fontSize: fontSize,
    marginTop: 5
  },
  notInterested:{
    color: "#AF3B6E",
    fontSize: fontSize,
    marginTop: 5
  },
  veryInterested:{
    color: "#18D470",
    fontSize: fontSize,
    marginTop: 5
  },
  notes:{
    color: "#D3BCC0",
    fontSize: fontSize,
    marginTop: 5
  }
});

export {DataFeatureDetail};