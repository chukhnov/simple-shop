import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import { connect } from 'react-redux'
import { createAction } from '../utils/createAction'
import { SIGN_IN, SIGN_UP, SHOW_SIGN_UP_FORM, CHANGE_FORM_DATA } from '../common/constants'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'


class App extends Component {

    render() {
        const {
            showSignInForm, 
            showSignUpForm, 
            onLoginClick,
            onSignUpClick,
             goToSignUp,
             onChangeForm
        } = this.props
        return (
            <div>
                {showSignInForm && <LoginForm 
                    onLoginClick={onLoginClick}
                    goToSignUp={goToSignUp}
                    onChangeForm={onChangeForm}
                />}
                {showSignUpForm && <RegistrationForm
                    onSignUpClick={onSignUpClick}
                    goToSignUp={goToSignUp}
                    onChangeForm={onChangeForm}
                />}
            </div>
        )
    }

}
export default connect((store) => {
    return {
        showSignInForm: store.applicationReducer.showSignInForm,
        showSignUpForm: store.applicationReducer.showSignUpForm
    }
},{
    onLoginClick: createAction(SIGN_IN),
    onSignUpClick: createAction(SIGN_UP),
    goToSignUp: createAction(SHOW_SIGN_UP_FORM),
    onChangeForm: createAction(CHANGE_FORM_DATA)
})(App)