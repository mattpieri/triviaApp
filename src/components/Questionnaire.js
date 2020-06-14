import React from 'react';
import { ListGroup, Button, Form, Row, Col } from 'react-bootstrap';
import Field from './Field';
export default class QuestionList extends React.Component{
   constructor(props) {
    super(props);
    this.apiTransactions = 'https://rcbnv6ut12.execute-api.us-east-1.amazonaws.com/test/transactions';
    this.state = {
        showResults: true,
        Game:     this.props.question['gameID'], //this.props.question['prompt'],
        questionId: this.props.question['questionID'],
        Prompt:   this.props.question['prompt'],
        Choice_A: this.props.question['answers']['answer1'],
        Choice_B: this.props.question['answers']['answer2'],
        Choice_C: this.props.question['answers']['answer3'],
        Choice_D: this.props.question['answers']['answer4'],
        Answer:   this.props.question['answer'],
    };
    this.postMultipleChoice2.bind(this)
    }
    onClick(showResults){
        this.setState({showResults:showResults})
    }
    
    alertClicked() {
        alert('You clicked the third ListGroupItem');
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

    postMultipleChoice2 = async () => {
        fetch( this.apiTransactions, {
          method: 'post',
          headers: {
          'Accept': 'application/json, text/plain, */*',
          //'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        {
          gameID:  this.state.Game.toLowerCase(),
          questionId: this.state.questionId.toLowerCase(),
          answer1: this.state.Choice_A.toLowerCase(),
          answer2: this.state.Choice_B.toLowerCase(),
          answer3: this.state.Choice_C.toLowerCase(),
          answer4: this.state.Choice_D.toLowerCase(),
          answer:  this.state.Answer.toLowerCase(),
          prompt:  this.state.Prompt.toLowerCase(),
          requestType: 'update',
          type: 'multipleChoice'    
       })
        }).then(res=>res.json())
        .then(res => console.log(res));
      }

      click(e){
        console.log(this.state.Game)
        console.log(this.state.questionId)      
        console.log(this.state.Choice_A)
        console.log(this.state.Choice_B)
        console.log(this.state.Choice_C)
        console.log(this.state.Choice_D)
        console.log(this.state.Answer)
        console.log(this.state.Prompt)
        this.postMultipleChoice2()
    }

    render() {
        return(

            <div>
                {
                    this.props.showResults ? 
                <Form>
                <br></br>
                <Field name="Prompt:"    value={this.state.Prompt} update={this.changePrompt.bind(this)} />
                <Field name="Choice A:"  value={this.state.Choice_A} update={this.changeChoice_A.bind(this)} />
                <Field name="Choice B:"  value={this.state.Choice_B} update={this.changeChoice_B.bind(this)} />
                <Field name="Choice C:"  value={this.state.Choice_C} update={this.changeChoice_C.bind(this)} />
                <Field name="Choice D:"  value={this.state.Choice_D} update={this.changeChoice_D.bind(this)} />
                <Field name="Answer:"    value={this.state.Answer} update={this.changeAnswer.bind(this)} />
                <Button onClick={this.click.bind(this)}>{this.props.buttonText}</Button>
                </Form>
                : null
                }
            </div>
    )
    }
}