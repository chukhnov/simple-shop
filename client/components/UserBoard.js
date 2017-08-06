import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from '../utils/createAction'
import {
    Button,
    Grid,
    Row,
    Thumbnail,
    Col,
    Tooltip,
    OverlayTrigger
} from 'react-bootstrap'
import {
    SIGN_IN,
    SIGN_UP,
    SHOW_SIGN_UP_FORM,
    CHANGE_FORM_DATA,
    SHOW_INFO_MODAL,
    CHECK_TOKEN,
    USER_DATA_LOAD
} from '../common/constants'
import no_avatar from '../images/noavatar.jpg'
import '../css/Dashboard.css'


class UserBoard extends Component {


    render() {
        const {
            onLogOutClick,
            name,
            age,
            avatar,
            showEditModal
         } = this.props
        const tooltipEdit = (<Tooltip id="dashboard-tooltip">{'Click to edit'}</Tooltip>);

        return (
            <Grid>
                <Row>
                    <Col smOffset={4} sm={5}>
                        <Thumbnail src={no_avatar}>
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

export default UserBoard