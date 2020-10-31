 import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      modalVisible: false,
      firstname: '',
      lastname: '',
      address: '',
      contact: '',
      confirmpassword: '',
    }
  }

  showModal=()=>{
     return(
       <Modal animationType="fade"
       transparent="true"
       visible={this.state.modalVisible}>
         <View style={styles.modalcontainer}>
           <ScrollView style={{width: '100%' }}>
             <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
               <Text style={styles.modaltitle}>Registeration</Text>
               <TextInput style={styles.loginBox}
          placeholder="First Name"
          placeholderTextColor = "#ffff"
          maxLength= {8}
          onChangeText={(text)=>{
            this.setState({
             firstname: text
             })
             }}/>

<TextInput style={styles.loginBox}
          placeholder="Last Name"
          placeholderTextColor = "#ffff"
          maxLength= {8}
          onChangeText={(text)=>{
            this.setState({
             lastname: text
             })
             }}/>

<TextInput style={styles.loginBox}
          placeholder="Contact"
          placeholderTextColor = "#ffff"
          maxLength= {10}
          keyboardType= {"numeric"}
          onChangeText={(text)=>{
            this.setState({
             contact: text
             })
             }}/>

<TextInput style={styles.loginBox}
          placeholder="Adress"
          placeholderTextColor = "#ffff"
          multiline={true}
          onChangeText={(text)=>{
            this.setState({
             address: text
             })
             }}/>

<TextInput style={styles.loginBox}
          placeholder="Email Id"
          placeholderTextColor = "#ffff"
          keyboardType={"email-address"}
          onChangeText={(text)=>{
            this.setState({
             emailId: text
             })
             }}/>
<View style={styles.modalbackbutton}>
  <TouchableOpacity style={styles.registerbutton} onPress={()=>{this.userSignUp(this.state.emailId, this.state.password, this.state.confirmpassword)}}>
    <Text style={styles.registerbuttontext}>Register</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.cancelbutton}onPress={()=>{this.setState({modalVisible:false})}}>
    <Text style={{color:"Black"}}>Cancel</Text>
  </TouchableOpacity>
  </View>
<TextInput style={styles.loginBox}
          placeholder="Password"
          placeholderTextColor = "#ffff"
          secureTextEntry={true}
          onChangeText={(text)=>{
            this.setState({
             password: text
             })
             }}/>

<TextInput style={styles.loginBox}
          placeholder="Confirm Password"
          placeholderTextColor = "#ffff"
          secureTextEntry={true}
          onChangeText={(text)=>{
            this.setState({
             confirmpassword: text
             })
             }}/>

             </KeyboardAvoidingView>
           </ScrollView>
         </View>
       </Modal>
     )
  }
             
  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      return Alert.alert("Successfully Login")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailId, password, confirmpassword) =>{
    if (password !== confirmpassword){
      return Alert.alert("Cheak Password\n Password Incorrect")
    }
    else{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then((response)=>{
      return Alert.alert("User Added Successfully")
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
    db.collection('Users').add({
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      contact:this.state.contact,
      address:this.state.address,
      emailId:this.state.emailId
    })
  }
}


  render(){
    return(
      <View style={styles.container}>
        <View style={{justifyContent:'center', alignItems: 'center'}}>
          {this.showModal()}
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Book Santa</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@booksanta.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password, this.state.confirmpassword)}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  }
})
