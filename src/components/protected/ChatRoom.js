import React, { Component } from 'react'
import * as firebase from "firebase"

export default class ChatRoom extends Component {

  constructor(props, context){
    super(props, context)
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.state = {
        message: '',
        messages: []
    }
  }

  componentDidMount(){
    console.log('ComponentDidMount')
    console.log("Chat Room props test")
    console.log(this.props.matchkey)
    firebase.database().ref(`messages/${this.props.matchkey}/`).on('value', (snapshot)=> {

      const currentMessages = snapshot.val()

      if (currentMessages != null){
        this.setState({
          messages: currentMessages
        })
      }
    })
  }

  updateMessage(event){
    console.log('updateMessage')
    this.setState({
      message: event.target.value
    })
  }

  submitMessage(event){
    console.log('submit')
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message
    }

    firebase.database().ref(`messages/${this.props.matchkey}/` + nextMessage.id).set(nextMessage)

    // var list = Object.assign([], this.state.messages)
    // list.push(nextMessage)
    // this.setState({
    //   messages: list
    // })
  }

  render(){

    const currentMessage = this.state.messages.map((message, i) => {

    return (
      <li key={message.id}>{message.text}</li>
    )
    })

    return(

      <div>

        <ol>
        {currentMessage}
        </ol>

      <label>Message</label>
      <br />
      <input onChange={this.updateMessage} type="text" placeholder="Message" />
      <br />
      <button onClick={this.submitMessage}>Write a message...</button>
      </div>
)
}
}
