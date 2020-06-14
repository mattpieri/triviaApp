import React from 'react';
import { ListGroup, Button, Form, Row, Col } from 'react-bootstrap';
import Field from './Field';
import Questionnaire from './Questionnaire';
export default class QuestionList extends React.Component{
   constructor() {
    super();
    this.state = {
        showResults: false,
        openIndexs: -1,
    };

    this.alertClicked.bind(this)
    }
    onClick(showResults){
        this.setState({showResults:showResults})
    }
    
    alertClicked(e) {
        let value = e.target.name;
        if( this.state.openIndexs == value )
            value = -1
        this.setState({openIndexs:value})
        /*if(this.state.openIndexs.includes(key)){
            const array = this.state.openIndexs;
            const index = array.indexOf(key);
            if (index > -1) {
            array.splice(index, 1);
            }
            this.setState({openIndexs:array})

        } else {
            const array = this.state.openIndexs;
            array.push(key)
            this.setState({openIndexs:array})
        }*/
        //alert(typeof this.state.openIndexs)

        //alert('You clicked the third ListGroupItem');
    }     

    render() {
        return(
            <ListGroup >
                    {
                    this.props.showResults ?
                    
                    this.props.questions.map((question, i)=>
                    <ListGroup.Item>{/* action name={i} onClick={this.alertClicked.bind(this)} key={i}>{question['prompt']*/}
                        
                        <Row>
                            <Col sm={11}>{question['prompt']}</Col>
                            <Col sm={1}>
                                <Button variant={this.state.openIndexs == i ? "primary":"secondary"} key={i} name={i} onClick={this.alertClicked.bind(this)}></Button>
                            </Col>
                        </Row>
                        
                        <Questionnaire question={question} buttonText='Update' showResults={this.state.openIndexs==i}/>

                        </ListGroup.Item>
                    )
                    : null
                    }
            </ListGroup>
    )
    }
}