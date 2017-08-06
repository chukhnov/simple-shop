import React, { Component } from 'react'
import {
    Media,
    Grid,
    Panel,
    Pager,
    Button
} from 'react-bootstrap'
import '../css/Dashboard.css'
import image from '../images/noavatar.jpg'


class SuperUserBoard extends Component {


    render() {
        const {
            onLogOutClick,
            users,
            showSuperUserBoard,
            changeUserStatus
        } = this.props

        return (
            <Grid>
                <Panel>
                    <Pager>
                        <Button
                            bsSize="small"
                            onClick={showSuperUserBoard.bind(null, false)}
                        >
                            Dashboard
                        </Button>
                        {' '}
                        <Button
                            bsSize="small"
                            onClick={onLogOutClick.bind(null)}
                        >
                            Log Out
                        </Button>
                    </Pager>
                </Panel>
                {users.map((user, i) => {
                    const { avatar, name, isActive, _id } = user
                    const buttonLabel = isActive ? 'Deactivate User' : 'Activate User' 
                        return (<Panel key={i}>
                            <Media>
                                <Media.Left>
                                    <img width={64} height={64} src={avatar || image} alt="Image" />
                                </Media.Left>
                                <Media.Body>
                                    <Media.Heading>Name: {name}</Media.Heading>
                                    <p>
                                        <Button
                                            bsSize="small"
                                            onClick={changeUserStatus.bind(null, {_id, status: !isActive})}
                                        >
                                            {buttonLabel}
                                        </Button>
                                    </p>
                                </Media.Body>
                            </Media>
                        </Panel>)
                })}
            </Grid >
        )
    }
}

export default SuperUserBoard