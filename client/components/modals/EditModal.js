import React, { Component } from 'react'
import {
    Modal,
    Button,
    FormGroup,
    ControlLabel,
    FormControl
} from 'react-bootstrap'
import '../../css/Modal.css'



class EditModal extends Component {

    onChange(target) {
        const { onChangeValue } = this.props
        const { name, value } = target
        onChangeValue({ [name]: value })
    }

    render() {
        const {
            onClickCloseEditModal,
            onClickSaveEditModal,
            editModalEditedField,
            temporaryAge,
            temporaryName
        } = this.props


        const editNameTemplate = {
            message: 'Please set your name',
            type: 'text',
            placeholder: 'Name',
            value: temporaryName,
            name: 'temporaryName'
        }

        const editAgeTemplate = {
            message: 'Please set your age',
            type: 'number',
            placeholder: 'Age',
            value: temporaryAge,
            name: "temporaryAge"
        }

        const currentTemplate = editModalEditedField === 'name' ? editNameTemplate : editAgeTemplate

        return (
            <div>
                <Modal.Dialog>

                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <ControlLabel>{currentTemplate.message}</ControlLabel>
                                <FormControl
                                    type={currentTemplate.type}
                                    placeholder={currentTemplate.placeholder}
                                    value={currentTemplate.value}
                                    name={currentTemplate.name}
                                    onChange={e => this.onChange(e.target)}
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                         <Button bsSize="small" onClick={onClickSaveEditModal.bind(null, {[editModalEditedField]: currentTemplate.value})}>
                            Save
                        </Button>
                        <Button bsSize="small" onClick={onClickCloseEditModal.bind(null, { show: false, message: null })}>
                            Cancel
                        </Button>
                    </Modal.Footer>

                </Modal.Dialog>
            </div>
        )
    }

}

export default EditModal