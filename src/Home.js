import React from 'react'
import Layout2 from './components/Layout2';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Field from './components/Field';

export default class Home extends React.Component {
    
    
    constructor() {
        super();
        this.apiCall = 'https://rcbnv6ut12.execute-api.us-east-1.amazonaws.com/test/transactions';
        this.state = {
            Game: "",
            Prompt: "",
            Choice_A: "",
            Choice_B: "",
            Choice_C: "",
            Choice_D: "",
            Answer: "",
        };
        this.postMultipleChoice.bind(this)
    }

    changePrompt(Prompt){
        this.setState({Prompt:Prompt})
    }
    changeGame(Game){
        this.setState({Game:Game})
    }
    changeChoice_A(Choice_A){
        this.setState({Choice_A:Choice_A})
    }
    changeChoice_B(Choice_B){
        this.setState({Choice_B:Choice_B})
    }
    changeChoice_C(Choice_C){
        this.setState({Choice_C:Choice_C})
    }
    changeChoice_D(Choice_D){
        this.setState({Choice_D:Choice_D})
    }
    changeAnswer(Answer){
        this.setState({Answer:Answer})
    }

    postMultipleChoice = async () => {
        fetch( this.apiCall, {
          method: 'post',
          headers: {
          'Accept': 'application/json, text/plain, */*',
          //'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        {
          gameID:  this.state.Game,
          answer1: this.state.Choice_A,
          answer2: this.state.Choice_B,
          answer3: this.state.Choice_C,
          answer4: this.state.Choice_D,
          answer:  this.state.Answer,
          prompt:  this.state.Prompt,
          type: 'multipleChoice'    
       })
        }).then(res=>res.json())
        .then(res => console.log(res));
      }

    click(e){
        console.log(this.state.Prompt)
        console.log(this.state.Choice_B)
        console.log(this.state.Answer)
        this.postMultipleChoice()
    }

    render() {
        return(
            <div>
            <h3>Add Multiple Choice Question</h3>
            <br></br>
            <Form>
                    <Field name="Game:"     update={this.changeGame.bind(this)} pholder="Enter name of the game, i.e, pokemon"/>
                    <Field name="Prompt:"   update={this.changePrompt.bind(this)} pholder="Pink"/>
                    <Field name="Choice A:" update={this.changeChoice_A.bind(this)} pholder="Yellow"/>
                    <Field name="Choice B:" update={this.changeChoice_B.bind(this)} pholder="Red"/>
                    <Field name="Choice C:" update={this.changeChoice_C.bind(this)} pholder="Black"/>
                    <Field name="Choice D:" update={this.changeChoice_D.bind(this)} pholder="White"/>
                    <Field name="Answer:"   update={this.changeAnswer.bind(this)} pholder="Yellow"/>
                    <Button onClick={this.click.bind(this)}>Submit</Button>
            </Form>
            </div>
        )
    }
}