import React, { Component } from 'react'
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Col,
    Checkbox,
    ControlLabel,
    Badge
} from 'react-bootstrap'


class LoginForm extends Component {

    onChange(target) {
        const { onChangeForm } = this.props
        const { name, value } = target
        onChangeForm({ [name]: value })
    }

    render() {
        const { onLoginClick, goToSignUp, name, password } = this.props
        return (
            <Form horizontal className="well">
                <Col smOffset={4} sm={5}>
                    <h3>
                        <Badge>Please Log In, or</Badge>
                        <Button
                            onClick={goToSignUp.bind(null, true)}
                            bsStyle="link"
                        >
                            Sign Up
                        </Button>
                    </h3>
                </Col>
                <FormGroup controlId="formHorizontalEmail">
                    <Col smOffset={4} sm={3}>
                        <FormControl
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={e => this.onChange(e.target)}
                        />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col smOffset={4} sm={3}>
                        <FormControl
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={e => this.onChange(e.target)}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={4} sm={3}>
                        <Button
                            onClick={onLoginClick.bind(null)}
                            bsStyle="default"
                            bsSize="small"
                            block
                        >
                            Log In
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

export default LoginForm