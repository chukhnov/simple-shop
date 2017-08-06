import React, { Component } from 'react'
import {
    Button,
    Grid,
    Row,
    Thumbnail,
    Col,
    Tooltip,
    OverlayTrigger
} from 'react-bootstrap'


class DeactivatedAccount extends Component {


    render() {
        const {
            onLogOutClick,
            name,
            age,
            avatar,
            showEditModal,
            showImageUploadModal,
            isAdmin,
            showSuperUserBoard
         } = this.props
        const tooltipEdit = (<Tooltip id="dashboard-tooltip">{'Click to edit'}</Tooltip>);

        return (
            <Grid>
                <Row>
                    <Col smOffset={4} sm={5}>
                        <Thumbnail src={avatar || no_avatar}>
                            <Button
                                    bsStyle="default"
                                    bsSize="xsmall"
                                    onClick={showImageUploadModal.bind(null, true)}
                                >
                                    Upload new image
                                </Button>
                            <OverlayTrigger
                                overlay={tooltipEdit}
                                placement="top"
                            >
                                <h3 onClick={showEditModal.bind(null, {show: true, message: 'name'})}>{name}</h3>
                            </OverlayTrigger>
                            <OverlayTrigger
                                overlay={tooltipEdit}
                                placement="top"
                            >
                                <p onClick={showEditModal.bind(null, {show: true, message:'age'})}>Age: {age}</p>
                            </OverlayTrigger>
                            <p>
                                &nbsp;
                                &nbsp;
                                {isAdmin && <Button
                                    bsStyle="default"
                                    bsSize="small"
                                    onClick={showSuperUserBoard.bind(null, true)}
                                    block
                                >
                                    Manage Users
                                </Button>}
                                <Button
                                    onClick={onLogOutClick.bind(null)}
                                    bsStyle="default"
                                    bsSize="small"
                                    block
                                >
                                    Log Out
                                </Button>
                            </p>
                        </Thumbnail>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default DeactivatedAccount