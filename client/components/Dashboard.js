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
    SAVE_USER_DATA,
    IMAGE_UPLOAD_MODAL,
    UPLOAD_AVATAR
} from '../common/constants'
import UserBoard from './UserBoard'
import SuperUserBoard from './SuperUserBoard'
import EditModal from './modals/EditModal'
import ImageUploadModal from './modals/ImageUploadModal'


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
            onClickSaveEditModal,
            isShowUploadImageModal,
            showImageUploadModal,
            uploadAvatar,
            avatarForUpload,
            dataIsLoaded
         } = this.props
        return (
            <div>
                {isShowUploadImageModal && <ImageUploadModal
                    onChangeValue={onChangeValue}
                    uploadAvatar={uploadAvatar}
                    avatarForUpload={avatarForUpload}
                    showImageUploadModal={showImageUploadModal}
                />}
                {isShowEditModal && <EditModal
                    onClickCloseEditModal={showEditModal}
                    onClickSaveEditModal={onClickSaveEditModal}
                    editModalEditedField={editModalEditedField}
                    temporaryAge={temporaryAge}
                    temporaryName={temporaryName}
                    onChangeValue={onChangeValue}
                />}
                {dataIsLoaded && <UserBoard
                    onLogOutClick={onLogOutClick}
                    name={name}
                    age={age ? age : 'No information'}
                    avatar={avatar}
                    showEditModal={showEditModal}
                    showImageUploadModal={showImageUploadModal}
                />}
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
        temporaryName: store.applicationReducer.temporaryName,
        isShowUploadImageModal: store.applicationReducer.showUploadImageModal,
        avatarForUpload: store.applicationReducer.avatarForUpload,
        dataIsLoaded: store.applicationReducer.dataIsLoaded
    }
}, {
        onLogOutClick: createAction(SIGN_OUT),
        checkToken: createAction(CHECK_TOKEN),
        showEditModal: createAction(SHOW_EDIT_MODAL),
        onChangeValue: createAction(UPDATE_USER_DATA),
        onClickSaveEditModal: createAction(SAVE_USER_DATA),
        showImageUploadModal: createAction(IMAGE_UPLOAD_MODAL),
        uploadAvatar: createAction(UPLOAD_AVATAR)
    })(Dashboard)