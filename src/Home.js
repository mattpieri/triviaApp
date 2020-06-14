import React from 'react'
import Layout2 from './components/Layout2';
import { Button, Form, ListGroup, Dropdown, DropdownButton, Row, Col, ListGroupItem } from 'react-bootstrap';
import Field from './components/Field';
import QuestionList from './components/QuestionList';

export default class Home extends React.Component {
    
    
    constructor() {
        super();
        this.apiTransactions = 'https://rcbnv6ut12.execute-api.us-east-1.amazonaws.com/test/transactions';
        this.state = {
            Game: "",
            Prompt: "",
            Choice_A: "",
            Choice_B: "",
            Choice_C: "",
            Choice_D: "",
            Answer: "",
            Index: -1,
            Games: [],// { game: 'game1', questions: ['What is my name']}, { game: 'game2', questions: ['good', 'test']} ]
        };
        //this.games = [ { game: 'game1', questions: ['What is my name']}, { game: 'game2', questions: ['good', 'test']} ]
        //Array.prototype.forEach.call(this.games, game => this.state[game] = false )
        this.getGames.bind(this)
        this.postMultipleChoice.bind(this)
        this.changeGame.bind(this)
        this.getGames()          

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
        fetch( this.apiTransactions, {
          method: 'post',
          headers: {
          'Accept': 'application/json, text/plain, */*',
          //'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        {
          gameID:  this.state.Game.toLowerCase(),
          answer1: this.state.Choice_A.toLowerCase(),
          answer2: this.state.Choice_B.toLowerCase(),
          answer3: this.state.Choice_C.toLowerCase(),
          answer4: this.state.Choice_D.toLowerCase(),
          answer:  this.state.Answer.toLowerCase(),
          prompt:  this.state.Prompt.toLowerCase(),
          requestType: 'new',
          type: 'multipleChoice'    
       })
        }).then(res=>res.json())
        .then(res => console.log(res));
      }

      getGames = async () => {
        fetch( 'https://rcbnv6ut12.execute-api.us-east-1.amazonaws.com/test/games')
        .then(res=>res.json())
        .then(res => this.setState({Games:res}));
      }

    click(e){
        this.postMultipleChoice()
        this.setState({Game:''})
        this.setState({Prompt:''})
        this.setState({Choice_A:''})
        this.setState({Choice_B:''})
        this.setState({Choice_C:''})
        this.setState({Choice_D:''})
        this.setState({Answer:''})
        this.getGames()    
    }

    changeGame(Game){
        this.setState({Game:Game})
    }

    listClick(e){
        //console.log(e)
        let value = e.target.name;
        if( this.state.Index == value )
            value = -1
        this.setState({Index:value})

        console.log(value)
    }
    
    render() {
        return(
            <div>
            <h3>Select Multiple Choice Game</h3>
            <br></br>
                <ListGroup >
                    {/*console.log(this.state.Games.map((game,i)=>game['questions'][0]['prompt']))*/}
                    {this.state.Games.map((game, i)=>
                    <ListGroup.Item >
                        <Row>
                            <Col sm={11}>{game['game']}</Col>
                            <Col sm={1}>
                                <Button variant={this.state.Index == i ? "primary":"dark"} key={i} name={i} onClick={this.listClick.bind(this)}></Button>
                            </Col>
                        </Row>
                        {/*<Row>
                        <Col sm={11}><p>{game['game']}</p></Col>
                        <Col sm={1}><Button key={i} name={i} onClick={this.listClick.bind(this)}>{this.state.Index == i ? <p>&#8681;</p>:<p>&#8679;</p>}</Button></Col>
                        </Row>*/}
                        {this.state.Index == i ? 
                            <div>
                            <br></br>
                            <QuestionList showResults={this.state.Index == i} questions={game['questions']}/>
                            </div> 
                        : null}
                    </ListGroup.Item>
                    )
                    }
                </ListGroup>
            <br></br>
            <h3>Add New Multiple Choice Game</h3>
            <br></br>

            <Form>
                    <Field name="New Game:"     value={this.state.Game} update={this.changeGame.bind(this)} pholder="Enter name of the game, i.e, pokemon"/>
                    <Field name="Prompt:"   value={this.state.Prompt} update={this.changePrompt.bind(this)} pholder="What color in Pikachu?"/>
                    <Field name="Choice A:" value={this.state.Choice_A} update={this.changeChoice_A.bind(this)} pholder="Yellow"/>
                    <Field name="Choice B:" value={this.state.Choice_B} update={this.changeChoice_B.bind(this)} pholder="Red"/>
                    <Field name="Choice C:" value={this.state.Choice_C} update={this.changeChoice_C.bind(this)} pholder="Black"/>
                    <Field name="Choice D:" value={this.state.Choice_D} update={this.changeChoice_D.bind(this)} pholder="White"/>
                    <Field name="Answer:"   value={this.state.Answer} update={this.changeAnswer.bind(this)} pholder="Yellow"/>
                    
                    <Button onClick={this.click.bind(this)}>Submit</Button>
            </Form>
            </div>
        )
    }
}