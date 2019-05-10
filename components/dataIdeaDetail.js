import React, {Component} from 'react';
import {StyleSheet, View, Text,
       TextInput, Button, Keyboard,
       TouchableWithoutFeedback, KeyboardAvoidingView, Platform,
       ScrollView} from 'react-native';
import * as RNFS from 'react-native-fs';
import {join} from 'path';
import Mailer from 'react-native-mail';
import XLSX from 'xlsx';


//  Common variables.
let textColor = "white";
let fontSize = 25;

// Export Path
// let exportPath = join(RNFS.ExternalStorageDirectoryPath,"some_folder", "export.xlsx");


const DismissKeyboard = ({ children }) =>{
  return(
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
  )
}

class DataIdeaDetail extends Component {

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



  mail = () => {

    let body = "Emails:\n\n\n";

    this.state.idea.waitList.forEach(email => {
      body += `${email}\n\n`;
    });

    body += "Notes:\n\n\n";

    this.state.idea.notes.forEach(note => {
      body += `${note}\n\n`;
    });

    Mailer.mail({
      subject: `Idea: ${this.state.idea.title}`,
      body: body,
      isHTML: false,
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
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
              <Text style={styles.label}>Idea Title</Text>

              {/* Inputs */}
              <View style={styles.input}>
                <TextInput  style={styles.inputText} 
                            editable={false}
                            autoCapitalize="words">{this.state.idea.title}</TextInput>
              </View>

              <View style={styles.horizontal}>
                <View style={{marginLeft: 15}}>
                  <Text style={styles.notInterested}>Not Interested: </Text>
                  <Text style={styles.interested}>Interested: </Text>
                  <Text style={styles.veryInterested}>Very Interested: </Text>
                </View>
                <View style={{marginLeft: 15}}>
                  <Text style={styles.notInterested}>{this.state.idea.notInterestedCount}</Text>
                  <Text style={styles.interested}>{this.state.idea.interestedCount}</Text>
                  <Text style={styles.veryInterested}>{this.state.idea.veryInterestedCount}</Text>
                </View>
              </View>

              {/* Submitting and cancel buttons */}
              <View style={{justifyContent: "center", alignItems: "center"}}>
                <View style={styles.button}>
                  <Button title="Export Data"
                          color="#18D470"
                          onPress={() => {
                            // this.saveData();
                            this.mail();
                            // this.creatExcel()
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
    color: "yellow",
    fontSize: fontSize,
    marginTop: 5
  },
  notInterested:{
    color: "red",
    fontSize: fontSize,
    marginTop: 5
  },
  veryInterested:{
    color: "green",
    fontSize: fontSize,
    marginTop: 5
  }
});

export {DataIdeaDetail};