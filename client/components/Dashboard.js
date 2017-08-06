import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from '../utils/createAction'
import {
    Button,
    Grid,
    Row,
    Thumbnail,
    Col
} from 'react-bootstrap'
import {
    SIGN_IN,
    SIGN_UP,
    SHOW_SIGN_UP_FORM,
    CHANGE_FORM_DATA,
    SHOW_INFO_MODAL,
    CHECK_TOKEN,
    USER_DATA_LOAD,
    SIGN_OUT,
    SHOW_EDIT_MODAL,
    UPDATE_USER_DATA,
    SAVE_USER_DATA
} from '../common/constants'
import UserBoard from './UserBoard'
import SuperUserBoard from './SuperUserBoard'
import EditModal from './modals/EditModal'


class Dashboard extends Component {

    componentDidMount() {
        const isDashboard = true
        this.props.checkToken(isDashboard)
    }

    render() {
        const {
            onLogOutClick,
            name,
            age,
            avatar,
            showEditModal,
            isShowEditModal,
            editModalEditedField,
            temporaryAge,
            temporaryName,
            onChangeValue,
            onClickSaveEditModal
         } = this.props
        return (
            <div>
                {isShowEditModal && <EditModal
                    onClickCloseEditModal={showEditModal}
                    onClickSaveEditModal={onClickSaveEditModal}
                    editModalEditedField={editModalEditedField}
                    temporaryAge={temporaryAge}
                    temporaryName={temporaryName}
                    onChangeValue={onChangeValue}
                />}
                <UserBoard
                    onLogOutClick={onLogOutClick}
                    name={name}
                    age={age ? age : 'No information'}
                    avatar={avatar}
                    showEditModal={showEditModal}
                />
            </div>
        )
    }
}

export default connect((store) => {
    return {
        name: store.applicationReducer.name,
        age: store.applicationReducer.age,
        avatar: store.applicationReducer.avatar,
        isShowEditModal: store.applicationReducer.showEditModal,
        editModalEditedField: store.applicationReducer.editModalEditedField,
        temporaryAge: store.applicationReducer.temporaryAge,
        temporaryName: store.applicationReducer.temporaryName
    }
}, {
        onLogOutClick: createAction(SIGN_OUT),
        checkToken: createAction(CHECK_TOKEN),
        showEditModal: createAction(SHOW_EDIT_MODAL),
        onChangeValue: createAction(UPDATE_USER_DATA),
        onClickSaveEditModal: createAction(SAVE_USER_DATA)
    })(Dashboard)