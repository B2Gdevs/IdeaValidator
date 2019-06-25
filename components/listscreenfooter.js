import React, {Component} from 'react';
import {StyleSheet, View, Modal, TextInput, Button} from 'react-native';
import {Icon} from 'react-native-elements';
import uuid from 'uuid';
import {IdeaModal} from './ideaModal';
import {FeatureModal} from './featureModal';

/**
 * Footer is the component which allows the user to add features and ideas
 * to the features and ideas lists.
 */
class Footer extends Component {

  constructor(props){
    super(props);

    this.state = {
      modalVisible: false,
      ideaPage: false,
      featurePage: false
    };

    
  }

  componentWillMount(){
    this.checkPage(this.props.pageId);
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  checkPage = (string) =>{
    switch(string){
      case "ideas": this.setState({ideaPage: true});
                    break;
      case "features": this.setState({featurePage: true});
                       break;
    }
  }

  renderModal = () =>{
    if(this.state.ideaPage){
      return (<IdeaModal addItem={this.props.addIdea} setModalVisible={this.setModalVisible}></IdeaModal>)
    } else{
      return (<FeatureModal addItem={this.props.addFeature} setModalVisible={this.setModalVisible}></FeatureModal>)
    }
  }

  render() {
    return (
      <View style={styles.footer}>
        <Icon raised name="pluscircle"
              type="antdesign"
              color="#f50"
              iconStyle={styles.icon}
              onPress={() => this.setModalVisible(true)}></Icon>
        <Modal visible={this.state.modalVisible}
               onRequestClose={() => this.setModalVisible(false)}
               animationType="fade"
               presentationStyle="overFullScreen">

            {this.renderModal()}

        </Modal>
        
      </View>

    );
  }
}
const styles = StyleSheet.create({
  footer: {
    marginBottom: 15,
    backgroundColor: 'transparent',
    marginLeft: 5,
    position: 'absolute',
    bottom: 0
  },
  icon:{
    color: "#18D470"
  }
});

export {Footer};