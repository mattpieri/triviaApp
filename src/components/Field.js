import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default class Field extends React.Component{
    
    handleChange(e){
        
        const value = e.target.value;
        console.log(value);
        this.props.update(value);
    }
    
    render() {
        return(
            <Form.Group as ={Row} controlId="formBasicEmail">
            <Form.Label column sm="2">{this.props.name}</Form.Label>
            <Col sm="10">
            <Form.Control  value={this.props.value} type="text" placeholder={this.props.pholder} onChange={this.handleChange.bind(this)}/>
            </Col>
            </Form.Group>
    )
    }
}