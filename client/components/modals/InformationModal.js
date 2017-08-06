import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import '../../css/Modal.css'



class InformationModal extends Component {

    render() {
        const {
            informationModalBody,
            onClickCloseInfoModal
        } = this.props
        return (
            <div>
                <Modal.Dialog>

                    <Modal.Body>
                        {informationModalBody}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsSize="small" onClick={onClickCloseInfoModal.bind(null, false)}>
                            Close
                        </Button>
                    </Modal.Footer>

                </Modal.Dialog>
            </div>
        )
    }

}

export default InformationModal