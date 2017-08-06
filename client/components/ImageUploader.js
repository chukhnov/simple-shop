import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import '../css/ImageUploader.css'

class ImageUploader extends Component {

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader()
        let file = e.target.files[0]
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            this.props.onChangeValue({ avatarForUpload: reader.result })
        }
    }

    render() {
        let {
            avatarForUpload: imagePreviewUrl,
            uploadAvatar,
            showImageUploadModal
        } = this.props;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img className="image-uploader-avatar-preview" src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div className="previewComponent">
                <form>
                    <input className="fileInput"
                        type="file"
                        onChange={e => this.handleImageChange(e)} />
                    <Button
                        bsStyle="default"
                        bsSize="xsmall"
                        onClick={uploadAvatar.bind(null)}
                    >
                        Upload Image
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                        bsStyle="default"
                        bsSize="xsmall"
                        onClick={showImageUploadModal.bind(null, false)}
                    >
                        Cancel
                    </Button>
                </form>
                <div className="imgPreview">
                    {$imagePreview}
                </div>
            </div>
        )
    }
}

export default ImageUploader