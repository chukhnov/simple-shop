import React, {Component} from 'react'
import { Button, 
    Form, 
    FormGroup, 
    FormControl, 
    Col, 
    Checkbox, 
    ControlLabel, 
    Badge 
} from 'react-bootstrap'



class RegistrationForm extends Component {

    onChange(target){
        const {onChangeForm} = this.props
        const {name, value} = target
        onChangeForm({[name]: value})
    }
    
    render() {
        const {onSignUpClick, goToSignUp} = this.props
        return (
            <Form horizontal className="well">
                <Col smOffset={4} sm={5}>
                <h3><Badge>Please Sign Up, or</Badge><Button onClick={goToSignUp.bind(null, false)} bsStyle="link">Log In</Button></h3>
                </Col>
                <FormGroup controlId="formHorizontalEmail">
                    <Col smOffset={4} sm={3}>
                        <FormControl type="text" placeholder="Name" name="name" onChange={e => this.onChange(e.target)}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col smOffset={4} sm={3}>
                        <FormControl type="password" placeholder="Password" name="password" onChange={e => this.onChange(e.target)}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={4} sm={3}>
                        <Checkbox>Remember me</Checkbox>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={4} sm={3}>
                        <Button onClick={onSignUpClick.bind(null)} bsStyle="primary" bsSize="small" block>
                        Sign Up
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

export default  RegistrationForm