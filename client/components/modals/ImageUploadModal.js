import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ImageUploader from '../ImageUploader'
import '../../css/Modal.css'



class ImageUploadModal extends Component {

    render() {
        const {
            onChangeValue,
            uploadAvatar,
            avatarForUpload,
            showImageUploadModal
        } = this.props
        return (
            <div>
                <Modal.Dialog>

                    <Modal.Body>
                        <ImageUploader
                            onChangeValue={onChangeValue}
                            uploadAvatar={uploadAvatar}
                            avatarForUpload={avatarForUpload}
                            showImageUploadModal={showImageUploadModal}
                        />
                    </Modal.Body>

                </Modal.Dialog>
            </div>
        )
    }

}

export default ImageUploadModal