import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from '../utils/createAction'
import {
    SIGN_IN,
    SIGN_UP,
    SHOW_SIGN_UP_FORM,
    CHANGE_FORM_DATA,
    SHOW_INFO_MODAL,
    CHECK_TOKEN
} from '../common/constants'
import LoginForm from './LoginForm'
import RegistrationForm from './RegistrationForm'
import InformationModal from './modals/InformationModal'


class App extends Component {

    componentDidMount(){
        this.props.checkToken()
    }

    render() {
        const {
            showSignInForm,
            showSignUpForm,
            onLoginClick,
            onSignUpClick,
            goToSignUp,
            onChangeForm,
            name,
            password,
            showInfoModal,
            showInformationModal,
            onClickCloseInfoModal,
            informationModalBody
        } = this.props
        return (
            <div>
                {showInfoModal && <InformationModal
                    onClickCloseInfoModal={onClickCloseInfoModal}
                    informationModalBody={informationModalBody}

                />}
                {showSignInForm && <LoginForm
                    onLoginClick={onLoginClick}
                    goToSignUp={goToSignUp}
                    onChangeForm={onChangeForm}
                    name={name}
                    password={password}
                />}
                {showSignUpForm && <RegistrationForm
                    onSignUpClick={onSignUpClick}
                    goToSignUp={goToSignUp}
                    onChangeForm={onChangeForm}
                    name={name}
                    password={password}
                />}
            </div>
        )
    }

}
export default connect((store) => {
    return {
        showSignInForm: store.applicationReducer.showSignInForm,
        showSignUpForm: store.applicationReducer.showSignUpForm,
        name: store.authorizationReducer.name,
        password: store.authorizationReducer.password,
        showInfoModal: store.applicationReducer.showInformationModal,
        informationModalBody: store.applicationReducer.informationModalBody
    }
}, {
        onLoginClick: createAction(SIGN_IN),
        onSignUpClick: createAction(SIGN_UP),
        goToSignUp: createAction(SHOW_SIGN_UP_FORM),
        onChangeForm: createAction(CHANGE_FORM_DATA),
        onClickCloseInfoModal: createAction(SHOW_INFO_MODAL),
        checkToken: createAction(CHECK_TOKEN)
    })(App)